import { ContactFormData, UnsubscribeFormData } from "@amcoeur/types";
import axios from "axios";

export const sendContactEmail = async (contactData: ContactFormData) => {
  return axios({
    method: "post",
    url: "/api/email/contact",
    data: contactData,
  });
};

export const unsubscribeEmail = async (
  unsubscribeData: UnsubscribeFormData,
) => {
  return axios({
    method: "delete",
    url: "/api/email/unsubscribe",
    data: unsubscribeData,
  });
};
