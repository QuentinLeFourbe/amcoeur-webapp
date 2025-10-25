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
    <>
      <h2>Section</h2>
      <div className={rowContainer}>
        <div className={container}>
          <div className={groupItem}>
            <Label>Titre</Label>
            <Input
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
          <div className={groupItem}>
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
              Image
            </FormInput>
          </div>

          <div>
            <label className={subtitleStyle}>Bouton de navigation</label>
            <div className={row}>
              <div className={groupItem}>
                <Label>Texte</Label>
                <Input
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
              <div className={groupItem}>
                <Label>Lien de navigation</Label>
                {isUsingCustomLink ? (
                  <Input
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
                    className={css({ height: "56px" })}
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
                  Lien personnalisé
                </FormCheckbox>
              </div>
            </div>
            <NavButtonHelper
              className={css({ maxWidth: "400px", marginTop: "16px" })}
            />
          </div>
        </div>
        <div>
          <FormCodeArea
            height="250px"
            maxWidth="800px"
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
            Contenu
          </FormCodeArea>
        </div>
      </div>
    </>
  );
}

export default FormContentPanel;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",

  "& h2": {
    fontSize: "32px",
    fontWeight: "bold",
  },
});

const rowContainer = css({
  display: "flex",
  flexDirection: "row",
  gap: "32px",
});

const groupItem = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const row = css({
  display: "flex",
  gap: "8px",
});

const subtitleStyle = css({
  fontSize: "24px",
  fontWeight: "bold",
});
