import { useMemo,useState } from "react";

import { css } from "../../../styled-system/css";
import Modal from "../../global/components/molecules/Modal/Modal";
import { exportContacts, exportOVHList, exportUnsubscribes } from "../api/contact";
import { LocalContactsCard } from "../components/LocalContactsCard";
import { OvhMailingListCard } from "../components/OvhMailingListCard";
// Sub-components
import { StatsGrid } from "../components/StatsGrid";
import { 
  useGetMailingListStats, 
  useImportContacts, 
  useRefreshMailingList, 
  useRemoveSubscriber, 
  useSyncStatus,
  useSyncWithOVH 
} from "../hooks/useContacts";
import { MutationState } from "../types";

const SYNC_JOB_KEY = "amcoeur_active_sync_job";

function EmailingDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSyncPreview, setShowSyncPreview] = useState(false);
  const [emailToRemove, setEmailToRemove] = useState<string | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  // Job Tracking
  const [activeJobId, setActiveJobId] = useState<string | null>(() => localStorage.getItem(SYNC_JOB_KEY));
  const { data: jobStatus } = useSyncStatus(activeJobId);

  // Queries & Mutations
  const { data: statsData, isLoading: isLoadingStats } = useGetMailingListStats();
  const refreshMutation = useRefreshMailingList() as unknown as MutationState;
  const syncMutation = useSyncWithOVH() as unknown as MutationState;
  const removeMutation = useRemoveSubscriber() as unknown as MutationState;
  const importMutation = useImportContacts() as unknown as MutationState;

  // Handlers
  const handleRefresh = () => (refreshMutation as unknown as { mutate: () => void }).mutate();
  
  const handleImport = (file: File) => {
    (importMutation as unknown as { mutate: (f: File) => void }).mutate(file);
  };

  const handlePrepareSync = () => {
    (syncMutation as unknown as { mutate: (b: boolean, o: object) => void }).mutate(true, {
      onSuccess: () => setShowSyncPreview(true)
    });
  };

  const handleCommitSync = () => {
    (syncMutation as unknown as { mutate: (b: boolean, o: object) => void }).mutate(false, {
      onSuccess: (data: { jobId?: string }) => {
        if (data.jobId) {
          setActiveJobId(data.jobId);
          localStorage.setItem(SYNC_JOB_KEY, data.jobId);
          setIsSyncModalOpen(false);
        }
      }
    });
  };

  const handleCancelSync = () => {
    setShowSyncPreview(false);
    (syncMutation as unknown as { reset: () => void }).reset();
  };

  const handleCloseSyncStatus = () => {
    setActiveJobId(null);
    localStorage.removeItem(SYNC_JOB_KEY);
    setShowSyncPreview(false);
    (syncMutation as unknown as { reset: () => void }).reset();
  };

  const handleRemove = () => {
    if (emailToRemove) {
      (removeMutation as unknown as { mutate: (e: string, o: object) => void }).mutate(emailToRemove, {
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

      <StatsGrid stats={stats} isLoading={isLoadingStats} />

      <div className={mainGridStyle}>
        <LocalContactsCard 
          importMutation={importMutation}
          syncMutation={syncMutation}
          onImport={handleImport}
          onExport={exportContacts}
          onPrepareSync={handlePrepareSync}
          onLaunchSync={() => setIsSyncModalOpen(true)}
          onCancelSync={handleCancelSync}
          onCloseSyncStatus={handleCloseSyncStatus}
          showSyncPreview={showSyncPreview}
          activeJobId={activeJobId}
          jobStatus={jobStatus || null}
        />

        <OvhMailingListCard 
          refreshMutation={refreshMutation}
          onRefresh={handleRefresh}
          onExportOVH={exportOVHList}
          onExportUnsubscribes={exportUnsubscribes}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredEmails={filteredEmails}
          onRemoveSubscriber={setEmailToRemove}
        />
      </div>

      {/* Modals */}
      <Modal
        isVisible={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        title="Confirmation d'exportation"
        onConfirm={handleCommitSync}
        confirmText={syncMutation.isLoading ? "Export en cours..." : "Lancer l'export"}
        isLoading={syncMutation.isLoading}
        variant="success"
      >
        <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
          <p>Voulez-vous vraiment exporter ces <strong>{syncMutation.data?.summary?.toAddCount || 0}</strong> nouveaux contacts vers la liste OVH ?</p>
          {(syncMutation.data?.summary?.toRemoveCount || 0) > 0 && (
            <p className={css({ color: "red.400", fontWeight: "bold" })}>
              Attention : {syncMutation.data?.summary.toRemoveCount} abonnés désinscrits seront également retirés d'OVH.
            </p>
          )}
          <p className={css({ fontSize: "xs", fontStyle: "italic", color: "rgba(255,255,255,0.5)" })}>Cette action modifiera votre mailing list active chez OVH Cloud.</p>
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

const mainGridStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  xl: {
    gridTemplateColumns: "1fr 1fr",
  }
});

export default EmailingDashboard;
