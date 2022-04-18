import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { oilsList, categoryList } from '../utils/optionLists';
import {
   DISPLAY_ALERT,
   CLEAR_ALERT,
   REGISTER_USER_BEGIN,
   REGISTER_USER_SUCCESS,
   REGISTER_USER_ERROR,
   LOGIN_USER_BEGIN,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_ERROR,
   TOGGLE_SIDEBAR,
   LOGOUT_USER,
   UPDATE_USER_BEGIN,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   HANDLE_CHANGE,
   CLEAR_VALUES,
   CREATE_RECIPE_BEGIN,
   CREATE_RECIPE_SUCCESS,
   CREATE_RECIPE_ERROR,
   GET_RECIPES_BEGIN,
   GET_RECIPES_SUCCESS,
   SET_EDIT_RECIPE,
   DELETE_RECIPE_BEGIN,
   EDIT_RECIPE_BEGIN,
   EDIT_RECIPE_SUCCESS,
   EDIT_RECIPE_ERROR,
   CLEAR_FILTERS,
   CHANGE_PAGE,
   // ===== BLOG
   CREATE_BLOG_BEGIN,
   CREATE_BLOG_SUCCESS,
   CREATE_BLOG_ERROR,
   GET_BLOGS_BEGIN,
   GET_BLOGS_SUCCESS,
   DELETE_BLOG_BEGIN,
   SET_EDIT_BLOG,
   EDIT_BLOG_BEGIN,
   EDIT_BLOG_SUCCESS,
   EDIT_BLOG_ERROR,
   CHANGE_BLOGS_PAGE,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

export const initialState = {
   isLoading: false,
   showAlert: false,
   alertText: '',
   alertType: '',
   // user
   user: user ? JSON.parse(user) : null,
   token: token,
   userLocation: userLocation || '',
   jobLocation: userLocation || '',
   //sideBar
   showSidebar: false,
   //================ RECIPE
   isEditing: false,
   editRecipeId: '',
   title: '',
   desc: '',
   oilsOptions: oilsList,
   // para pasar a la lista
   oilsList: [],
   problemsList: [],
   oil1: '',
   oil2: '',
   oil3: '',
   oil4: '',
   oil5: '',
   problem1: '',
   problem2: '',
   problem3: '',
   // todas las recetas
   totalRecipes: 0,
   numOfPages: 1,
   recipes: [],
   page: 1,
   // para busqueda y sort
   list4Problems: [],
   search: '',
   searchOil: 'todos',
   searchProblem: 'todos',
   sort: 'recientes',
   sortOptions: ['recientes', 'viejos', 'a-z', 'z-a'],
   //================ BLOG
   isEditingBlog: false,
   editBlogId: '',
   titleBlog: '',
   descBlog: '',
   category: 'general',
   categoryOptions: categoryList,
   totalBlogs: 0,
   numOfBlogPages: 1,
   blogs: [],
   pageBlogs: 1,
   // para busqueda y sort
   searchBlog: '',
   searchCategory: 'todas',
   // sort: 'recientes',  es =
   // sortOptions: ['recientes', 'viejos', 'a-z', 'z-a'], es =
};

// search (en title) - searchOil  - searchProblem - sort
// poner default en searchOil y searchProblem
// necesito la lista de posibles oils ( q ya la tengo ) y la de los distintos problems ( q la voy a poner en list4Problems )

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   // ⭐⭐  para axios ( Axios - Setup Instance )
   const authFetch = axios.create({ baseURL: '/api/v1' });

   //  para axios req interceptor
   authFetch.interceptors.request.use(
      config => {
         config.headers.common['Authorization'] = `Bearer ${state.token}`;
         return config;
      },
      error => {
         return Promise.reject(error);
      }
   );

   //  para axios response interceptor
   authFetch.interceptors.response.use(
      response => {
         return response;
      },
      error => {
         // esta es la gracia, poder customizar para los distintos errores, y YO controlar la respuesta ente los errores
         if (error.response.status === 401) {
            logoutUser();
         }
         return Promise.reject(error);
      }
   );

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

   const displayAlert = () => {
      dispatch({ type: DISPLAY_ALERT });

      clearAlert();
   };

   const clearAlert = () => {
      setTimeout(() => {
         dispatch({
            type: CLEAR_ALERT,
         });
      }, 3000);
   };

   const addUserToLocalStorage = ({ user, token, location }) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('location', location);
   };

   const removeUserFromLocalStorage = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('location');
   };

   const registerUser = async currentUser => {
      dispatch({ type: REGISTER_USER_BEGIN });

      try {
         const { data } = await axios.post(
            '/api/v1/auth/register',
            currentUser
         );

         const { user, token, location } = data;

         dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: { user, token, location },
         });

         addUserToLocalStorage({
            user,
            token,
            location,
         });
      } catch (error) {
         dispatch({
            type: REGISTER_USER_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }

      clearAlert();
   };

   const loginUser = async currentUser => {
      dispatch({ type: LOGIN_USER_BEGIN });

      try {
         const { data } = await axios.post('/api/v1/auth/login', currentUser);

         const { user, token, location } = data;

         dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: { user, token, location },
         });

         addUserToLocalStorage({ user, token, location });
      } catch (error) {
         dispatch({
            type: LOGIN_USER_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }

      clearAlert();
   };

   const toggleSidebar = () => {
      dispatch({ type: TOGGLE_SIDEBAR });
   };

   const logoutUser = () => {
      dispatch({ type: LOGOUT_USER });

      removeUserFromLocalStorage();
   };

   // al hacer el updateUser se me actualiza altiro el state xq acá los meto con la respuesta
   const updateUser = async currentUser => {
      dispatch({ type: UPDATE_USER_BEGIN });

      try {
         const { data } = await authFetch.patch(
            '/auth/updateUser',
            currentUser
         );

         const { user, token, location } = data;

         dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user, token, location },
         });

         addUserToLocalStorage({ user, location, token });
      } catch (error) {
         if (error.response.status !== 401) {
            dispatch({
               type: UPDATE_USER_ERROR,
               payload: { msg: error.response.data.msg },
            });
         }
      }

      clearAlert();
   };

   const changeStateValues = ({ name, value }) => {
      dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
   };

   const clearValues = () => {
      dispatch({ type: CLEAR_VALUES });
   };

   const createRecipe = async ({ oilsList, problemsList }) => {
      dispatch({ type: CREATE_RECIPE_BEGIN });

      try {
         // prettier-ignore
         const {
            title,desc,oil1,oil2,oil3,oil4,oil5,problem1,problem2,problem3,user:{ name: userNane }, user:{ level: userLevel }
         } = state;

         // prettier-ignore
         await authFetch.post('/recipes', {
            oilsList, problemsList,title, desc, oil1, oil2, oil3, oil4, oil5, problem1, problem2, problem3, userNane, userLevel
         });

         dispatch({ type: CREATE_RECIPE_SUCCESS });
         // dispatch({ type: CLEAR_VALUES });  red MIENTRAS PRUEBO red
      } catch (error) {
         if (error.response.status === 401) return;

         dispatch({
            type: CREATE_RECIPE_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }
      clearAlert();
   };

   // aqui creo list4Problems en el reducer en GET_RECIPES_SUCCESS
   // list4Problems: [], ----  search, searchOil, searchProblem, sort
   const getRecipes = async () => {
      const { search, searchOil, searchProblem, sort, page } = state;
      let url = `/recipes?page=${page}&oilsList=${searchOil}&problemsList=${searchProblem}&sort=${sort}`;

      // search lo voy a dejar separado xq es el único q puede estar vacio
      if (search) {
         url = url + `&search=${search}`;
      }

      dispatch({ type: GET_RECIPES_BEGIN });

      try {
         const { data } = await authFetch(url);
         const { totalRecipes, numOfPages, recipes } = data;

         dispatch({
            type: GET_RECIPES_SUCCESS,
            payload: { totalRecipes, numOfPages, recipes },
         });
      } catch (error) {
         console.log(error.response);
         // logoutUser();  red MIENTRAS PRUEBO red
      }
      clearAlert();
   };

   const setEditRecipe = id => {
      dispatch({ type: SET_EDIT_RECIPE, payload: { id } });

      console.log(`editar receta con id: ${id}`);
   };

   const editRecipe = async ({ oilsList, problemsList }) => {
      dispatch({ type: EDIT_RECIPE_BEGIN });

      try {
         // prettier-ignore
         const {
            title, desc, oil1, oil2, oil3, oil4, oil5, problem1, problem2, problem3
         } = state;

         // prettier-ignore
         await authFetch.patch(`/recipes/${state.editRecipeId}`, {
            oilsList, problemsList, title, desc, oil1, oil2, oil3, oil4, oil5, problem1, problem2, problem3,
         });

         dispatch({ type: EDIT_RECIPE_SUCCESS });
         dispatch({ type: CLEAR_VALUES });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: EDIT_RECIPE_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }

      clearAlert();
   };

   const deleteRecipe = async recipeId => {
      dispatch({ type: DELETE_RECIPE_BEGIN });

      try {
         await authFetch.delete(`/recipes/${recipeId}`);
         getRecipes(); // este va a poner isLoadin: false
      } catch (error) {
         // logoutUser(); red MIENTRAS PRUEBO red
      }
   };

   const clearFilters = () => {
      dispatch({ type: CLEAR_FILTERS });
      console.log('clear filters');
   };

   const changePage = page => {
      dispatch({ type: CHANGE_PAGE, payload: { page } });
   };

   // yellow yellow //  // yellow yellow //
   // yellow ======= BLOG ======= yellow //
   // yellow yellow //  // yellow yellow //

   const createBlog = async () => {
      dispatch({ type: CREATE_BLOG_BEGIN });

      try {
         const { titleBlog, descBlog, category } = state;

         await authFetch.post('/blogs', {
            title: titleBlog,
            desc: descBlog,
            category,
         });

         dispatch({ type: CREATE_BLOG_SUCCESS });
         // dispatch({ type: CLEAR_VALUES });  red MIENTRAS PRUEBO red
      } catch (error) {
         if (error.response.status === 401) return;

         dispatch({
            type: CREATE_BLOG_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }
      clearAlert();
   };

   const getBlogs = async () => {
      const { searchBlog, searchCategory, sort, pageBlogs } = state;

      let url = `/blogs?page=${pageBlogs}&category=${searchCategory}&sort=${sort}`;

      // search lo voy a dejar separado xq es el único q puede estar vacio
      if (searchBlog) {
         url = url + `&search=${searchBlog}`;
      }

      dispatch({ type: GET_BLOGS_BEGIN });

      try {
         const { data } = await authFetch(url);
         const { totalBlogs, numOfBlogPages, blogs } = data;

         dispatch({
            type: GET_BLOGS_SUCCESS,
            payload: { totalBlogs, numOfBlogPages, blogs },
         });
      } catch (error) {
         console.log(error.response);
         // logoutUser();  red MIENTRAS PRUEBO red
      }
      clearAlert();
   };

   const setEditBlog = id => {
      dispatch({ type: SET_EDIT_BLOG, payload: { id } });
   };

   const editBlog = async () => {
      dispatch({ type: EDIT_BLOG_BEGIN });

      try {
         const { titleBlog, descBlog, category } = state;

         await authFetch.patch(`/blogs/${state.editBlogId}`, {
            title: titleBlog,
            desc: descBlog,
            category,
         });

         dispatch({ type: EDIT_BLOG_SUCCESS });
         dispatch({ type: CLEAR_VALUES });
      } catch (error) {
         if (error.response.status === 401) return;
         dispatch({
            type: EDIT_BLOG_ERROR,
            payload: { msg: error.response.data.msg },
         });
      }

      clearAlert();
   };

   const deleteBlog = async blogId => {
      dispatch({ type: DELETE_BLOG_BEGIN });

      try {
         await authFetch.delete(`/blogs/${blogId}`);
         getBlogs(); // este va a poner isLoadin: false
      } catch (error) {
         // logoutUser(); red MIENTRAS PRUEBO red
      }
   };

   // pageBlogs
   const changeBlogsPage = pageBlogs => {
      dispatch({ type: CHANGE_BLOGS_PAGE, payload: { pageBlogs } });
   };

   return (
      <AppContext.Provider
         value={{
            ...state,
            authFetch,
            displayAlert,
            registerUser,
            loginUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            changeStateValues,
            clearValues,
            createRecipe,
            getRecipes,
            setEditRecipe,
            deleteRecipe,
            editRecipe,
            clearFilters,
            changePage,
            // ====== BLOG
            createBlog,
            getBlogs,
            deleteBlog,
            setEditBlog,
            editBlog,
            changeBlogsPage,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   return useContext(AppContext);
};

export { AppProvider };

// ⭐⭐ config para axios
//
// const authFetch = axios.create({
//    baseURL: '/api/v1',
//    headers: {
//       Authorization: `Bearer ${state.token}`,
//    },
// });
//
// para no tener q repetir en todos el tercer parametro de la config
// const { data } = await axios.patch(
//    '/api/v1/auth/updateUser',
//    currentUser,
//    {
//       headers: { 🥊 se quita por el interceptor
//          Authorization: `Bearer ${state.token}`,
//       },
//    }
// );
//
// para ocuparlo se va a poner authFetch.post ( o .loQueSea ) en lugar de axios.loQueSea
//
// Axios - Interceptors son como los "middlewares" q van a agarrar las reqs y res al salir y llegar para poner le más funcionalidad ( lo saqué de documentacion axios interceptors )

// You can intercept requests or responses before they are handled by then or catch.

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });

// se pueden usar directamente sobre axios o como en este caso sobre la instancia "authFetch"
