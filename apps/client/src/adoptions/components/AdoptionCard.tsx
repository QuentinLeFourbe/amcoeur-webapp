import { AdoptionGender } from "@amcoeur/types";
import { Mars, Venus } from "lucide-react";

import { css } from "../../../styled-system/css";
import { ClickablePrimitive } from "../../global/components/atoms/Primitives/ClickablePrimitive";

type AdoptionCardProps = {
  imageSrc?: string;
  name: string;
  gender: AdoptionGender;
  href?: string;
};

function AdoptionCard({ imageSrc, name, gender, href }: AdoptionCardProps) {
  return (
    <ClickablePrimitive
      to={href}
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        position: "relative",
        marginBottom: "50px",
        backgroundColor: "gray.200",
        transition: "all 0.3s ease",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "gray.100",
          "& img": {
            transform: "scale(1.1)",
          },
        },
      })}
    >
      <div
        className={css({
          width: "275px",
          height: "225px",
          borderRadius: "4px",
          boxShadow: "-2px 4px 4px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        })}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            className={css({
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            })}
          />
        )}
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "absolute",
          bottom: "-50px",
          padding: "16px",
          width: "90%",
          minHeight: "80px",
          boxShadow: "-4px 8px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "white",
        })}
      >
        <p
          className={css({
            fontSize: "20px",
            color: "gray.700",
            fontWeight: "bold",
            fontFamily: "body",
          })}
        >
          {name}
        </p>
        {gender === "MALE" && <Mars />}
        {gender === "FEMALE" && <Venus />}
      </div>
    </ClickablePrimitive>
  );
}

export default AdoptionCard;
