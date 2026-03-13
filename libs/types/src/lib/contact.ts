export interface Contact {
  _id?: string;
  lastName?: string;
  firstName?: string;
  phone?: string;
  email: string;
  zipCode?: string;
  city?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactImportData {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email: string;
  code_postal?: string;
  ville?: string;
  adresse?: string;
}
