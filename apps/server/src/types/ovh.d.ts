declare module "@ovhcloud/node-ovh" {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
  type Endpoint =
    | "ovh-eu"
    | "ovh-us"
    | "ovh-ca"
    | "soyoustart-eu"
    | "soyoustart-ca"
    | "kimsufi-eu"
    | "kimsufi-ca";

  interface OVHConfig {
    endpoint: Endpoint | string;
    appKey: string;
    appSecret: string;
    consumerKey: string;
  }

  interface OVHClient {
    request<T = unknown>(
      method: HttpMethod,
      path: string,
      body?: unknown,
      callback: unknown,
    ): Promise<T>;

    $get<T = unknown>(path: string): Promise<T>;
    $post<T = unknown>(path: string, body?: unknown): Promise<T>;
    $put<T = unknown>(path: string, body?: unknown): Promise<T>;
    $delete<T = unknown>(path: string): Promise<T>;
  }

  function OVH(config: OVHConfig): OVHClient;
  export default OVH;
}
