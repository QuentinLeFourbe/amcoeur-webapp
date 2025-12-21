import Ovh from "@ovhcloud/node-ovh";

const ovhClient = Ovh({
  endpoint: "ovh-eu",
  appKey: process.env.OVH_APP_KEY ?? "",
  appSecret: process.env.OVH_APP_SECRET ?? "",
  consumerKey: process.env.OVH_CONSUMER_KEY ?? "",
});

export async function removeFromMailingList(
  domain: string,
  mailingList: string,
  email: string,
): Promise<void> {
  try {
    const path = `/email/domain/${domain}/mailingList/${mailingList}/subscriber/${email}`;

    await ovhClient.request(
      "DELETE",
      path,
      {
        accessRules: [{ method: "DELETE", path: "/*" }],
      },
      function (error: unknown, credential: unknown) {
        console.log(error || credential);
      },
    );
    console.log(`Email removed successfully`);
  } catch (error) {
    console.error(`❌ Erreur: ${error}`);
  }
}
