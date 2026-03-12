import { 
  ArrowRight, 
  Edit3, 
  FileDown, 
  FileUp,
  RefreshCw, 
  Search, 
  Trash2, 
  UploadCloud, 
  Users2 
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Input from "../../global/components/atoms/Input/Input";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Modal from "../../global/components/molecules/Modal/Modal";
import { exportContacts, exportOVHList, exportUnsubscribes } from "../api/contact";
import { 
  useGetMailingListStats, 
  useImportContacts, 
  useRefreshMailingList, 
  useRemoveSubscriber, 
  useSyncStatus,
  useSyncWithOVH 
} from "../hooks/useContacts";

const SYNC_JOB_KEY = "amcoeur_active_sync_job";

function EmailingDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSyncPreview, setShowSyncPreview] = useState(false);
  const [emailToRemove, setEmailToRemove] = useState<string | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Job Tracking
  const [activeJobId, setActiveJobId] = useState<string | null>(() => localStorage.getItem(SYNC_JOB_KEY));
  const { data: jobStatus } = useSyncStatus(activeJobId);

  // Queries & Mutations
  const { data: statsData, isLoading: isLoadingStats } = useGetMailingListStats();
  const refreshMutation = useRefreshMailingList();
  const syncMutation = useSyncWithOVH();
  const removeMutation = useRemoveSubscriber();
  const importMutation = useImportContacts();

  // Handlers
  const handleRefresh = () => refreshMutation.mutate();
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importMutation.mutate(file);
    }
  };

  const handlePrepareSync = () => {
    syncMutation.mutate(true, {
      onSuccess: () => setShowSyncPreview(true)
    });
  };

  const handleCommitSync = () => {
    syncMutation.mutate(false, {
      onSuccess: (data) => {
        if (data.jobId) {
          setActiveJobId(data.jobId);
          localStorage.setItem(SYNC_JOB_KEY, data.jobId);
          setIsSyncModalOpen(false); // Fermer la modale dès que l'export est lancé
        }
      }
    });
  };

  const handleCancelSync = () => {
    setShowSyncPreview(false);
    syncMutation.reset();
  };

  const handleCloseSyncStatus = () => {
    setActiveJobId(null);
    localStorage.removeItem(SYNC_JOB_KEY);
    setShowSyncPreview(false);
    syncMutation.reset();
  };

  const handleRemove = () => {
    if (emailToRemove) {
      removeMutation.mutate(emailToRemove, {
        onSuccess: () => setEmailToRemove(null)
      });
    }
  };

  // Stats computed
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
      <h1 className={titleStyle}>Emailing & Contacts</h1>

      {/* 1. Global Stats */}
      <div className={statsGridStyle}>
        <div className={statCardStyle}>
          <div className={statLabelStyle}>Abonnés OVH ({stats.ovh.name})</div>
          <div className={statValueStyle}>{isLoadingStats ? "..." : stats.ovh.count}</div>
        </div>
        <div className={statCardStyle}>
          <div className={statLabelStyle}>Contacts (Base Locale)</div>
          <div className={statValueStyle}>{isLoadingStats ? "..." : stats.db.contactsCount}</div>
        </div>
        <div className={statCardStyle}>
          <div className={statLabelStyle}>Désinscriptions</div>
          <div className={statValueStyle}>{isLoadingStats ? "..." : stats.db.unsubscribesCount}</div>
        </div>
      </div>

      <div className={mainGridStyle}>
        
        {/* 2. Left Card: Local Contact Management */}
        <div className={cardStyle}>
          <div className={cardHeaderStyle}>
            <div className={iconWrapperStyle}><Users2 size={24} color="#e11d48" /></div>
            <div>
              <h2 className={cardTitleStyle}>Base de Contacts Locale</h2>
              <p className={cardDescStyle}>Gérez votre base de données centrale. Les contacts importés ici peuvent ensuite être synchronisés vers OVH.</p>
            </div>
          </div>

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
                <span>Ajoutez des contacts via un fichier CSV ou Excel (.xlsx).</span>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImport} accept=".csv, .xlsx, .xls" style={{ display: "none" }} />
              <Button color="secondary" onClick={() => fileInputRef.current?.click()} disabled={importMutation.isLoading}>
                <FileUp size={18} className={css({ marginRight: "0.5rem" })} />
                Importer
              </Button>
            </div>

            <div className={actionItemStyle}>
              <div className={actionInfoStyle}>
                <strong>Exporter la base</strong>
                <span>Téléchargez l'intégralité de vos contacts locaux au format CSV.</span>
              </div>
              <Button color="secondary" onClick={exportContacts}>
                <FileDown size={18} className={css({ marginRight: "0.5rem" })} />
                Exporter
              </Button>
            </div>
          </div>

          {/* Import Feedback */}
          {importMutation.isLoading && (
            <div className={css({ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" })}>
              <Spinner size={20} color="amcoeurRose" inline />
              <span className={css({ fontSize: "sm", color: "amcoeurRose" })}>Importation en cours...</span>
            </div>
          )}
          {importMutation.isSuccess && (
            <div className={css({ color: "green.400", marginTop: "1rem", fontSize: "sm", fontWeight: "bold" })}>
              Import réussi : {importMutation.data.summary.imported} ajoutés, {importMutation.data.summary.updated} mis à jour.
            </div>
          )}

          {/* Export to OVH Sub-section */}
          <div className={subSectionStyle}>
            <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "flex-start" })}>
              <div>
                <h3 className={subSectionTitleStyle}>Exportation vers OVH</h3>
                <p className={cardDescStyle}>Préparez et lancez le transfert des nouveaux contacts vers la mailing list OVH.</p>
              </div>
              {activeJobId && (jobStatus?.status === "completed" || jobStatus?.status === "failed") && (
                <button 
                  onClick={handleCloseSyncStatus}
                  className={css({ color: "rgba(255,255,255,0.2)", "&:hover": { color: "#ef4444" }, cursor: "pointer", transition: "color 0.2s" })}
                  title="Effacer le statut"
                >
                  <Trash2 size={16} />
                </button>
              )}

            </div>
            
            {!activeJobId ? (
              <>
                {!showSyncPreview ? (
                  <Button color="success" onClick={handlePrepareSync} disabled={syncMutation.isLoading || importMutation.isLoading} bold className={css({ width: "100%", marginTop: "1rem" })}>
                    <UploadCloud size={18} className={css({ marginRight: "0.5rem" })} />
                    1. Préparer l'export vers OVH
                  </Button>
                ) : (
                  <div className={syncPreviewBoxStyle}>
                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" })}>
                      <div className={previewRowStyle}>
                        <span>Nouveaux contacts à ajouter :</span>
                        <span className={css({ color: "white", fontWeight: "bold" })}>{syncMutation.data?.summary.toAddCount}</span>
                      </div>
                      <div className={previewRowStyle}>
                        <span className={css({ color: "red.300" })}>Abonnés à retirer (désinscrits) :</span>
                        <span className={css({ fontWeight: "bold" })}>{syncMutation.data?.summary.toRemoveCount}</span>
                      </div>
                      <div className={previewRowStyle}>
                        <span>Déjà à jour sur OVH :</span>
                        <span>{syncMutation.data?.summary.already_in_ovh}</span>
                      </div>
                    </div>
                    <div className={css({ display: "flex", gap: "1rem" })}>
                      <Button color="success" onClick={() => setIsSyncModalOpen(true)} disabled={syncMutation.isLoading} className={css({ flex: 1 })}>
                        <ArrowRight size={18} className={css({ marginRight: "0.5rem" })} />
                        2. Lancer l'export
                      </Button>
                      <Button color="secondary" onClick={handleCancelSync} disabled={syncMutation.isLoading}>
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Progress view inline */
              <div className={css({ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "1.5rem", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" })}>
                <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
                  <span className={css({ fontSize: "sm", fontWeight: "bold", color: jobStatus?.status === "completed" ? "green.400" : "amcoeurPale" })}>
                    {jobStatus?.status === "processing" ? "Exportation en cours..." : 
                     jobStatus?.status === "completed" ? "Exportation terminée !" : 
                     jobStatus?.status === "failed" ? "Échec de l'export" : "Initialisation..."}
                  </span>
                  <span className={css({ fontSize: "xs", color: "rgba(255,255,255,0.4)" })}>
                    {jobStatus?.processed || 0} / {jobStatus?.total || 0}
                  </span>
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
            )}
            
            {syncMutation.isLoading && !activeJobId && (
              <div className={css({ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" })}>
                <Spinner size={20} color="#e11d48" inline />
                <span className={css({ fontSize: "sm", color: "amcoeurRose" })}>Traitement en cours...</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Right Card: OVH Mailing List */}
        <div className={cardStyle}>
          <div className={cardHeaderStyle}>
            <div className={iconWrapperStyle}><UploadCloud size={24} color="#e11d48" /></div>
            <div>
              <h2 className={cardTitleStyle}>Liste de Diffusion OVH</h2>
              <p className={cardDescStyle}>Gérez l'envoi de vos campagnes et l'état de votre liste chez OVH Cloud.</p>
            </div>
          </div>

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
                <span>Mettre à jour les statistiques depuis les serveurs d'OVH.</span>
              </div>
              <Button color="secondary" onClick={handleRefresh} disabled={refreshMutation.isLoading}>
                <RefreshCw size={18} className={refreshMutation.isLoading ? css({ animation: "spin 1s linear infinite" }) : undefined} />
              </Button>
            </div>

            <div className={actionItemStyle}>
              <div className={actionInfoStyle}>
                <strong>Exporter la liste OVH</strong>
                <span>Téléchargez la liste actuelle des abonnés inscrits sur OVH.</span>
              </div>
              <Button color="secondary" onClick={exportOVHList}>
                <FileDown size={18} />
              </Button>
            </div>

            <div className={actionItemStyle}>
              <div className={actionInfoStyle}>
                <strong>Exporter les désinscrits</strong>
                <span>Téléchargez la liste des personnes s'étant désabonnées.</span>
              </div>
              <Button color="info" onClick={exportUnsubscribes}>
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

            {searchQuery && (
              <div className={resultsWrapperStyle}>
                <div className={resultsHeaderStyle}>{filteredEmails.length} résultat(s) sur OVH</div>
                <div className={resultsListStyle}>
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email: string) => (
                      <div key={email} className={resultItemStyle}>
                        <span className={css({ flex: 1, overflow: "hidden", textOverflow: "ellipsis", fontSize: "sm" })}>{email}</span>
                        <button onClick={() => setEmailToRemove(email)} className={removeButtonStyle} title="Supprimer d'OVH">
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
        </div>

      </div>

      {/* Modals */}
      <Modal
        isVisible={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        title="Confirmation d'exportation"
        onConfirm={handleCommitSync}
        confirmText="Lancer l'export"
        isLoading={syncMutation.isLoading}
        variant="success"
      >
        <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
          <p>Voulez-vous vraiment exporter ces <strong>{syncMutation.data?.summary?.toAddCount || 0}</strong> nouveaux contacts vers la liste OVH ?</p>
          <p className={css({ fontSize: "xs", fontStyle: "italic", color: "rgba(255,255,255,0.5)" })}>Cette action ajoutera les emails à votre mailing list active chez OVH Cloud.</p>
        </div>
      </Modal>

      <Modal
        isVisible={!!emailToRemove}
        onClose={() => setEmailToRemove(null)}
        title="Supprimer un abonné"
        onConfirm={handleRemove}
        confirmText="Supprimer"
        isLoading={removeMutation.isLoading}
        variant="danger"
      >
        <p>Voulez-vous vraiment supprimer <strong>{emailToRemove}</strong> de la liste de diffusion OVH ?</p>
        <p className={css({ marginTop: "0.5rem", fontSize: "xs", fontStyle: "italic" })}>L'abonné sera également marqué comme désinscrit dans votre base locale.</p>
      </Modal>
    </div>
  );
}

// --- STYLES ---

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
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "1.5rem",
  borderRadius: "16px",
  textAlign: "left",
});

const statLabelStyle = css({
  color: "amcoeurPale",
  fontSize: "xs",
  marginBottom: "0.25rem",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const statValueStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
});

const mainGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  xl: {
    gridTemplateColumns: "1fr 1fr",
  }
});

const cardStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "2rem",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const cardHeaderStyle = css({
  display: "flex",
  gap: "1rem",
  alignItems: "flex-start",
});

const iconWrapperStyle = css({
  backgroundColor: "rgba(225, 29, 72, 0.1)",
  padding: "0.75rem",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const cardTitleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
  marginBottom: "0.25rem",
});

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

const syncPreviewBoxStyle = css({
  backgroundColor: "rgba(225, 29, 72, 0.05)",
  padding: "1.5rem",
  borderRadius: "16px",
  border: "1px dashed",
  borderColor: "amcoeurRose",
  marginTop: "1.5rem",
});

const previewRowStyle = css({
  display: "flex", 
  justifyContent: "space-between",
  fontSize: "sm",
  color: "amcoeurPale",
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

export default EmailingDashboard;
