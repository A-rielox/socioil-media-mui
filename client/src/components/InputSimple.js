const InputSimple = ({
   type,
   name,
   value,
   changeStateValues,
   labelText,
   inputClass,
}) => {
   return (
      // <div className="form-row">
      <div className={`form-row ${inputClass ? inputClass : null}`}>
         <label htmlFor={name} className="form-label">
            {labelText || name}
         </label>

         <input
            type={type}
            className="form-input"
            // className={`form-select ${inputClass ? inputClass : null}`}
            name={name}
            value={value}
            onChange={changeStateValues}
         />
      </div>
   );
};

export default InputSimple;
