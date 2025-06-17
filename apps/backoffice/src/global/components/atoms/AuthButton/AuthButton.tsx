import { RecipeVariantProps } from "@pandacss/types";
import { ComponentProps } from "react";

import { css, cva } from "../../../../../styled-system/css";
import { SvgIconProps } from "../../../../types/svg";

const authButtonRecipe = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    width: "400px",
    height: "50px",

    fontSize: "lg",
    padding: "2px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  variants: {
    provider: {
      google: {
        bgColor: "#4387F6",
        color: "white",
      },
      microsoft: {
        bgColor: "white",
        color: "gray.700",
        borderWidth: "2px",
        borderColor: "gray.700",
        borderStyle: "solid",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
});

type AuthButtonVariants = RecipeVariantProps<typeof authButtonRecipe>;

type AuthButtonProps = Omit<ComponentProps<"button">, "children"> & {
  variants?: AuthButtonVariants;
  label?: string;
};

const GoogleLogo = (props: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#4285F4"
      d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
    />
    <path
      fill="#34A853"
      d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
    />
    <path
      fill="#FBBC04"
      d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
    />
    <path
      fill="#EA4335"
      d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
    />
  </svg>
);

const MicrosoftLogo = (props: SvgIconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <rect x="17" y="17" width="10" height="10" fill="#FEBA08"></rect>{" "}
      <rect x="5" y="17" width="10" height="10" fill="#05A6F0"></rect>{" "}
      <rect x="17" y="5" width="10" height="10" fill="#80BC06"></rect>{" "}
      <rect x="5" y="5" width="10" height="10" fill="#F25325"></rect>{" "}
    </g>
  </svg>
);

function AuthButton({ variants, label, ...props }: AuthButtonProps) {
  return (
    <button {...props} className={authButtonRecipe(variants)}>
      {variants?.provider === "microsoft" ? (
        <div
          className={css({
            bgColor: "white",
            borderRadius: "6px",
            padding: "2px",
            position: "absolute",
            left: "2px",
          })}
        >
          <MicrosoftLogo width={40} height={40} />
        </div>
      ) : variants?.provider === "google" ? (
        <div
          className={css({
            bgColor: "white",
            borderRadius: "6px",
            padding: "8px",
            position: "absolute",
            left: "2px",
          })}
        >
          <GoogleLogo width={30} height={30} />
        </div>
      ) : (
        ""
      )}
      <p>{label}</p>
    </button>
  );
}

export default AuthButton;
