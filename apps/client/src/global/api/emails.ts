import { ContactFormData } from "@amcoeur/types";
import axios from "axios";

export const sendContactEmail = async (contactData: ContactFormData) => {
  return axios({
    method: "post",
    url: "/api/email/contact",
    data: contactData,
  });
};
