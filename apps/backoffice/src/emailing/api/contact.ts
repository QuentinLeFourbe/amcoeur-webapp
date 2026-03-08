import axios from "axios";

export const getContacts = async (page = 1, limit = 20) => {
  const response = await axios.get(`/api/contacts`, {
    params: { page, limit },
    withCredentials: true,
  });
  return response.data;
};

export const getMailingListStats = async () => {
  const response = await axios.get(`/api/contacts/stats`, {
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

export const syncWithOVH = async () => {
  const response = await axios.post(`/api/contacts/sync`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const exportUnsubscribes = async () => {
  window.open(`/api/contacts/export-unsubscribes`, "_blank");
};
