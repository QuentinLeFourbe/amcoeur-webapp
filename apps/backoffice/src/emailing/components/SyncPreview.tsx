import { ArrowRight } from "lucide-react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";

type SyncPreviewProps = {
  summary: {
    toAddCount: number;
    toRemoveCount: number;
    ignoredUnsubscribedCount: number;
    alreadyInOvhCount: number;
    invalidFormatCount: number;
  };
  onLaunch: () => void;
  onCancel: () => void;
  isLoading: boolean;
};

export const SyncPreview = ({ summary, onLaunch, onCancel, isLoading }: SyncPreviewProps) => {
  return (
    <div className={syncPreviewBoxStyle}>
      <h3 className={css({ fontWeight: "bold", fontSize: "sm", marginBottom: "1rem", color: "white" })}>
        Résultat de l'analyse :
      </h3>
      <div className={css({ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "sm", color: "amcoeurPale" })}>
        <div className={css({ display: "flex", justifyContent: "space-between" })}>
          <span>Nouveaux contacts à ajouter :</span>
          <span className={css({ color: "white", fontWeight: "bold" })}>{summary.toAddCount || 0}</span>
        </div>
        <div className={css({ display: "flex", justifyContent: "space-between" })}>
          <span>Contacts ignorés (désinscrits) :</span>
          <span className={css({ fontWeight: "bold" })}>{summary.ignoredUnsubscribedCount || 0}</span>
        </div>
        <div className={css({ display: "flex", justifyContent: "space-between" })}>
          <span>Déjà présent :</span>
          <span>{summary.alreadyInOvhCount || 0}</span>
        </div>
        {(summary.invalidFormatCount || 0) > 0 && (
          <div className={css({ display: "flex", justifyContent: "space-between", color: "orange.300" })}>
            <span>Format invalide (ignorés) :</span>
            <span>{summary.invalidFormatCount}</span>
          </div>
        )}
        {(summary.toRemoveCount || 0) > 0 && (
          <div className={css({ display: "flex", justifyContent: "space-between", color: "red.300", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.5rem", marginTop: "0.25rem" })}>
            <span>Abonnés OVH à retirer (désinscrits) :</span>
            <span className={css({ fontWeight: "bold" })}>{summary.toRemoveCount}</span>
          </div>
        )}
      </div>

      <div className={css({ display: "flex", gap: "1rem", marginTop: "2rem" })}>
        <Button color="success" onClick={onLaunch} disabled={isLoading} className={css({ flex: 1 })}>
          <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
            <ArrowRight size={18} className={css({ marginRight: "0.5rem" })} />
            <span>2. Lancer l'export</span>
          </div>
        </Button>
        <Button color="secondary" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

const syncPreviewBoxStyle = css({
  backgroundColor: "rgba(225, 29, 72, 0.05)",
  padding: "1.5rem",
  borderRadius: "16px",
  border: "1px dashed",
  borderColor: "amcoeurRose",
  marginTop: "1.5rem",
});
