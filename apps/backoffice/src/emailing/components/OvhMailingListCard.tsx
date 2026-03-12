import { Edit3, FileDown, RefreshCw, Search, Trash2, UploadCloud } from "lucide-react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Card from "../../global/components/atoms/Card/Card";
import Input from "../../global/components/atoms/Input/Input";
import { MutationState } from "../types";

type OvhMailingListCardProps = {
  refreshMutation: MutationState;
  removeMutation: MutationState;
  emailToRemove: string | null;
  onRefresh: () => void;
  onExportOVH: () => void;
  onExportUnsubscribes: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredEmails: string[];
  onRemoveSubscriber: (email: string) => void;
};

export const OvhMailingListCard = ({
  refreshMutation,
  removeMutation,
  emailToRemove,
  onRefresh,
  onExportOVH,
  onExportUnsubscribes,
  searchQuery,
  setSearchQuery,
  filteredEmails,
  onRemoveSubscriber,
}: OvhMailingListCardProps) => {
  return (
    <Card
      title="Liste de Diffusion OVH"
      description="Gérez l'envoi de vos campagnes et l'état de votre liste chez OVH."
      icon={<UploadCloud size={24} color="#e11d48" />}
    >
      <div className={actionsListStyle}>
        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Envoyer une campagne</strong>
            <span>Créez et envoyez un nouvel email à vos abonnés.</span>
          </div>
          <Button color="primary" to="/emailing/composer">
            <Edit3 size={18} className={css({ marginRight: "0.5rem" })} />
            Composer
          </Button>
        </div>

        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Rafraîchir les données</strong>
            <span>Mettre à jour les statistiques depuis OVH.</span>
          </div>
          <Button color="secondary" onClick={onRefresh} disabled={refreshMutation.isLoading}>
            <RefreshCw size={18} className={refreshMutation.isLoading ? css({ animation: "spin 1s linear infinite" }) : undefined} />
          </Button>
        </div>

        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Exporter la liste OVH</strong>
            <span>Téléchargez la liste actuelle des abonnés.</span>
          </div>
          <Button color="secondary" onClick={onExportOVH}>
            <FileDown size={18} />
          </Button>
        </div>

        <div className={actionItemStyle}>
          <div className={actionInfoStyle}>
            <strong>Exporter les désinscrits</strong>
            <span>Téléchargez la liste des désabonnés.</span>
          </div>
          <Button color="info" onClick={onExportUnsubscribes}>
            <FileDown size={18} />
          </Button>
        </div>
      </div>

      <div className={subSectionStyle}>
        <h3 className={subSectionTitleStyle}>Vérifier un abonné</h3>
        <p className={cardDescStyle}>Recherchez si un email spécifique est présent sur la liste OVH.</p>
        
        <div className={css({ position: "relative", marginTop: "1rem" })}>
          <Input
            placeholder="Ex: contact@exemple.fr"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <div className={searchIconStyle}><Search size={18} /></div>
        </div>

        {removeMutation.isLoading && (
          <div className={css({ color: "amcoeurRose", fontSize: "xs", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold" })}>
            <div className={css({ animation: "spin 1s linear infinite", display: "flex" })}><RefreshCw size={14} /></div>
            <span>Suppression de {emailToRemove} en cours...</span>
          </div>
        )}

        {removeMutation.isSuccess && !removeMutation.isLoading && (
          <div className={css({ color: "green.400", fontSize: "xs", marginTop: "1rem", fontWeight: "bold" })}>
            L'abonné a été retiré d'OVH et marqué comme désinscrit.
          </div>
        )}

        {searchQuery && (
          <div className={resultsWrapperStyle}>
            <div className={resultsHeaderStyle}>{filteredEmails.length} résultat(s) sur OVH</div>
            <div className={resultsListStyle}>
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email: string) => (
                  <div key={email} className={resultItemStyle}>
                    <span className={css({ flex: 1, overflow: "hidden", textOverflow: "ellipsis", fontSize: "sm" })}>{email}</span>
                    <button onClick={() => onRemoveSubscriber(email)} className={removeButtonStyle} title="Supprimer d'OVH">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className={noResultStyle}>Aucun email correspondant</div>
              )}
            </div>
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

const searchIconStyle = css({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "rgba(255,255,255,0.2)",
  pointerEvents: "none",
});

const resultsWrapperStyle = css({
  marginTop: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
});

const resultsHeaderStyle = css({
  padding: "0.75rem 1rem",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  fontSize: "xs",
  color: "amcoeurPale",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const resultsListStyle = css({
  maxHeight: "200px",
  overflowY: "auto",
});

const resultItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.75rem 1rem",
  color: "white",
  borderBottom: "1px solid rgba(255, 255, 255, 0.02)",
  "&:last-child": { borderBottom: "none" },
  "&:hover": { backgroundColor: "rgba(225, 29, 72, 0.05)" }
});

const removeButtonStyle = css({
  background: "transparent",
  border: "none",
  color: "rgba(255, 255, 255, 0.3)",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  transition: "all 0.2s",
  "&:hover": { color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)" }
});

const noResultStyle = css({
  padding: "1.5rem",
  textAlign: "center",
  color: "rgba(255,255,255,0.3)",
  fontSize: "sm",
});
