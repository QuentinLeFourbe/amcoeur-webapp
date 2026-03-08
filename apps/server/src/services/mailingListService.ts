import Ovh from "@ovhcloud/node-ovh";
import { getCache, invalidateCache, setCache } from "./redisService.js";
import { logger } from "../utils/logger.js";

const ovhClient = Ovh({
  endpoint: "ovh-eu",
  appKey: process.env.OVH_APP_KEY ?? "",
  appSecret: process.env.OVH_APP_SECRET ?? "",
  consumerKey: process.env.OVH_CONSUMER_KEY ?? "",
});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * Helper pour transformer les requêtes OVH en Promesses
 */
const ovhRequest = (method: HttpMethod, path: string, params?: object): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    ovhClient.request(method, path, params, (err: unknown, data: unknown) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getCacheKey = (domain: string, mailingList: string) => `ml_subscribers_${domain}_${mailingList}`;

export async function removeFromMailingList(
  domain: string,
  mailingList: string,
  email: string,
): Promise<void> {
  try {
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber/${email}`;
    await ovhRequest("DELETE", path);
    logger.info(`Email ${email} removed successfully from ${mailingList}`);
    
    // Invalider le cache car la liste a changé
    await invalidateCache(getCacheKey(domain, mailingList));
  } catch (error) {
    logger.error(`Erreur suppression email OVH (${email})`, { error });
  }
}

export async function getMailingListSubscribers(
  domain: string,
  mailingList: string,
): Promise<string[]> {
  const cacheKey = getCacheKey(domain, mailingList);
  
  try {
    // 1. Tenter de récupérer depuis le cache Redis
    const cachedSubscribers = await getCache<string[]>(cacheKey);
    if (cachedSubscribers) {
      logger.info(`Récupération des abonnés ${mailingList} depuis le cache Redis`);
      return cachedSubscribers;
    }

    // 2. Si pas en cache, appeler OVH
    logger.info(`Appel API OVH pour récupérer les abonnés ${mailingList}`);
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber`;
    const subscribers = (await ovhRequest("GET", path)) as string[];

    // 3. Stocker dans Redis pour 1 heure (3600s)
    await setCache(cacheKey, subscribers, 3600);

    return subscribers;
  } catch (error) {
    logger.error(`Erreur récupération abonnés OVH (${mailingList})`, { error });
    return [];
  }
}

export async function addSubscriberToMailingList(
  domain: string,
  mailingList: string,
  email: string,
): Promise<void> {
  try {
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber`;
    await ovhRequest("POST", path, { email });
    logger.info(`Email ${email} added successfully to ${mailingList}`);

    // Invalider le cache car la liste a changé
    await invalidateCache(getCacheKey(domain, mailingList));
  } catch (error) {
    const err = error as { code?: number };
    if (err.code !== 409) { // 409 = Déjà présent
      logger.error(`Erreur ajout email OVH (${email})`, { error });
    }
  }
}
