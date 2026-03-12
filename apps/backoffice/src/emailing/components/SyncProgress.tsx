import { Trash2 } from "lucide-react";

import { css } from "../../../styled-system/css";

type SyncProgressProps = {
  jobStatus: unknown;
  onClose: () => void;
};

export const SyncProgress = ({ jobStatus, onClose }: SyncProgressProps) => {
  const status = jobStatus as any;
  return (
    <div className={css({ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "1.5rem", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" })}>
      <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "sm", fontWeight: "bold", color: status?.status === "completed" ? "green.400" : "amcoeurPale" })}>
            {status?.status === "processing" ? "Exportation en cours..." : 
             status?.status === "completed" ? "Exportation terminée !" : 
             status?.status === "failed" ? "Échec de l'export" : "Initialisation..."}
          </span>
        </div>
        {(status?.status === "completed" || status?.status === "failed") && (
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
        {status?.processed || 0} / {status?.total || 0}
      </div>

      {/* Progress Bar */}
      <div className={css({ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "full", overflow: "hidden" })}>
        <div 
          className={css({ height: "100%", backgroundColor: status?.status === "failed" ? "red.500" : status?.status === "completed" ? "green.400" : "amcoeurRose", transition: "width 0.3s ease" })} 
          style={{ width: `${status?.total ? (status.processed / status.total) * 100 : 0}%` }}
        />
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" })}>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Ajoutés</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: "green.400" })}>{status?.added || 0}</span>
        </div>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Retirés</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: "orange.400" })}>{status?.removed || 0}</span>
        </div>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.3)" })}>Erreurs</span>
          <span className={css({ fontSize: "md", fontWeight: "bold", color: (status?.errors || 0) > 0 ? "red.400" : "white" })}>{status?.errors || 0}</span>
        </div>
      </div>

      {status?.status === "failed" && (
        <p className={css({ color: "red.400", fontSize: "xs", borderTop: "1px solid rgba(239, 68, 68, 0.2)", paddingTop: "0.5rem" })}>
          Erreur : {status?.error}
        </p>
      )}
    </div>
  );
};
