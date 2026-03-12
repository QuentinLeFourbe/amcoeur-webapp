import type { Contact } from "@amcoeur/types";
import { useRef, useState } from "react";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Table from "../../global/components/atoms/Table/Table";
import Pagination from "../../global/components/molecules/Pagination/Pagination";
import { useGetContacts, useImportContacts } from "../hooks/useContacts";

function ContactsDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: contactsData, isLoading: isLoadingContacts } = useGetContacts(currentPage, 20);
  const importMutation = useImportContacts();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importMutation.mutate(file);
    }
  };

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <h1 className={titleStyle}>Base de Contacts</h1>
        <div className={actionsStyle}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".csv, .xlsx, .xls"
            style={{ display: "none" }}
          />
          <Button 
            color="primary" 
            onClick={() => fileInputRef.current?.click()}
            disabled={importMutation.isLoading}
          >
            {importMutation.isLoading ? "Importation en cours..." : "Importer (CSV/Excel)"}
          </Button>
        </div>
      </div>

      <div className={css({ marginBottom: "1rem", minHeight: "24px" })}>
        {importMutation.isLoading && (
          <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e11d48", fontSize: "sm", fontWeight: "bold" })}>
            <Spinner size={24} color="#e11d48" inline />
            <span>Importation en cours...</span>
          </div>
        )}
        
        {!importMutation.isLoading && importMutation.isSuccess && (
           <div>
             <div className={css({ color: "green.400", fontSize: "sm", fontWeight: "bold" })}>
               Importation terminée : {importMutation.data.summary.imported} nouveaux, {importMutation.data.summary.updated} mis à jour.
             </div>
             {importMutation.data.summary.errors > 0 && (
               <div className={css({ color: "orange.400", fontSize: "xs", marginTop: "0.5rem" })}>
                 {importMutation.data.summary.errors} ligne(s) ignorée(s) :
                 <ul className={css({ maxHeight: "150px", overflowY: "auto", border: "1px solid", borderColor: "white/10", padding: "0.5rem", borderRadius: "sm", marginTop: "0.25rem" })}>
                   {importMutation.data.summary.details.map((detail: { row?: number; email?: string; error: string }, index: number) => (
                     <li key={index}>
                       Ligne {detail.row}: {detail.email ? `${detail.email} - ` : ""}{detail.error}
                     </li>
                   ))}
                 </ul>
                 </div>
                 )}
                 </div>
                 )}

                 {!importMutation.isLoading && importMutation.isError && (
                 <div className={css({ color: "red.400", fontSize: "sm", padding: "1rem", border: "1px solid red", borderRadius: "md" })}>
                 Erreur : {(importMutation.error as { response?: { data?: string } })?.response?.data || "Impossible d'importer le fichier"}
                 </div>
                 )}

      </div>

      {isLoadingContacts ? (
        <Spinner />
      ) : (
        <>
          <div>{contactsData?.pagination.total || 0} résultats</div>
          <Table>
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
          </Table>
          
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            totalPages={contactsData?.pagination.pages || 1}
          />
        </>
      )}
    </div>
  );
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const headerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
});

const actionsStyle = css({
  display: "flex",
  gap: "1rem",
});

export default ContactsDashboard;
