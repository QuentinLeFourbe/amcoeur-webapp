import { X } from "lucide-react";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { css } from "../../../../../styled-system/css";
import Button from "../../atoms/Button/Button";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Helper from "../../atoms/Helper/Helper";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";

type FormInputProps = ComponentPropsWithoutRef<typeof Input> & {
  children: React.ReactNode;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  width?: "small" | "medium" | "large";
  removable?: boolean;
  onRemove?: () => void;
};

/**
 * A input for a Form. It is compatible with React hook form or native onChange support.
 * **/
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

    const inputStyle = props.type === "checkbox" ? checkMark : widthClass;
    const containerStyle = props.type === "checkbox" ? rowContainer : container;

    return (
      <div className={containerStyle}>
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
            <Input {...props} ref={ref} className={inputStyle} {...register} />
            <Button color="danger" type="button" onClick={onRemove}>
              <X />
            </Button>
          </div>
        ) : (
          <Input {...props} ref={ref} className={inputStyle} {...register} />
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
  gap: "8px",
});

const rowContainer = css({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "32px",
  maxWidth: "300px",
});

const checkMark = css({
  height: "20px",
  width: "20px",
  borderRadius: "4px",
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
