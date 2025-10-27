export async function initMocks() {
  if (process.env.NODE_ENV !== "development") return;
  if (process.env.NEXT_PUBLIC_MOCK_DISABLED === "true") return;
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    await worker.start();
  }
}
