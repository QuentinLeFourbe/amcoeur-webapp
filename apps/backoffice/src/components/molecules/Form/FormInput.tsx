import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import Label from "../../atoms/Label/Label";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Input from "../../atoms/Input/Input";
import Helper from "../../atoms/Helper/Helper";
import Button from "../../atoms/Button/Button";

type FormInputProps = ComponentPropsWithoutRef<typeof Input> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  width?: "small" | "medium" | "large";
  removable?: boolean;
  onRemove?: () => void;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      children,
      errorMessage,
      register,
      width,
      removable,
      onRemove,
      ...props
    }: FormInputProps,
    ref,
  ) {
    let widthClass = fullWidth;
    switch (width) {
      case "small":
        widthClass = smallWidth;
        break;
      case "medium":
        widthClass = mediumWidth;
        break;
      case "large":
        widthClass = largeWidth;
        break;
    }

    return (
      <div className={container}>
        <Label htmlFor={props.name}>{children}</Label>
        {removable ? (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "8px",
            })}
          >
            <Input {...props} ref={ref} className={widthClass} {...register} />
            <Button
              color="red"
              icon="x-mark"
              type="button"
              onClick={onRemove}
            />
          </div>
        ) : (
          <Input {...props} ref={ref} className={widthClass} {...register} />
        )}
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
        {props.isPath && (
          <Helper
            className={css({ width: "300px" })}
            label="Aide: chemin d'accès"
          >
            <p>
              Le chemin d&apos;accès représente l&apos;adresse de la page. Par
              exemple, une page dont le chemin d&apos;accès est: don ; sera
              accessible sur le site de l&apos;association via l&apos;URL:
              www.amcoeur.org/don
            </p>
          </Helper>
        )}
      </div>
    );
  },
);

export default FormInput;

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
});

const fullWidth = css({
  width: "100%",
});

const mediumWidth = css({
  width: "300px",
});

const largeWidth = css({
  width: "500px",
});

const smallWidth = css({
  width: "100px",
});
