const InputSelect = ({
   labelText,
   name,
   value,
   changeStateValues,
   list,
   inputClass,
}) => {
   return (
      // <div className="form-row">
      <div className={`form-row ${inputClass ? inputClass : null}`}>
         <label htmlFor={name} className="form-label">
            {labelText || name}
         </label>

         <select
            name={name}
            value={value}
            onChange={changeStateValues}
            className="form-select"
            // className={`form-select ${inputClass ? inputClass : null}`}
         >
            {list.map((itemValue, index) => {
               return (
                  <option key={index} value={itemValue}>
                     {itemValue}
                  </option>
               );
            })}
         </select>
      </div>
   );
};

export default InputSelect;
