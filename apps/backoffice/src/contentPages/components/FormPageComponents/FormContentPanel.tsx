import { ContentPanelComponent, PageDataClient } from "@amcoeur/types";
import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { css } from "../../../../styled-system/css";
import Input from "../../../global/components/atoms/Input/Input";
import Label from "../../../global/components/atoms/Label/Label";
import Select from "../../../global/components/atoms/Select/SelectAlt";
import NavButtonHelper from "../../../global/components/molecules/ButtonHelper/ButtonHelper";
import FormCheckbox from "../../../global/components/molecules/Form/FormCheckbox";
import FormCodeArea from "../../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../../global/components/molecules/Form/FormInput";

type FormContentPanelProps = {
  component: ContentPanelComponent;
  onChange?: (component: ContentPanelComponent) => void;
  onBlur?: (component: ContentPanelComponent) => void;
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<NonNullable<ContentPanelComponent>>
  >;
  pages?: Pick<PageDataClient, "route" | "name">[];
};

function FormContentPanel({
  component,
  onChange,
  onBlur,
  errors,
  pages = [],
}: FormContentPanelProps) {
  const isLinkMatchingPage = !!pages.find(
    (page) => component.link === `/${page.route}`,
  );
  const [isUsingCustomLink, setIsUsingCustomLink] =
    useState(!isLinkMatchingPage);

  const pageSelectOptions = pages.map((page) => ({
    label: page.name,
    value: `/${page.route}`,
  }));

  return (
    <div className={mainContainerStyle}>
      <h2 className={titleStyle}>Section : {component.title || "Sans titre"}</h2>
      
      <div className={layoutGridStyle}>
        {/* Colonne de gauche : Infos de base */}
        <div className={fieldsContainerStyle}>
          <div className={groupItemStyle}>
            <Label>Titre de la section</Label>
            <Input
              placeholder="Ex: Notre mission..."
              onChange={(e) => {
                onChange?.({
                  ...component,
                  title: e.target.value,
                });
              }}
              onBlur={() => {
                onBlur?.(component);
              }}
              value={component.title}
            />
          </div>

          <div className={groupItemStyle}>
            <FormInput
              type="file"
              onChange={(e) => {
                onChange?.({
                  ...component,
                  image: e.target.files && e.target.files[0],
                });
              }}
              onBlur={() => {
                onBlur?.(component);
              }}
              errorMessage={errors?.image?.message}
            >
              Image d'illustration
            </FormInput>
          </div>

          <div className={navigationBoxStyle}>
            <label className={subtitleStyle}>Bouton d'action</label>
            <div className={navFieldsGridStyle}>
              <div className={groupItemStyle}>
                <Label>Texte du bouton</Label>
                <Input
                  placeholder="Ex: En savoir plus"
                  onChange={(e) => {
                    onChange?.({
                      ...component,
                      linkLabel: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    onBlur?.(component);
                  }}
                  value={component.linkLabel}
                />
              </div>
              <div className={groupItemStyle}>
                <Label>Destination</Label>
                {isUsingCustomLink ? (
                  <Input
                    placeholder="URL externe ou interne..."
                    onChange={(e) => {
                      onChange?.({
                        ...component,
                        link: e.target.value,
                      });
                    }}
                    onBlur={() => {
                      onBlur?.(component);
                    }}
                    value={component.link}
                  />
                ) : (
                  <Select
                    options={pageSelectOptions}
                    className={css({ minHeight: "45px" })}
                    onChange={(e) => {
                      onChange?.({
                        ...component,
                        link: e.target.value,
                      });
                    }}
                    onBlur={() => {
                      onBlur?.(component);
                    }}
                    value={component.link}
                  />
                )}
                <FormCheckbox
                  checked={isUsingCustomLink}
                  onChange={(e) => {
                    setIsUsingCustomLink(e.currentTarget.checked);
                    onChange?.({
                      ...component,
                      link: "",
                    });
                  }}
                >
                  Utiliser un lien personnalisé
                </FormCheckbox>
              </div>
            </div>
            <NavButtonHelper
              className={css({ marginTop: "1rem", opacity: 0.8 })}
            />
          </div>
        </div>

        {/* Colonne de droite ou Bas : Éditeur Markdown */}
        <div className={editorContainerStyle}>
          <FormCodeArea
            height="450px"
            onChange={(value) => {
              onChange?.({
                ...component,
                content: value,
              });
            }}
            onBlur={() => {
              onBlur?.(component);
            }}
            value={component.content}
          >
            Contenu Markdown
          </FormCodeArea>
        </div>
      </div>
    </div>
  );
}

const mainContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
  borderLeft: "4px solid",
  borderColor: "amcoeurRose",
  paddingLeft: "1rem",
});

const layoutGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "3rem",
  xl: {
    gridTemplateColumns: "1fr 1fr", // Deux colonnes sur très grands écrans
  }
});

const fieldsContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const groupItemStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

const navigationBoxStyle = css({
  padding: "1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
});

const navFieldsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  md: {
    gridTemplateColumns: "1fr 1fr",
  }
});

const subtitleStyle = css({
  display: "block",
  fontSize: "md",
  fontWeight: "bold",
  color: "amcoeurPale",
  marginBottom: "1.5rem",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const editorContainerStyle = css({
  width: "100%",
  minWidth: 0, // Empêche le débordement dans les flex/grid
});

export default FormContentPanel;
