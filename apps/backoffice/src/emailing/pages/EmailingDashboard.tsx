import { useState, useMemo } from "react";
import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Input from "../../global/components/atoms/Input/Input";
import { useGetMailingListStats, useRefreshMailingList, useRemoveSubscriber } from "../hooks/useContacts";
import { exportUnsubscribes } from "../api/contact";
import { Search, Trash2, RefreshCw } from "lucide-react";

function EmailingDashboard() {
  const { data: statsData, isLoading: isLoadingStats } = useGetMailingListStats();
  const refreshMutation = useRefreshMailingList();
  const removeMutation = useRemoveSubscriber();
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = () => {
    refreshMutation.mutate();
  };

  const handleRemove = (email: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${email} de la liste de diffusion ?`)) {
      removeMutation.mutate(email);
    }
  };

  const stats = statsData || { 
    ovh: { count: 0, emails: [] as string[], name: "" }, 
    db: { contactsCount: 0, unsubscribesCount: 0 } 
  };

  const filteredEmails = useMemo(() => {
    if (!searchQuery) return [];
    return stats.ovh.emails.filter((email: string) => 
      email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stats.ovh.emails]);

  return (
    <div className={containerStyle}>
      <h1 className={titleStyle}>Gestion de l'Emailing</h1>

      {/* Stats Grid */}
      <div className={statsGridStyle}>
        <div className={statCardStyle}>
          <div className={statLabelStyle}>Abonnés OVH</div>
          <div className={statValueStyle}>{isLoadingStats ? "..." : stats.ovh.count}</div>
        </div>
        <div className={statCardStyle}>
          <div className={statLabelStyle}>Désinscriptions (Local)</div>
          <div className={statValueStyle}>{isLoadingStats ? "..." : stats.db.unsubscribesCount}</div>
        </div>
      </div>

      <div className={mainGridStyle}>
        {/* Colonne de Gauche : Actions */}
        <div className={cardStyle}>
          <h2 className={cardTitleStyle}>Actions de la Liste</h2>
          <p className={cardDescStyle}>
            Gérez la liste de diffusion OVH. Vous pouvez forcer la mise à jour des données 
            ou exporter les désinscriptions enregistrées localement.
          </p>
          
          <div className={actionsStyle}>
            <Button color="primary" onClick={handleRefresh} disabled={refreshMutation.isLoading}>
              <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
                <RefreshCw size={18} className={refreshMutation.isLoading ? css({ animation: "spin 1s linear infinite" }) : undefined} />
                <span>Recharger la base OVH</span>
              </div>
            </Button>
            <Button color="info" onClick={exportUnsubscribes}>
              Exporter les désinscrits (CSV)
            </Button>
          </div>

          {(refreshMutation.isLoading || removeMutation.isLoading) && (
            <div className={css({ marginTop: "1rem" })}><Spinner size={24} color="amcoeurRose" /></div>
          )}
          
          {refreshMutation.isSuccess && (
             <div className={css({ color: "green.400", marginTop: "1rem", fontSize: "sm" })}>
               Base OVH rechargée avec succès.
             </div>
          )}
        </div>

        {/* Colonne de Droite : Recherche dans la liste */}
        <div className={cardStyle}>
          <h2 className={cardTitleStyle}>Rechercher un Abonné</h2>
          <div className={searchContainerStyle}>
            <div className={css({ position: "relative" })}>
              <Input
                placeholder="Chercher un email sur OVH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
              <div className={searchIconStyle}><Search size={18} /></div>
            </div>
          </div>

          {searchQuery && (
            <div className={resultsWrapperStyle}>
              <div className={resultsHeaderStyle}>
                {filteredEmails.length} résultat(s)
              </div>
              <div className={resultsListStyle}>
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email: string) => (
                    <div key={email} className={resultItemStyle}>
                      <span className={css({ flex: 1, overflow: "hidden", textOverflow: "ellipsis" })}>{email}</span>
                      <button 
                        onClick={() => handleRemove(email)} 
                        className={removeButtonStyle}
                        title="Supprimer de la liste"
                      >
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
          
          {!searchQuery && (
            <p className={css({ color: "rgba(255,255,255,0.3)", fontSize: "sm", textAlign: "center", marginTop: "2rem" })}>
              Entrez un email ou une partie d'email pour vérifier sa présence sur OVH.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
});

const statsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "1.5rem",
});

const statCardStyle = css({
  backgroundColor: "rgba(225, 29, 72, 0.1)",
  border: "1px solid rgba(225, 29, 72, 0.2)",
  padding: "1.5rem",
  borderRadius: "16px",
  textAlign: "center",
});

const statLabelStyle = css({
  color: "amcoeurPale",
  fontSize: "sm",
  marginBottom: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const statValueStyle = css({
  fontSize: "3xl",
  fontWeight: "bold",
  color: "white",
});

const mainGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1.5rem",
  xl: {
    gridTemplateColumns: "1fr 1fr",
  }
});

const cardStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "2rem",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
});

const cardTitleStyle = css({
  fontSize: "lg",
  fontWeight: "bold",
  color: "white",
  marginBottom: "1rem",
});

const cardDescStyle = css({
  color: "amcoeurPale",
  fontSize: "sm",
  lineHeight: "relaxed",
  marginBottom: "1.5rem",
});

const actionsStyle = css({
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
});

const searchContainerStyle = css({
  marginBottom: "1.5rem",
});

const searchIconStyle = css({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "rgba(255,255,255,0.2)",
  pointerEvents: "none",
});

const resultsWrapperStyle = css({
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
  maxHeight: "300px",
  overflowY: "auto",
  padding: "0.5rem",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
  }
});

const resultItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.75rem 1rem",
  fontSize: "sm",
  color: "white",
  borderBottom: "1px solid rgba(255, 255, 255, 0.02)",
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    backgroundColor: "rgba(225, 29, 72, 0.1)",
  }
});

const removeButtonStyle = css({
  background: "transparent",
  border: "none",
  color: "rgba(255, 255, 255, 0.3)",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  transition: "all 0.2s",
  "&:hover": {
    color: "#f87171",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  }
});

const noResultStyle = css({
  padding: "2rem",
  textAlign: "center",
  color: "rgba(255,255,255,0.3)",
  fontSize: "sm",
});

export default EmailingDashboard;
