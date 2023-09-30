import { ContactData } from "../types/email";
import axios from "axios";

export const sendContactEmail = async (contactData: ContactData) => {
  console.log("contactdata: ", contactData);
  return axios({
    method: "post",
    url: "/api/email/contact",
    data: contactData,
  });
};
