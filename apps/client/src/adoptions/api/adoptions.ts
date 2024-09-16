import { AdoptionClientServerResponsePublicData } from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = () =>
  axios.get<AdoptionClientServerResponsePublicData>("/api/adoptions/public");
