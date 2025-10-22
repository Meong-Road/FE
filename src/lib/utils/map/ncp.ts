export function ncpHeaders() {
  const api_id = process.env.CLIENT_ID;
  const api_key = process.env.CLIENT_SECRET;
  if (!api_id || !api_key) {
    throw new Error("CLIENT_ID & CLIENT_SECRET setting please");
  }
  return {
    "X-NCP-APIGW-API-KEY-ID": api_id,
    "X-NCP-APIGW-API-KEY": api_key,
    Accept: "application/json",
  };
}
