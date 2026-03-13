import { EmailBlockType, EmailCampaignDto, emailCampaignSchema, EmailImageBlock,ImageAspectRatio } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlignLeft,Edit3, Eye, Image as ImageIcon, Send, Type } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { useEffect,useState } from "react";
import { Controller,useFieldArray, useForm } from "react-hook-form";

import { css, cx } from "../../../styled-system/css";
import AmcoeurLogo from "../../global/assets/icons/amcoeur_logo.webp";
import Button from "../../global/components/atoms/Button/Button";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import FormCodeArea from "../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../global/components/molecules/Form/FormInput";
import FormSelect from "../../global/components/molecules/Form/FormSelect";
import DynamicContainer from "../../global/components/organisms/DynamicContainer/DynamicContainer";
import { useSendEmailCampaign } from "../hooks/useContacts";

const aspectRatioOptions = [
  { label: "Automatique", value: ImageAspectRatio.AUTO },
  { label: "Carré (1:1)", value: ImageAspectRatio.SQUARE },
  { label: "Portrait (4:5)", value: ImageAspectRatio.PORTRAIT },
  { label: "Paysage (16:9)", value: ImageAspectRatio.LANDSCAPE },
];

function CreateCampaign() {
  const [view, setView] = useState<"edit" | "preview">("edit");
  const { mutate: sendCampaign, isLoading: isSending } = useSendEmailCampaign({
    onSuccess: () => alert("Campagne envoyée avec succès !"),
  });

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<EmailCampaignDto>({
    resolver: zodResolver(emailCampaignSchema),
    defaultValues: {
      subject: "",
      blocks: [{ type: EmailBlockType.TITLE, content: "" }],
    }
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "blocks"
  });

  const campaign = watch();

  const onSubmit = (data: EmailCampaignDto) => {
    if (window.confirm("Voulez-vous vraiment envoyer cette campagne ?")) {
      sendCampaign(data);
    }
  };

  const handleLayoutChange = (index: number, count: number) => {
    const block = campaign.blocks[index];
    if (block.type !== EmailBlockType.IMAGE) return;
    
    const currentImages = block.images;
    const newImages = Array.from({ length: count }, (_, i) => currentImages[i] || { aspectRatio: ImageAspectRatio.AUTO, maxHeight: 300, caption: "" });
    setValue(`blocks.${index}.images` as `blocks.${number}.images`, newImages as EmailImageBlock['images']);
  };

  const handleImageChange = (file: File | undefined, blockIndex: number, imgIndex: number, onChange: (f: File | undefined) => void) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setValue(`blocks.${blockIndex}.images.${imgIndex}.url` as `blocks.${number}.images.${number}.url`, previewUrl);
      onChange(file);
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className={containerStyle}>
      <header className={headerStyle}>
        <div>
          <h1 className={titleStyle}>Composer une Campagne</h1>
          <p className={subtitleStyle}>Créez un email impactant pour vos abonnés</p>
        </div>
        <div className={css({ display: "flex", gap: "1rem" })}>
          <div className={css({ display: { base: "block", lg: "none" } })}>
            <Button 
              color="secondary" 
              onClick={() => setView(view === "edit" ? "preview" : "edit")}
            >
              {view === "edit" ? <><Eye size={18} /> Prévisualiser</> : <><Edit3 size={18} /> Modifier</>}
            </Button>
          </div>
          <Button color="success" onClick={handleSubmit(onSubmit)} disabled={isSending}>
            {isSending ? <Spinner size={18} /> : <><Send size={18} /> Diffuser la campagne</>}
          </Button>
        </div>
      </header>

      <div className={layoutStyle}>
        {/* Colonne ÉDITION */}
        <div className={cx(editorColumnStyle, view === "preview" && hideOnMobileStyle)}>
          <div className={cardStyle}>
            <FormInput register={register("subject")} errorMessage={errors.subject?.message}>
              Objet du mail
            </FormInput>
            <FormInput register={register("targetEmail")} placeholder="Email pour test (facultatif)">
              Email de test
            </FormInput>
          </div>

          <div className={blocksContainerStyle}>
            {fields.map((field, index) => (
              <DynamicContainer
                key={field.id}
                onDelete={() => remove(index)}
                onMoveUp={index > 0 ? () => move(index, index - 1) : undefined}
                onMoveDown={index < fields.length - 1 ? () => move(index, index + 1) : undefined}
              >
                {campaign.blocks[index].type === EmailBlockType.TITLE && (
                  <FormInput register={register(`blocks.${index}.content` as const)}>Titre</FormInput>
                )}

                {campaign.blocks[index].type === EmailBlockType.TEXT && (
                  <Controller
                    control={control}
                    name={`blocks.${index}.content` as const}
                    render={({ field: renderField }) => (
                      <FormCodeArea {...renderField} height="300px">Contenu Markdown</FormCodeArea>
                    )}
                  />
                )}

                {campaign.blocks[index].type === EmailBlockType.IMAGE && (
                  <div className={css({ display: "flex", flexDirection: "column", gap: "1.5rem" })}>
                    <div className={css({ maxWidth: "250px" })}>
                      <FormSelect
                        options={[
                          { label: "1 Image", value: "1" },
                          { label: "2 Images", value: "2" },
                          { label: "3 Images", value: "3" },
                        ]}
                        value={String(campaign.blocks[index].images.length)}
                        onChange={(val) => handleLayoutChange(index, parseInt(val))}
                      >
                        Disposition
                      </FormSelect>
                    </div>
                    <div className={css({ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" })}>
                      {campaign.blocks[index].images.map((_, imgIndex) => (
                        <div key={imgIndex} className={imageEditCardStyle}>
                          <Controller
                            control={control}
                            name={`blocks.${index}.images.${imgIndex}.file` as const}
                            render={({ field: { onChange } }) => (
                              <FormInput 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0], index, imgIndex, onChange)}
                              >
                                Image {imgIndex + 1}
                              </FormInput>
                            )}
                          />
                          <div className={css({ display: "flex", gap: "1rem", alignItems: "flex-end" })}>
                            <div className={css({ flex: 1 })}>
                              <Controller
                                control={control}
                                name={`blocks.${index}.images.${imgIndex}.aspectRatio` as const}
                                render={({ field: { onChange, value } }) => (
                                  <FormSelect
                                    options={aspectRatioOptions}
                                    value={value}
                                    onChange={onChange}
                                    inputSize="small"
                                  >
                                    Ratio
                                  </FormSelect>
                                )}
                              />
                            </div>
                            <div className={css({ flex: 1 })}>
                              <FormInput 
                                type="number" 
                                register={register(`blocks.${index}.images.${imgIndex}.maxHeight`, { valueAsNumber: true })}
                                width="small"
                              >
                                H. Max
                              </FormInput>
                            </div>
                          </div>
                          <FormInput 
                            register={register(`blocks.${index}.images.${imgIndex}.caption` as const)}
                            placeholder="Légende de la photo..."
                            width="medium"
                          >
                            Légende
                          </FormInput>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </DynamicContainer>
            ))}
          </div>

          <div className={addButtonsStyle}>
            <button onClick={() => append({ type: EmailBlockType.TITLE, content: "" })} className={addBlockButtonStyle}>
              <Type size={18} /> Titre
            </button>
            <button onClick={() => append({ type: EmailBlockType.TEXT, content: "" })} className={addBlockButtonStyle}>
              <AlignLeft size={18} /> Texte
            </button>
            <button onClick={() => append({ type: EmailBlockType.IMAGE, images: [{ aspectRatio: ImageAspectRatio.AUTO, maxHeight: 300, caption: "" }] })} className={addBlockButtonStyle}>
              <ImageIcon size={18} /> Images
            </button>
          </div>
        </div>

        {/* Colonne PREVIEW */}
        <div className={cx(previewColumnStyle, view === "edit" && hideOnMobileStyle)}>
          <div className={previewWrapperStyle}>
            <div className={previewHeaderStyle}>Aperçu réel</div>
            <EmailPreview campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Composant de Prévisualisation ---
function EmailPreview({ campaign }: { campaign: EmailCampaignDto }) {
  useEffect(() => {
    return () => {
      campaign.blocks.forEach(block => {
        if (block.type === EmailBlockType.IMAGE) {
          block.images.forEach(img => {
            if (img.url?.startsWith("blob:")) URL.revokeObjectURL(img.url);
          });
        }
      });
    };
  }, [campaign.blocks]);

  return (
    <div className={emailOuterStyle}>
      <div className={emailInnerStyle}>
        {campaign.blocks.map((block, i) => (
          <div key={i} className={css({ marginBottom: "2rem" })}>
            {block.type === EmailBlockType.TITLE && (
              <h1 className={previewTitleStyle}>{block.content || "Titre du mail"}</h1>
            )}
            {block.type === EmailBlockType.TEXT && (
              <div className={previewTextStyle}>
                <Markdown>{block.content || "Votre texte ici..."}</Markdown>
              </div>
            )}
            {block.type === EmailBlockType.IMAGE && (
              <div className={css({ display: "flex", gap: "10px", justifyContent: "center", alignItems: "flex-start" })}>
                {block.images.map((img, j) => (
                  <div key={j} className={css({ flex: 1, display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" })}>
                    <div 
                      className={cx(previewImageBoxStyle, img.url && previewImageActiveStyle)}
                      style={{ 
                        maxHeight: `${img.maxHeight}px`,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      {img.url ? (
                        <img 
                          src={img.url} 
                          alt="Aperçu" 
                          className={css({ 
                            maxWidth: "100%", 
                            height: "auto", 
                            maxHeight: "inherit",
                            objectFit: "contain",
                            borderRadius: "8px" 
                          })} 
                        />
                      ) : (
                        <>
                          <ImageIcon size={20} opacity={0.3} />
                          <span>Photo {j+1}</span>
                        </>
                      )}
                    </div>
                    {img.caption && (
                      <p className={css({ fontSize: "11px", color: "#666", fontStyle: "italic", textAlign: "center", margin: 0 })}>
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className={previewFooterStyle}>
          <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" })}>
            <img src={AmcoeurLogo} alt="Logo Amcoeur" className={css({ width: "100px", height: "auto", objectFit: "contain" })} />
            <p>Amcoeur — Association de protection animale</p>
            <p style={{ color: "#e11d48", fontSize: "12px" }}>
              <span style={{ fontWeight: "bold" }}>Faire un don</span>
              <span style={{ margin: "0 10px", color: "#ddd" }}>|</span>
              <span>Visiter notre site</span>
              <span style={{ margin: "0 10px", color: "#ddd" }}>|</span>
              <span>Nous contacter</span>
            </p>
            <p style={{ marginTop: "20px", fontSize: "10px", color: "#999" }}>
              Vous recevez ce mail car vous êtes inscrit à notre newsletter. <br />
              <span style={{ textDecoration: "underline" }}>Se désinscrire de la newsletter</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle = css({ display: "flex", flexDirection: "column", gap: "2rem" });
const headerStyle = css({ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1.5rem" });
const titleStyle = css({ fontSize: "2xl", fontWeight: "bold", color: "white" });
const subtitleStyle = css({ color: "amcoeurPale", fontSize: "sm" });
const layoutStyle = css({ 
  display: "flex", 
  flexDirection: "column", 
  lg: { flexDirection: "row" }, 
  gap: "2rem",
  width: "100%"
});

const editorColumnStyle = css({ 
  flex: 1, 
  display: "flex", 
  flexDirection: "column", 
  gap: "1.5rem",
  minWidth: 0
});

const previewColumnStyle = css({ 
  flex: 1, 
  position: "sticky", 
  top: "2rem", 
  height: "fit-content",
  minWidth: 0
});

const hideOnMobileStyle = css({ display: { base: "none!", lg: "flex!" } });
const cardStyle = css({ backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" });
const blocksContainerStyle = css({ display: "flex", flexDirection: "column", gap: "1rem" });
const addButtonsStyle = css({ 
  display: "flex", 
  gap: "1.5rem", 
  justifyContent: "center", 
  padding: "2rem",
  border: "2px dashed",
  borderColor: "rgba(225, 29, 72, 0.3)",
  borderRadius: "20px",
  backgroundColor: "rgba(225, 29, 72, 0.02)",
  margin: "1rem 0"
});
const addBlockButtonStyle = css({ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", color: "white", cursor: "pointer", "&:hover": { backgroundColor: "amcoeurRose" } });
const imageEditCardStyle = css({ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" });

const previewWrapperStyle = css({ 
  backgroundColor: "#f0f0f0", 
  borderRadius: "16px", 
  overflow: "hidden", 
  border: "1px solid #ccc",
  width: "100%"
});
const previewHeaderStyle = css({ padding: "0.5rem", textAlign: "center", fontSize: "xs", color: "#666", borderBottom: "1px solid #ddd" });
const emailOuterStyle = css({ backgroundColor: "#f8f8f8", padding: "2rem 1rem", minHeight: "500px", width: "100%", display: "flex", justifyContent: "center" });
const emailInnerStyle = css({ 
  backgroundColor: "white", 
  width: "100%", 
  maxWidth: "600px", 
  minHeight: "400px", 
  borderLeft: "15px solid", 
  borderRight: "15px solid", 
  borderColor: "#fda4af", 
  padding: "40px 30px", 
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
});
const previewTitleStyle = css({ color: "#e11d48", fontSize: "xl", marginBottom: "1rem", fontWeight: "bold" });
const previewTextStyle = css({ 
  color: "#333", 
  fontSize: "sm", 
  lineHeight: "1.6", 
  textAlign: "left", 
  "& p": { marginBottom: "1rem" },
  "& ul": { listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" },
  "& ol": { listStyleType: "decimal", paddingLeft: "1.5rem", marginBottom: "1rem" },
  "& li": { marginBottom: "0.5rem" },
  "& h1, & h2, & h3": { color: "#e11d48", fontWeight: "bold", marginTop: "1.5rem", marginBottom: "0.75rem" },
  "& h1": { fontSize: "lg" },
  "& h2": { fontSize: "md" },
  "& a": { color: "#e11d48", textDecoration: "underline" }
});
const previewImageBoxStyle = css({ backgroundColor: "#eee", width: "100%", height: "auto", minHeight: "100px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "xs", color: "#999", overflow: "hidden" });
const previewImageActiveStyle = css({ border: "none!", backgroundColor: "transparent!" });
const previewFooterStyle = css({ marginTop: "3rem", fontSize: "10px", color: "#999" });

export default CreateCampaign;
