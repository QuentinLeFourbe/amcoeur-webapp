import React from "react";

type FormInputProps = HTMLInputElement & {
  label: string;
};

function FormInput({ label, classname }: FormInputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        className={classname}
        type="text"
        placeholder="Nom"
        {...register("name", { required: true })}
      />
    </>
  );
}

export default FormInput;
{
  /* 
<input
  className={formInput}
  type="text"
  placeholder="Nom"
  {...register("name", { required: true })}
/> 
*/
}
