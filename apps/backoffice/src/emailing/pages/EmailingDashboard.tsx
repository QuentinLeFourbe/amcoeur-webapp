import type { Contact } from "@amcoeur/types";
import { useRef, useState } from "react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Pagination from "../../global/components/molecules/Pagination/Pagination";
import { exportUnsubscribes } from "../api/contact";
import { useGetContacts, useGetMailingListStats, useImportContacts, useSyncWithOVH } from "../hooks/useContacts";

function EmailingDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: contactsData, isLoading: isLoadingContacts } = useGetContacts(currentPage, 20);
  const { data: statsData, isLoading: isLoadingStats } = useGetMailingListStats();
  
  const importMutation = useImportContacts();
  const syncMutation = useSyncWithOVH();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importMutation.mutate(file);
    }
  };

  const handleSync = () => {
    if (window.confirm("Voulez-vous synchroniser la base de données avec OVH ? Les désinscrits seront ignorés.")) {
      syncMutation.mutate();
    }
  };

  const stats = statsData || { ovh: { count: 0 }, db: { contactsCount: 0, unsubscribesCount: 0 } };

  return (
    <div className={container}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold", color: "rose.600" })}>
        Gestion de l'Emailing
      </h1>

      {/* Stats Cards */}
      <div className={css({ display: "flex", gap: "2rem", width: "100%", justifyContent: "center" })}>
        <div className={statCard}>
          <div className={statLabel}>Abonnés OVH</div>
          <div className={statValue}>{isLoadingStats ? "..." : stats.ovh.count}</div>
        </div>
        <div className={statCard}>
          <div className={statLabel}>Contacts en Base</div>
          <div className={statValue}>{isLoadingStats ? "..." : stats.db.contactsCount}</div>
        </div>
        <div className={statCard}>
          <div className={statLabel}>Désinscriptions</div>
          <div className={statValue}>{isLoadingStats ? "..." : stats.db.unsubscribesCount}</div>
        </div>
      </div>

      {/* Actions */}
      <div className={css({ display: "flex", gap: "1rem" })}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".csv, .xlsx, .xls"
          style={{ display: "none" }}
        />
        <Button color="primary" onClick={() => fileInputRef.current?.click()}>
          Importer des contacts (CSV/Excel)
        </Button>
        <Button color="info" onClick={exportUnsubscribes}>
          Exporter les désinscriptions
        </Button>
        <Button color="secondary" onClick={handleSync}>
          Synchroniser avec OVH
        </Button>
      </div>

      {(importMutation.isLoading || syncMutation.isLoading) && (
        <div className={css({ marginTop: "1rem" })}>
          <Spinner size={24} color="text.accent" />
          <p className={css({ fontSize: "sm", color: "text.muted", textAlign: "center" })}>Opération en cours...</p>
        </div>
      )}

      {importMutation.isSuccess && (
         <div className={css({ color: "green.500" })}>
           Importation réussie : {importMutation.data.summary.imported} nouveaux, {importMutation.data.summary.updated} mis à jour.
         </div>
      )}

      {syncMutation.isSuccess && (
         <div className={css({ color: "green.500" })}>
           Synchronisation réussie : {syncMutation.data.summary.added} nouveaux abonnés sur OVH.
         </div>
      )}

      {/* Contacts Table */}
      <div className={css({ width: "100%", overflowX: "auto" })}>
        {isLoadingContacts ? (
          <p>Chargement des contacts...</p>
        ) : (
          <>
            <table className={tableStyle}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Ville</th>
                  <th>Date d'ajout</th>
                </tr>
              </thead>
              <tbody>
                {contactsData?.data.map((contact: Contact) => (
                  <tr key={contact.email}>
                    <td>{contact.lastName}</td>
                    <td>{contact.firstName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.city}</td>
                    <td>{new Date(contact.createdAt).toLocaleDateString("fr-FR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              setPage={setCurrentPage}
              totalPages={contactsData?.pagination.pages || 1}
            />
          </>
        )}
      </div>
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  padding: "2rem",
});

const statCard = css({
  backgroundColor: "rose.100",
  padding: "1.5rem",
  borderRadius: "lg",
  minWidth: "150px",
  textAlign: "center",
  boxShadow: "sm",
});

const statLabel = css({
  fontSize: "sm",
  color: "rose.800",
  marginBottom: "0.5rem",
});

const statValue = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "rose.950",
});

const tableStyle = css({
  width: "100%",
  borderCollapse: "collapse",
  "& th": {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "rose.600",
    color: "white",
  },
  "& td": {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid",
    borderColor: "rose.100",
  },
  "& tr:hover": {
    backgroundColor: "rose.50",
  },
});

export default EmailingDashboard;
