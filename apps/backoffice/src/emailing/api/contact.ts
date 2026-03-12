import { Contact, EmailCampaignDto } from "@amcoeur/types";
import axios from "axios";

// --- Module Contacts (Base locale) ---

export const getContacts = async (page = 1, limit = 20, search = "") => {
  const response = await axios.get(`/api/contacts`, {
    params: { page, limit, search },
    withCredentials: true,
  });
  return response.data;
};

export const createContact = async (contactData: Partial<Contact>) => {
  const response = await axios.post(`/api/contacts`, contactData, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await axios.delete(`/api/contacts/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const importContacts = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`/api/contacts/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

// --- Module Emailing (OVH / Mailing List / Campagnes) ---

export const getMailingListStats = async () => {
  const response = await axios.get(`/api/emailing/stats`, {
    withCredentials: true,
  });
  return response.data;
};

export const refreshMailingList = async () => {
  const response = await axios.post(`/api/emailing/refresh`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const syncWithOVH = async (dryRun = false) => {
  const response = await axios.post(`/api/emailing/sync`, {}, {
    params: { dryRun },
    withCredentials: true,
  });
  return response.data;
};

export const getSyncStatus = async (jobId: string) => {
  const response = await axios.get(`/api/emailing/sync/status/${jobId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const removeSubscriber = async (email: string) => {
  const response = await axios.delete(`/api/emailing/subscriber/${email}`, {
    withCredentials: true,
  });
  return response.data;
};

const downloadFile = (data: any, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportUnsubscribes = async () => {
  const response = await axios.get(`/api/emailing/export-unsubscribes`, {
    responseType: "blob",
    withCredentials: true,
  });
  downloadFile(response.data, "desinscriptions.csv");
};

export const exportContacts = async () => {
  const response = await axios.get(`/api/contacts/export`, {
    responseType: "blob",
    withCredentials: true,
  });
  downloadFile(response.data, "contacts_locaux.csv");
};

export const exportOVHList = async () => {
  const response = await axios.get(`/api/emailing/export-ovh`, {
    responseType: "blob",
    withCredentials: true,
  });
  downloadFile(response.data, "liste_ovh.csv");
};

/**
 * Envoie une campagne d'emailing avec ses blocs et ses images
 */
export const sendEmailCampaign = async (campaign: EmailCampaignDto) => {
  const formData = new FormData();
  
  // On sépare les fichiers bruts pour l'upload Multer
  campaign.blocks.forEach((block) => {
    if (block.type === "IMAGE") {
      block.images.forEach((img) => {
        if (img.file) {
          formData.append("files", img.file);
        }
      });
    }
  });

  // On envoie le reste de la campagne en JSON stringifié
  // On nettoie les fichiers du JSON pour ne pas surcharger la requête
  const cleanedCampaign = {
    ...campaign,
    blocks: campaign.blocks.map(block => {
      if (block.type === "IMAGE") {
        return { 
          ...block, 
          images: block.images.map((img) => ({
            url: img.url,
            caption: img.caption,
            maxHeight: img.maxHeight,
            aspectRatio: img.aspectRatio
          }))
        };
      }
      return block;
    })
  };

  formData.append("campaign", JSON.stringify(cleanedCampaign));

  const response = await axios.post(`/api/emailing/send-campaign`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};
