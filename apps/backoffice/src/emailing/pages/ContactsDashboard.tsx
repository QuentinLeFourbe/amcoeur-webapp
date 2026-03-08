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
          <Button color="primary" onClick={() => fileInputRef.current?.click()}>
            Importer (CSV/Excel)
          </Button>
        </div>
      </div>

      {importMutation.isLoading && <Spinner size={24} color="amcoeurRose" />}
      
      {importMutation.isSuccess && (
         <div className={css({ color: "green.400", fontSize: "sm", marginBottom: "1rem" })}>
           Importation réussie : {importMutation.data.summary.imported} nouveaux, {importMutation.data.summary.updated} mis à jour.
         </div>
      )}

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
