import { AdoptionClient } from "@amcoeur/types";
import axios from "axios";

export const getAdoptions = () => axios.get<AdoptionClient[]>("/api/adoptions");
