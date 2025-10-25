import { AdoptionContact } from "@amcoeur/types";
import axios from "axios";

export const sendAdoptionEmail = (data: AdoptionContact) =>
  axios.post("/api/adoptions/contact", data);
