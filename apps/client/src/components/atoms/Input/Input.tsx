import { forwardRef, ComponentPropsWithoutRef } from "react";
import { css, cx } from "../../../../styled-system/css";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "children"> & {
  numeric?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ numeric = false, ...props }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Permet uniquement les touches numériques, le retour arrière et la touche de suppression
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };
    console.log("numeric: ", numeric);
    return (
      <input
        {...props}
        ref={ref}
        onKeyDown={numeric ? handleKeyDown : undefined}
        className={cx(inputStyle, props.className)}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;

const inputStyle = css({
  backgroundColor: "backgrounds.primary.extraLight",
  borderRadius: "4px",
  padding: "1rem",
});
