import React from 'react';
import { InputSimple } from '.';
import { InputSelect } from '.';
import { useAppContext } from '../context/appContext';

const FormOthers = () => {
   const {
      oilsOptions,
      changeStateValues,
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
      <div>
         {/* ACEITES */}

         <InputSelect
            labelText="aceitito 1"
            key="oil1"
            name="oil1"
            value={oil1}
            changeStateValues={handleRecipeInput}
            list={['', ...oilsOptions]}
         ></InputSelect>
         <InputSelect
            labelText="aceitito 2"
            key="oil2"
            name="oil2"
            value={oil2}
            changeStateValues={handleRecipeInput}
            list={['', ...oilsOptions]}
         ></InputSelect>
         <InputSelect
            labelText="aceitito 3"
            key="oil3"
            name="oil3"
            value={oil3}
            changeStateValues={handleRecipeInput}
            list={['', ...oilsOptions]}
         ></InputSelect>
         <InputSelect
            labelText="aceitito 4"
            key="oil4"
            name="oil4"
            value={oil4}
            changeStateValues={handleRecipeInput}
            list={['', ...oilsOptions]}
         ></InputSelect>
         <InputSelect
            labelText="aceitito 5"
            key="oil5"
            name="oil5"
            value={oil5}
            changeStateValues={handleRecipeInput}
            list={['', ...oilsOptions]}
         ></InputSelect>

         {/* PROBLEMS */}

         <InputSimple
            labelText="molestia 1"
            key="problem1"
            type="text"
            name="problem1"
            value={problem1}
            changeStateValues={handleRecipeInput}
         ></InputSimple>
         <InputSimple
            labelText="molestia 2"
            key="problem2"
            type="text"
            name="problem2"
            value={problem2}
            changeStateValues={handleRecipeInput}
         ></InputSimple>
         <InputSimple
            labelText="molestia 3"
            key="problem3"
            type="text"
            name="problem3"
            value={problem3}
            changeStateValues={handleRecipeInput}
         ></InputSimple>
      </div>
   );
};

// export default FormOthers;
