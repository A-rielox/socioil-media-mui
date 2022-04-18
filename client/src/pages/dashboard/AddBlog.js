import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { Alert, Editor, InputSimple, InputSelect } from '../../components';
import styled from 'styled-components';

const AddBlog = () => {
   // para el editor inicialmente ocupaba este
   // const [content, setContent] = useState('');

   const {
      isLoading,
      showAlert,
      displayAlert,
      titleBlog,
      descBlog,
      category,

      categoryOptions,
      changeStateValues,
      isEditingBlog,
      editBlog,
      clearValues,
      createBlog,
   } = useAppContext();

   // red red PRUEBA red red
   useEffect(() => {
      // Anything in here is fired on component mount.
      return () => {
         // Anything in here is fired on component unmount.
         console.log('desmontado');
         clearValues();
      };
      // si pongo la dependencia "clearValues" se hace render infinito
   }, []);

   // PRIMERO CAMBIO TODO EN EL STATE ( LOS DATOS DE LA RECETA ), Y LUEGO LO MANDO
   const handleBlogInput = e => {
      // console.log(e.target);
      // console.log(e);
      if (!e.target) {
         const name = 'descBlog';
         const value = e;

         changeStateValues({ name, value });
      } else {
         const name = e.target.name;
         const value = e.target.value;

         // console.log(e.target.name);

         changeStateValues({ name, value });
      }
   };

   // al picarle a editar ( en Recipe.js ) ==> se meten los valores de ese trabajo en el state y se manda a la pag de crear-recipe con estos valores pre-llenados, aqui se editan y se manda el patch a la DB

   const handleSubmit = e => {
      e.preventDefault();

      // como sea lo pruebo en la API y en la DB
      // prettier-ignore
      if (!titleBlog || !descBlog || !category) {
         displayAlert();
         return;
      }

      if (isEditingBlog) {
         editBlog();
         return;
      }

      // lo manda a crear con los valores q tiene en el state
      createBlog();

      // limpia campos tras crear blog
      clearValues();
   };

   return (
      <Wrapper>
         <form className="form">
            <h3>{isEditingBlog ? 'editar blog' : 'añadir blog'} </h3>
            {showAlert && <Alert />}

            <div className="form-center">
               {/* title */}
               <InputSimple
                  inputClass={'titleRow'}
                  type="text"
                  labelText="Título"
                  name="titleBlog"
                  value={titleBlog}
                  changeStateValues={handleBlogInput}
               />

               {/* CATEGORIA */}

               <InputSelect
                  labelText="Categoría"
                  inputClass={'category'}
                  key="category"
                  name="category"
                  value={category}
                  changeStateValues={handleBlogInput}
                  list={categoryOptions}
               ></InputSelect>

               <Editor initialValue={descBlog} setContent={handleBlogInput} />

               <div className="btn-container">
                  <button
                     className="btn btn-block submit-btn"
                     type="submit"
                     onClick={handleSubmit}
                     disabled={isLoading}
                  >
                     enviar
                  </button>

                  {/* este tiene q ir despues del submit button  */}
                  <button
                     className="btn btn-block clear-btn"
                     onClick={e => {
                        e.preventDefault();
                        clearValues();
                     }}
                  >
                     limpiar
                  </button>
               </div>
            </div>
         </form>
      </Wrapper>
   );
};

export default AddBlog;

const Wrapper = styled.section`
   border-radius: var(--borderRadius);
   width: 100%;
   background: var(--white);
   padding: 3rem 2rem 4rem;
   box-shadow: var(--shadow-2);

   h3 {
      margin-top: 0;
   }
   .form {
      margin: 0;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      max-width: 100%;
      width: 100%;
   }

   .form-center {
      display: flex;
      flex-direction: column;
   }

   .jodit-react-container {
      width: 100%;

      p {
         margin-bottom: 0.5rem;
         max-width: 40em;
         color: #6e7785;
      }

      ul {
         list-style-type: disc;
         /* padding: 1rem; */
         margin-top: 0;
         padding-top: 0;
         padding-bottom: 0.5rem;
         padding-left: 2rem;
      }
   }

   .jodit-status-bar {
      visibility: collapse;
   }

   .form-center button {
      align-self: end;
      height: 35px;
      margin-top: 1rem;
   }
   .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      align-self: flex-end;
      margin-top: 0.5rem;
   }
   .clear-btn {
      background: var(--grey-500);
   }
   .clear-btn:hover {
      background: var(--grey-700);
   }

   @media (min-width: 1120px) {
      .form {
         margin: 0 auto;
         max-width: 740px;
      }

      .btn-container {
         row-gap: 1rem;

         button {
            height: auto;
            padding: 1rem 2.5rem;
         }
      }
   }
`;
