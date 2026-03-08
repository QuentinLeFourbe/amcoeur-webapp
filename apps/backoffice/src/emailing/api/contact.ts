import { EmailCampaignDto } from "@amcoeur/types";
import axios from "axios";

// --- Module Contacts (Base locale) ---

export const getContacts = async (page = 1, limit = 20) => {
  const response = await axios.get(`/api/contacts`, {
    params: { page, limit },
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

export const removeSubscriber = async (email: string) => {
  const response = await axios.delete(`/api/emailing/subscriber/${email}`, {
    withCredentials: true,
  });
  return response.data;
};

export const exportUnsubscribes = async () => {
  window.open(`/api/emailing/export-unsubscribes`, "_blank");
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
          images: block.images.map(({ file: _file, ...rest }) => rest) // On enlève juste le fichier binaire
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
