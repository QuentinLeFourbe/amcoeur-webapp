import { Trash2 } from "lucide-react";

import { css } from "../../../styled-system/css";
import { SyncJobStatus } from "../types";

type SyncProgressProps = {
  jobStatus: SyncJobStatus | null;
  onClose: () => void;
};

export const SyncProgress = ({ jobStatus, onClose }: SyncProgressProps) => {
  return (
    <div className={css({ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "1.5rem", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" })}>
      <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "sm", fontWeight: "bold", color: jobStatus?.status === "completed" ? "green.400" : "amcoeurPale" })}>
            {jobStatus?.status === "processing" ? "Exportation en cours..." : 
             jobStatus?.status === "completed" ? "Exportation terminée !" : 
             jobStatus?.status === "failed" ? "Échec de l'export" : "Initialisation..."}
          </span>
        </div>
        {(jobStatus?.status === "completed" || jobStatus?.status === "failed") && (
          <button 
            onClick={onClose}
            className={css({ color: "rgba(255,255,255,0.2)", "&:hover": { color: "#ef4444" }, cursor: "pointer", transition: "color 0.2s" })}
            title="Effacer le statut"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className={css({ fontSize: "xs", color: "rgba(255,255,255,0.4)", textAlign: "right", marginTop: "-0.5rem" })}>
        {jobStatus?.processed || 0} / {jobStatus?.total || 0}
      </div>

      {/* Progress Bar */}
      <div className={css({ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "full", overflow: "hidden" })}>
        <div 
          className={css({ height: "100%", backgroundColor: jobStatus?.status === "failed" ? "red.500" : jobStatus?.status === "completed" ? "green.400" : "amcoeurRose", transition: "width 0.3s ease" })} 
          style={{ width: `${jobStatus?.total ? (jobStatus.processed / jobStatus.total) * 100 : 0}%` }}
        />
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" })}>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Ajoutés</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: "green.400" })}>{jobStatus?.added || 0}</span>
        </div>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Retirés</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: "orange.400" })}>{jobStatus?.removed || 0}</span>
        </div>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Erreurs</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: (jobStatus?.errors || 0) > 0 ? "red.400" : "white" })}>{jobStatus?.errors || 0}</span>
        </div>
      </div>

      {jobStatus?.status === "failed" && (
        <p className={css({ color: "red.400", fontSize: "xs", borderTop: "1px solid rgba(239, 68, 68, 0.2)", paddingTop: "0.5rem" })}>
          Erreur : {jobStatus?.error}
        </p>
      )}
    </div>
  );
};
