import Ovh from "@ovhcloud/node-ovh";

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

export async function removeFromMailingList(
  domain: string,
  mailingList: string,
  email: string,
): Promise<void> {
  try {
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber/${email}`;
    await ovhRequest("DELETE", path);
    console.log(`Email ${email} removed successfully from ${mailingList}`);
  } catch (error) {
    console.error(`❌ Erreur suppression email: ${error}`);
  }
}

export async function getMailingListSubscribers(
  domain: string,
  mailingList: string,
): Promise<string[]> {
  try {
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber`;
    const subscribers = await ovhRequest("GET", path);
    return subscribers as string[];
  } catch (error) {
    console.error(`❌ Erreur récupération abonnés: ${error}`);
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
    console.log(`Email ${email} added successfully to ${mailingList}`);
  } catch (error) {
    const err = error as { code?: number };
    if (err.code !== 409) { // 409 = Déjà présent
      console.error(`❌ Erreur ajout email ${email}: ${error}`);
    }
  }
}
