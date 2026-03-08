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

// --- Module Emailing (OVH / Mailing List) ---

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

export const syncWithOVH = async () => {
  const response = await axios.post(`/api/emailing/sync`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const exportUnsubscribes = async () => {
  window.open(`/api/emailing/export-unsubscribes`, "_blank");
};

export const removeSubscriber = async (email: string) => {
  const response = await axios.delete(`/api/emailing/subscriber/${email}`, {
    withCredentials: true,
  });
  return response.data;
};
