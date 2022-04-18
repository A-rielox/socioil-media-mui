import { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import styled from 'styled-components';
import { InputSimple, Alert, InputSelect } from '../../components';

// los valores los pongo en el global ( y no en la pura pag como en el register ) xq para editar y agregar receta voy a ocupar la misma pag ( y la diferencia en la pag la hago con el "isEditing" )
const AddRecipe = () => {
   // red red PRUEBA red red
   useEffect(() => {
      // Anything in here is fired on component mount.
      return () => {
         // Anything in here is fired on component unmount.
         console.log('desmontado');
         clearValues();
      };
   }, []);

   const {
      isLoading,
      showAlert,
      displayAlert,
      title,
      desc,

      oilsOptions,
      changeStateValues,
      isEditing,
      editRecipe,
      clearValues,
      createRecipe,
      oil1,
      oil2,
      oil3,
      oil4,
      oil5,
      problem1,
      problem2,
      problem3,
   } = useAppContext();
   // PRIMERO CAMBIO TODO EN EL STATE ( LOS DATOS DE LA RECETA ), Y LUEGO LO MANDO

   const handleRecipeInput = e => {
      const name = e.target.name;
      const value = e.target.value;

      changeStateValues({ name, value });
   };

   // al picarle a editar ( en Recipe.js ) ==> se meten los valores de ese trabajo en el state y se manda a la pag de crear-recipe con estos valores pre-llenados, aqui se editan y se manda el patch a la DB

   const handleSubmit = e => {
      e.preventDefault();

      // LISTAS -- oils y problems
      let oilsList = [oil1, oil2, oil3, oil4, oil5];
      let problemsList = [problem1, problem2, problem3];

      oilsList = oilsList.filter(oil => oil.length > 1);

      problemsList = problemsList.filter(problem => problem.length > 1);

      // como sea lo pruebo en la API y en la DB
      // prettier-ignore
      if (!title || !desc || oilsList.length === 0 || problemsList.length === 0) {
         displayAlert();
         return;
      }

      if (isEditing) {
         editRecipe({ oilsList, problemsList });
         return;
      }

      // lo manda a crear con los valores q tiene en el state
      createRecipe({ oilsList, problemsList });

      // limpia campos tras crear receta
      clearValues();
   };

   return (
      <Wrapper>
         <form className="form">
            <h3>{isEditing ? 'editar recetita' : 'añadir recetita'} </h3>
            {showAlert && <Alert />}

            <div className="form-center">
               {/* title */}
               <InputSimple
                  inputClass={'title'}
                  type="text"
                  labelText="Titulo"
                  name="title"
                  value={title}
                  changeStateValues={handleRecipeInput}
               />

               {/* description */}
               {/* <InputSimple
                  type="text-area"
                  labelText="Descripción"
                  name="desc"
                  value={desc}
                  changeStateValues={handleRecipeInput}
               /> */}

               <div className="form-row description">
                  <label htmlFor="description" className="form-label">
                     descripción
                  </label>

                  <textarea
                     className="form-textarea"
                     type="text"
                     rows="5"
                     name="desc"
                     value={desc}
                     onChange={handleRecipeInput}
                  />
               </div>

               {/* ACEITES */}

               <InputSelect
                  labelText="aceitito 1"
                  inputClass={'classOil1'}
                  key="oil1"
                  name="oil1"
                  value={oil1}
                  changeStateValues={handleRecipeInput}
                  list={['', ...oilsOptions]}
               ></InputSelect>
               <InputSelect
                  labelText="aceitito 2"
                  inputClass={'classOil2'}
                  key="oil2"
                  name="oil2"
                  value={oil2}
                  changeStateValues={handleRecipeInput}
                  list={['', ...oilsOptions]}
               ></InputSelect>
               <InputSelect
                  labelText="aceitito 3"
                  inputClass={'classOil3'}
                  key="oil3"
                  name="oil3"
                  value={oil3}
                  changeStateValues={handleRecipeInput}
                  list={['', ...oilsOptions]}
               ></InputSelect>
               <InputSelect
                  labelText="aceitito 4"
                  inputClass={'classOil4'}
                  key="oil4"
                  name="oil4"
                  value={oil4}
                  changeStateValues={handleRecipeInput}
                  list={['', ...oilsOptions]}
               ></InputSelect>
               <InputSelect
                  labelText="aceitito 5"
                  inputClass={'classOil5'}
                  key="oil5"
                  name="oil5"
                  value={oil5}
                  changeStateValues={handleRecipeInput}
                  list={['', ...oilsOptions]}
               ></InputSelect>

               {/* PROBLEMS */}

               <InputSimple
                  labelText="molestia 1"
                  inputClass={'classProblem1'}
                  key="problem1"
                  type="text"
                  name="problem1"
                  value={problem1}
                  changeStateValues={handleRecipeInput}
               ></InputSimple>
               <InputSimple
                  labelText="molestia 2"
                  inputClass={'classProblem2'}
                  key="problem2"
                  type="text"
                  name="problem2"
                  value={problem2}
                  changeStateValues={handleRecipeInput}
               ></InputSimple>
               <InputSimple
                  labelText="molestia 3"
                  inputClass={'classProblem3'}
                  key="problem3"
                  type="text"
                  name="problem3"
                  value={problem3}
                  changeStateValues={handleRecipeInput}
               ></InputSimple>

               {/* <div className="btn-container"></div> */}
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
         </form>
      </Wrapper>
   );
};

export default AddRecipe;

const Wrapper = styled.section`
   border-radius: var(--borderRadius);
   width: 100%;
   background: var(--white);
   padding: 3rem 2rem 4rem;
   box-shadow: var(--shadow-2);

   .title {
      grid-area: title;
   }
   .description {
      grid-area: description;
   }
   .classOil1 {
      grid-area: oil1;
   }
   .classOil2 {
      grid-area: oil2;
   }
   .classOil3 {
      grid-area: oil3;
   }
   .classOil4 {
      grid-area: oil4;
   }
   .classOil5 {
      grid-area: oil5;
   }
   .classProblem1 {
      grid-area: problem1;
   }
   .classProblem2 {
      grid-area: problem2;
   }
   .classProblem3 {
      grid-area: problem3;
   }
   .submit-btn {
      grid-area: submitBtn;
   }
   .clear-btn {
      grid-area: clearBtn;
   }

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
   .form-row {
      margin-bottom: 0;
   }
   .form-center {
      display: grid;
      row-gap: 0.5rem;
      grid-template-areas:
         'title'
         'description'
         'oil1'
         'oil2'
         'oil3'
         'oil4'
         'oil5'
         'problem1'
         'problem2'
         ' problem3'
         'submitBtn'
         'clearBtn';
   }
   .form-center button {
      align-self: end;
      height: 35px;
      margin-top: 1rem;
   }
   /* .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      align-self: flex-end;
      margin-top: 0.5rem;
      button {
         height: 35px;
      }
   } */
   .clear-btn {
      background: var(--grey-500);
   }
   .clear-btn:hover {
      background: var(--grey-700);
   }
   @media (min-width: 992px) {
      .form-center {
         grid-template-columns: 1fr 1fr;
         align-items: center;
         column-gap: 1rem;

         grid-template-areas:
            'title title'
            'description description'
            'oil1 problem1'
            'oil2 problem2'
            'oil3 problem3'
            'oil4 submitBtn'
            'oil5 clearBtn';
      }

      .btn-container {
         margin-top: 0;
      }
   }
   @media (min-width: 1120px) {
      .form {
         margin: 0 auto;
         /* border-radius: 0;
      box-shadow: none;
      padding: 0; */
         /* max-width: 80%; */
         max-width: 740px;
         width: 100%;
      }

      .form-center {
         grid-template-columns: 1fr 1fr /* 1fr */;

         /* grid-template-areas:
            'title title .'
            'description description .'
            'oil1 problem1 .'
            'oil2 problem2 .'
            'oil3 problem3 .'
            'oil4 . submitBtn'
            'oil5 . clearBtn';*/
      }
      .form-center button {
         margin-top: 0;
      }

      .btn-container {
         display: grid;
         grid-template-columns: 1fr;
         row-gap: 1rem;
         align-self: flex-end;
         /* margin-top: 0.5rem; */
         /* padding-top: 2rem; */
         button {
            height: 35px;
         }
      }
   }
`;
