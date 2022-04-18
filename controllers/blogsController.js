import Blog from '../models/Blog.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

//'/api/v1/blogs' -- .post(createBlog)
const createBlog = async (req, res) => {
   // prettier-ignore
   const {title, desc, category} = req.body;
   console.log(req.body);

   if (!title || !category || !desc) {
      throw new BadRequestError('Favor proveer todos los valores');
   }

   // en lugar de mandar el nombre y level por el front ( q allá lo saco del user cuando se logea, lo podría poner en el token y sacar de acá del req.user ) -- YA NO LOS MANDO, HAY Q BORRARLOS DEL MODEL
   req.body.createdBy = req.user.userId;

   // OJO q estoy pasando todo el req.body
   const blog = await Blog.create(req.body);

   res.status(StatusCodes.CREATED).json({ blog });
};

//'/api/v1/blogs' -- .route('/:id').delete(deleteBlog)
const deleteBlog = async (req, res) => {
   const { id: blogId } = req.params;

   const blog = await Blog.findOne({ _id: blogId });
   if (!blog) {
      throw new NotFoundError(`No encontramos blog con id: ${blogId}`);
   }

   checkPermissions(req.user, blog.createdBy);

   await blog.remove();

   res.status(StatusCodes.OK).json({
      msg: 'Blog eliminado con exito 👏👏👏',
   });
};

// al no poner el await se obtiene solo el query ( en este caso en la variable result ) , al q despues se le puede agregar los sort'ssss y demas filtros, para despues, al poner el await se pase todo lo q se quiera buscar o filtrar.
// cuando se ponga 'all' lo q quiero es q no se filtre en relación a ese, xeso para ese no se va a poner en el queryObject. ( al poner 'all' lo q hace es NO buscar con ese filtro )
//status, type y sort SIEMPRE tienen algo x default, NO pueden estar vacios
// si no fueran a estar presentes podria poner el if de la sig forma:
//if ( status && status !== 'all') {...
// para q se agrege solo si no es undefined
//'/api/v1/blogs' --  .get(getAllBlogs)
// ▦▦▦▦▦▦▦▦ FILTROS ▦▦▦▦▦▦▦▦
const getAllBlogs = async (req, res) => {
   // para buscar es: ?status=pending&jobType=boss
   const { search, category, sort } = req.query;

   const queryObject = {};

   if (category && category !== 'todas') {
      queryObject.category = category;
   }

   // FILTRA EN TITULO
   if (search) {
      queryObject.title = { $regex: search, $options: 'i' };
   }

   //SIN AWAIT
   let result = Blog.find(queryObject);

   // chain sort conditions
   if (sort === 'recientes') {
      result = result.sort('-createdAt');
   }
   if (sort === 'viejos') {
      result = result.sort('createdAt');
   }
   if (sort === 'a-z') {
      result = result.sort('title');
   }
   if (sort === 'z-a') {
      result = result.sort('-title');
   }

   // PAGINACIÓN
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 10;
   const skip = (page - 1) * limit;

   result = result.skip(skip).limit(limit);
   // 75
   // 10 10 10 10 10 10 10 5

   // RESOLVIENDO EL QUERY
   const blogs = await result;

   const totalBlogs = await Blog.countDocuments(queryObject);
   const numOfBlogPages = Math.ceil(totalBlogs / limit);

   // res.status(StatusCodes.OK).json({
   //    totalRecipes: recipes.length,
   //    numOfBlogPages: 1,
   //    recipes,
   // });
   res.status(StatusCodes.OK).json({
      totalBlogs,
      numOfBlogPages,
      blogs,
   });
};

//'/api/v1/blogs' -- .route('/:id').patch(updateBlog)
const updateBlog = async (req, res) => {
   const { id: blogId } = req.params;
   const { title, desc, category } = req.body;

   if (!title || !category || !desc) {
      throw new BadRequestError('Favor proveer todos los valores');
   }

   const blog = await Blog.findOne({ _id: blogId });
   if (!blog) {
      throw new NotFoundError(`No encontramos blog con id: ${blogId}`);
   }

   checkPermissions(req.user, blog.createdBy);

   // tecnicamente NO lo necesito en el front como respuesta, el updatedJob
   // OJO q le paso todo el req.body
   const updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, req.body, {
      new: true,
      runValidators: true,
   });

   res.status(StatusCodes.OK).json({ updatedBlog });
};

//'/api/v1/blogs' -- route('/stats').get(showStats);
const showStats = async (req, res) => {
   res.send('<h1> show stats blogs</h1>');
};

export { createBlog, deleteBlog, getAllBlogs, updateBlog, showStats };
