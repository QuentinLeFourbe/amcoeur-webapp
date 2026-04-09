import { EmailPayload } from "@amcoeur/email-builder";
import { EmailBlockType, EmailCampaignDto, emailCampaignSchema } from "@amcoeur/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Eye, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { css, cx } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import FormInput from "../../global/components/molecules/Form/FormInput";
import Modal from "../../global/components/molecules/Modal/Modal";
import { EmailBlocksEditor } from "../components/EmailBlocksEditor";
import { EmailPreviewFrame } from "../components/EmailPreviewFrame";
import { useSendEmailCampaign } from "../hooks/useContacts";

/**
 * Main page for composing and diffusing email campaigns.
 * Features a dynamic block-based editor with a real-time responsive preview.
 * 
 * @returns The campaign builder interface
 */
function CreateCampaign() {
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<EmailCampaignDto | null>(null);

  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm<EmailCampaignDto>({
    resolver: zodResolver(emailCampaignSchema),
    defaultValues: {
      subject: "",
      blocks: [{ type: EmailBlockType.TITLE, content: "" }],
    }
  });

  const { mutate: sendCampaign, isPending: isSending } = useSendEmailCampaign({
    onSuccess: () => {
      setIsSuccess(true);
      reset({
        subject: "",
        blocks: [{ type: EmailBlockType.TITLE, content: "" }],
      });
    },
  });

  const campaign = watch();

  /**
   * Mapping logic to convert form data (EmailCampaignDto) to the internal library format (EmailPayload).
   */
  const emailPayload: EmailPayload = useMemo(() => {
    return {
      subject: campaign.subject || "Sans objet",
      blocks: (campaign.blocks || []).map((block) => {
        if (block.type === EmailBlockType.TITLE) {
          return { type: "title", content: block.content };
        }
        if (block.type === EmailBlockType.TEXT) {
          return { type: "text", markdown: block.content };
        }
        if (block.type === EmailBlockType.IMAGE) {
          return {
            type: "image",
            layout: block.images.length === 1 ? "single" : block.images.length === 2 ? "duo" : "trio",
            images: block.images.map(img => ({
              url: img.url || "",
              alt: img.caption || "",
              maxHeight: img.maxHeight,
              caption: img.caption
            }))
          };
        }
        return { type: "title", content: "" }; // Fallback
      }) as EmailPayload["blocks"]
    };
  }, [campaign]);

  /**
   * Triggers the confirmation modal before final sending.
   */
  const onSubmit = (data: EmailCampaignDto) => {
    setFormData(data);
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  /**
   * Actually triggers the API call from within the modal.
   */
  const handleConfirmSend = () => {
    if (formData) {
      sendCampaign(formData);
    }
  };

  /**
   * Closes the modal and resets internal state if not currently sending.
   */
  const handleCloseModal = () => {
    if (!isSending) {
      setIsModalOpen(false);
      setIsSuccess(false);
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
          <Button color="success" onClick={handleSubmit(onSubmit)}>
            <Send size={18} /> Diffuser la campagne
          </Button>
        </div>
      </header>

      <div className={layoutStyle}>
        {/* Colonne ÉDITION */}
        <div className={cx(editorColumnStyle, view === "preview" && hideOnMobileStyle)}>
          <div className={cardStyle}>
            <FormInput register={register("subject")} errorMessage={errors.subject?.message ? String(errors.subject.message) : undefined}>
              Objet du mail
            </FormInput>
            <FormInput register={register("targetEmail")} placeholder="Email pour test (facultatif)">
              Email de test
            </FormInput>
          </div>

          <EmailBlocksEditor 
            control={control}
            register={register}
            setValue={(name, value) => reset({ ...campaign, [name]: value })}
            blocks={campaign.blocks || []}
          />
        </div>

        {/* Colonne PREVIEW */}
        <div className={cx(previewColumnStyle, view === "edit" && hideOnMobileStyle)}>
          <div className={previewWrapperStyle}>
            <div className={previewHeaderStyle}>Aperçu réel (Email Builder)</div>
            <div className={previewScrollContainerStyle}>
              <EmailPreviewFrame 
                payload={emailPayload} 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                baseUrl={(import.meta as any).env?.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : `${window.location.origin}/api`)} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Unique de Flux d'Envoi */}
      <Modal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        title={isSuccess ? "Notification de succès" : "Confirmation d'envoi"}
        confirmText={isSuccess ? "Terminer" : (isSending ? "Envoi..." : "Confirmer l'envoi")}
        onConfirm={isSuccess ? handleCloseModal : handleConfirmSend}
        isLoading={isSending}
        hideCancel={isSending || isSuccess}
        variant={isSuccess ? "success" : "primary"}
      >
        {isSending ? (
          <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "1.5rem 0" })}>
            <Spinner size={64} />
            <p className={css({ textAlign: "center", color: "white!", fontWeight: "medium" })}>
              Expédition de la campagne en cours...
            </p>
          </div>
        ) : isSuccess ? (
          <p>La campagne a été transmise avec succès. Le formulaire a été réinitialisé.</p>
        ) : (
          <p>Souhaitez-vous confirmer l'envoi immédiat de cette campagne à tous vos contacts ? Cette action est irréversible.</p>
        )}
      </Modal>
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
  width: "100%",
  alignItems: "flex-start"
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
  height: "calc(100vh - 4rem)",
  minWidth: 0
});

const hideOnMobileStyle = css({ display: { base: "none!", lg: "flex!" } });
const cardStyle = css({ backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" });

const previewWrapperStyle = css({ 
  backgroundColor: "#f0f0f0", 
  borderRadius: "16px", 
  overflow: "hidden", 
  border: "1px solid #ccc",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column"
});
const previewHeaderStyle = css({ padding: "0.5rem", textAlign: "center", fontSize: "xs", color: "#666", borderBottom: "1px solid #ddd", flexShrink: 0 });
const previewScrollContainerStyle = css({ 
  flex: 1, 
  overflowY: "auto", 
  padding: "1rem",
  "& > div": {
    margin: "0 auto",
  }
});

export default CreateCampaign;
