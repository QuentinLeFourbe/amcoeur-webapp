import { FileDown, FileUp, UploadCloud, Users2 } from "lucide-react";
import { useRef } from "react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Card from "../../global/components/atoms/Card/Card";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import { SyncPreview } from "./SyncPreview";
import { SyncProgress } from "./SyncProgress";

type LocalContactsCardProps = {
  importMutation: unknown;
  syncMutation: unknown;
  onImport: (file: File) => void;
  onExport: () => void;
  onPrepareSync: () => void;
  onLaunchSync: () => void;
  onCancelSync: () => void;
  onCloseSyncStatus: () => void;
  showSyncPreview: boolean;
  activeJobId: string | null;
  jobStatus: unknown;
};

export const LocalContactsCard = ({
  importMutation,
  syncMutation,
  onImport,
  onExport,
  onPrepareSync,
  onLaunchSync,
  onCancelSync,
  onCloseSyncStatus,
  showSyncPreview,
  activeJobId,
  jobStatus,
}: LocalContactsCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImport(file);
  };

  return (
    <Card 
      title="Base de Contacts Locale"
      description="Gérez votre base de données centrale et exportez-la vers OVH."
      icon={<Users2 size={24} color="#e11d48" />}
      accentColor="amcoeurRose"
      paddingLeft="3rem"
    >
      <div className={actionsListStyle}>
        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Consulter la base</strong>
            <span>Visualisez, modifiez ou supprimez vos contacts locaux.</span>
          </div>
          <Button color="primary" to="/emailing/contacts" className={css({ flexShrink: 0 })}>
            Voir les contacts
          </Button>
        </div>

        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Importer des contacts</strong>
            <span>Ajoutez des contacts via un fichier CSV ou Excel.</span>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv, .xlsx, .xls" style={{ display: "none" }} />
          <Button color="secondary" onClick={() => fileInputRef.current?.click()} disabled={(importMutation as any).isLoading}>
            <FileUp size={18} className={css({ marginRight: "0.5rem" })} />
            Importer
          </Button>
        </div>

        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Exporter la base</strong>
            <span>Téléchargez vos contacts locaux au format CSV.</span>
          </div>
          <Button color="secondary" onClick={onExport}>
            <FileDown size={18} className={css({ marginRight: "0.5rem" })} />
            Exporter
          </Button>
        </div>
      </div>

      {(importMutation as any).isLoading && (
        <div className={css({ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" })}>
          <Spinner size={20} color="amcoeurRose" inline />
          <span className={css({ fontSize: "sm", color: "amcoeurRose" })}>Importation en cours...</span>
        </div>
      )}
      {(importMutation as any).isSuccess && (
        <div className={css({ color: "green.400", marginTop: "1rem", fontSize: "sm", fontWeight: "bold" })}>
          Import réussi : {(importMutation as any).data.summary.imported} ajoutés, {(importMutation as any).data.summary.updated} mis à jour.
        </div>
      )}

      {/* Export to OVH Sub-section */}
      <div className={subSectionStyle}>
        <h3 className={subSectionTitleStyle}>Exportation vers OVH</h3>
        <p className={cardDescStyle}>Transférez vos contacts locaux vers la mailing list OVH.</p>
        
        {!activeJobId ? (
          <>
            {!showSyncPreview ? (
              <Button color="success" onClick={onPrepareSync} disabled={(syncMutation as any).isLoading || (importMutation as any).isLoading} bold className={css({ width: "100%", marginTop: "1rem" })}>
                <UploadCloud size={18} className={css({ marginRight: "0.5rem" })} />
                1. Préparer l'export vers OVH
              </Button>
            ) : (
              <SyncPreview 
                summary={(syncMutation as any).data?.summary} 
                onLaunch={onLaunchSync} 
                onCancel={onCancelSync} 
                isLoading={(syncMutation as any).isLoading} 
              />
            )}
          </>
        ) : (
          <SyncProgress jobStatus={jobStatus} onClose={onCloseSyncStatus} />
        )}
        
        {(syncMutation as any).isLoading && !activeJobId && (
          <div className={css({ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" })}>
            <Spinner size={20} color="#e11d48" inline />
            <span className={css({ fontSize: "sm", color: "amcoeurRose" })}>Traitement en cours...</span>
          </div>
        )}
      </div>
    </Card>
  );
};

const cardDescStyle = css({
  color: "rgba(255,255,255,0.4)",
  fontSize: "sm",
  lineHeight: "relaxed",
});

const actionsListStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const actionItemStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
  backgroundColor: "rgba(255,255,255,0.03)",
  borderRadius: "12px",
  gap: "1.5rem",
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
  }
});

const actionInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.15rem",
  "& strong": {
    fontSize: "sm",
    color: "white",
  },
  "& span": {
    fontSize: "xs",
    color: "rgba(255,255,255,0.3)",
  }
});

const subSectionStyle = css({
  marginTop: "1rem",
  paddingTop: "1.5rem",
  borderTop: "1px solid rgba(255,255,255,0.05)",
});

const subSectionTitleStyle = css({
  fontSize: "md",
  fontWeight: "bold",
  color: "white",
  marginBottom: "0.5rem",
});
