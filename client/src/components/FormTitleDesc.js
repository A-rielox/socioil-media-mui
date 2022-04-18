import React from 'react';
import { InputSimple } from '.';
// import InputSelect from '.';
import { useAppContext } from '../context/appContext';

const FormTitleDesc = () => {
   const {
      changeStateValues,
      oilsOptionsoil1,
      title,
      desc,
      oil1,
      oil2,
      oil3,
      oil4,
      oil5,
      problem1,
      problem2,
      problem3,
   } = useAppContext();

   const handleRecipeInput = e => {
      const name = e.target.name;
      const value = e.target.value;

      console.log(e.target.name);

      changeStateValues({ name, value });
   };

   return (
      <>
         {/* title */}
         <InputSimple
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

         <div className="form-row">
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
      </>
   );
};

// export default FormTitleDesc;
