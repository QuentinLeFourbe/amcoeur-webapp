import { Contact } from "@amcoeur/types";
import { ArrowLeft, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { css } from "../../../styled-system/css";
import Button from "../../global/components/atoms/Button/Button";
import Input from "../../global/components/atoms/Input/Input";
import Label from "../../global/components/atoms/Label/Label";
import Spinner from "../../global/components/atoms/Spinner/Spinner";
import Table from "../../global/components/atoms/Table/Table";
import Modal from "../../global/components/molecules/Modal/Modal";
import Pagination from "../../global/components/molecules/Pagination/Pagination";
import { useCreateContact, useDeleteContact, useGetContacts, useImportContacts } from "../hooks/useContacts";

function ContactsDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounceValue(search, 500);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  // Add form state
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
  });

  const { data: contactsData, isLoading: isLoadingContacts } = useGetContacts(currentPage, 20, debouncedSearch);
  const importMutation = useImportContacts();
  const createMutation = useCreateContact();
  const deleteMutation = useDeleteContact();

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importMutation.mutate(file);
    }
  };

  const handleCreate = () => {
    createMutation.mutate(newContact, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setNewContact({ email: "", firstName: "", lastName: "", phone: "", city: "" });
      }
    });
  };

  const handleDelete = () => {
    if (contactToDelete?._id) {
      deleteMutation.mutate(contactToDelete._id, {
        onSuccess: () => setContactToDelete(null)
      });
    }
  };

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <div className={css({ display: "flex", alignItems: "center", gap: "1rem" })}>
          <Button color="secondary" to="/emailing" className={css({ padding: "0.5rem!" })}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className={titleStyle}>Base de Contacts</h1>
        </div>
        <div className={actionsStyle}>
          <div className={css({ position: "relative", width: "300px" })}>
            <Input
              placeholder="Rechercher (nom, email...)"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <div className={searchIconStyle}><Search size={18} /></div>
          </div>

          <Button color="success" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} className={css({ marginRight: "0.5rem" })} />
            Ajouter un contact
          </Button>

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
        {/* ... Feedback Import ... */}
        {importMutation.isLoading && (
          <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", color: "#e11d48", fontSize: "sm", fontWeight: "bold" })}>
            <Spinner size={24} color="#e11d48" inline />
            <span>Importation en cours...</span>
          </div>
        )}
        {/* Rest of feedback (Success/Error) matches what we had before */}
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
          <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
            <div>{contactsData?.pagination.total || 0} contacts trouvés</div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Ville</th>
                <th>Date d'ajout</th>
                <th style={{ width: "50px" }}></th>
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
                  <td>
                    <button 
                      onClick={() => setContactToDelete(contact)} 
                      className={removeButtonStyle}
                      title="Supprimer le contact"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className={css({ display: "flex", justifyContent: "center", marginTop: "2rem" })}>
            <Pagination
              currentPage={currentPage}
              setPage={setCurrentPage}
              totalPages={contactsData?.pagination.pages || 1}
            />
          </div>
        </>
      )}

      {/* Modal Ajout */}
      <Modal
        isVisible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nouveau Contact"
        onConfirm={handleCreate}
        confirmText="Créer"
        isLoading={createMutation.isLoading}
      >
        <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
          {createMutation.isError && (
            <div className={css({ color: "red.400", fontSize: "xs" })}>
              {(createMutation.error as { response?: { data?: string } })?.response?.data || "Une erreur est survenue"}
            </div>
          )}
          <div>
            <Label>Email *</Label>
            <Input 
              value={newContact.email} 
              onChange={(e) => setNewContact({...newContact, email: e.currentTarget.value})}
              placeholder="exemple@email.com"
            />
          </div>
          <div className={css({ display: "flex", gap: "1rem" })}>
            <div className={css({ flex: 1 })}>
              <Label>Prénom</Label>
              <Input 
                value={newContact.firstName} 
                onChange={(e) => setNewContact({...newContact, firstName: e.currentTarget.value})}
              />
            </div>
            <div className={css({ flex: 1 })}>
              <Label>Nom</Label>
              <Input 
                value={newContact.lastName} 
                onChange={(e) => setNewContact({...newContact, lastName: e.currentTarget.value})}
              />
            </div>
          </div>
          <div className={css({ display: "flex", gap: "1rem" })}>
            <div className={css({ flex: 1 })}>
              <Label>Téléphone</Label>
              <Input 
                value={newContact.phone} 
                onChange={(e) => setNewContact({...newContact, phone: e.currentTarget.value})}
              />
            </div>
            <div className={css({ flex: 1 })}>
              <Label>Ville</Label>
              <Input 
                value={newContact.city} 
                onChange={(e) => setNewContact({...newContact, city: e.currentTarget.value})}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Suppression */}
      <Modal
        isVisible={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        title="Supprimer le contact"
        onConfirm={handleDelete}
        confirmText="Supprimer"
        variant="danger"
        isLoading={deleteMutation.isLoading}
      >
        <p>Voulez-vous vraiment supprimer le contact <strong>{contactToDelete?.email}</strong> ?</p>
        <p className={css({ marginTop: "0.5rem", fontSize: "xs", color: "rgba(255,255,255,0.4)" })}>
          Cette action est définitive pour la base locale.
        </p>
      </Modal>
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

const searchIconStyle = css({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "rgba(255,255,255,0.2)",
  pointerEvents: "none",
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

export default ContactsDashboard;
