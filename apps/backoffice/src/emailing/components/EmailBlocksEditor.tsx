import { EmailBlockType, EmailImageBlock } from "@amcoeur/types";
import { AlignLeft, Image as ImageIcon, Type } from "lucide-react";
import { Control, Controller, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { css } from "../../../styled-system/css";
import FormCodeArea from "../../global/components/molecules/Form/FormCodeArea";
import FormInput from "../../global/components/molecules/Form/FormInput";
import FormSelect from "../../global/components/molecules/Form/FormSelect";
import DynamicContainer from "../../global/components/organisms/DynamicContainer/DynamicContainer";

interface EmailBlocksEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any[];
}

/**
 * Component for managing the list of blocks in an email campaign.
 * Handles adding, removing, and reordering titles, text, and images.
 */
export const EmailBlocksEditor = ({ control, register, setValue, blocks }: EmailBlocksEditorProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "blocks"
  });

  const handleLayoutChange = (index: number, count: number) => {
    const block = blocks[index];
    if (block.type !== EmailBlockType.IMAGE) return;
    
    const currentImages = block.images;
    const newImages = Array.from({ length: count }, (_, i) => currentImages[i] || { maxHeight: 300, caption: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(`blocks.${index}.images`, newImages as any);
  };

  const handleImageChange = (file: File | undefined, blockIndex: number, imgIndex: number, onChange: (f: File | undefined) => void) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(`blocks.${blockIndex}.images.${imgIndex}.url` as any, previewUrl);
      onChange(file);
    } else {
      onChange(undefined);
    }
  };

  return (
    <>
      <div className={blocksContainerStyle}>
        {fields.map((field, index) => (
          <DynamicContainer
            key={field.id}
            onDelete={() => remove(index)}
            onMoveUp={index > 0 ? () => move(index, index - 1) : undefined}
            onMoveDown={index < fields.length - 1 ? () => move(index, index + 1) : undefined}
          >
            {blocks[index].type === EmailBlockType.TITLE && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <FormInput register={register(`blocks.${index}.content` as any)}>Titre</FormInput>
            )}

            {blocks[index].type === EmailBlockType.TEXT && (
              <Controller
                control={control}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={`blocks.${index}.content` as any}
                render={({ field: renderField }) => (
                  <FormCodeArea {...renderField} height="300px">Contenu Markdown</FormCodeArea>
                )}
              />
            )}

            {blocks[index].type === EmailBlockType.IMAGE && (
              <div className={css({ display: "flex", flexDirection: "column", gap: "1.5rem" })}>
                <div className={css({ maxWidth: "250px" })}>
                  <FormSelect
                    options={[
                      { label: "1 Image", value: "1" },
                      { label: "2 Images", value: "2" },
                      { label: "3 Images", value: "3" },
                    ]}
                    value={String(blocks[index].images.length)}
                    onChange={(val) => handleLayoutChange(index, parseInt(val))}
                  >
                    Disposition
                  </FormSelect>
                </div>
                <div className={css({ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" })}>
                  {(blocks[index] as EmailImageBlock).images.map((_, imgIndex: number) => (
                    <div key={imgIndex} className={imageEditCardStyle}>
                      <Controller
                        control={control}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        name={`blocks.${index}.images.${imgIndex}.file` as any}
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
                          <FormInput 
                            type="number" 
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            register={register(`blocks.${index}.images.${imgIndex}.maxHeight` as any, { valueAsNumber: true })}
                            width="small"
                          >
                            H. Max
                          </FormInput>
                        </div>
                      </div>
                      <FormInput 
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        register={register(`blocks.${index}.images.${imgIndex}.caption` as any)}
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
        <button type="button" onClick={() => append({ type: EmailBlockType.TITLE, content: "" })} className={addBlockButtonStyle}>
          <Type size={18} /> Titre
        </button>
        <button type="button" onClick={() => append({ type: EmailBlockType.TEXT, content: "" })} className={addBlockButtonStyle}>
          <AlignLeft size={18} /> Texte
        </button>
        <button type="button" onClick={() => append({ type: EmailBlockType.IMAGE, images: [{ maxHeight: 300, caption: "" }] })} className={addBlockButtonStyle}>
          <ImageIcon size={18} /> Images
        </button>
      </div>
    </>
  );
};

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
const addBlockButtonStyle = css({ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", color: "white", cursor: "pointer", border: "none", backgroundColor: "transparent", "&:hover": { backgroundColor: "rgba(225, 29, 72, 0.1)" } });
const imageEditCardStyle = css({ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" });
