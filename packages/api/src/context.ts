export interface TrpcContext {
  requestId: string;
}

export const createTrpcContext = ({ request }: { request: Request }): TrpcContext => {
  const requestIdHeader = request.headers.get("x-request-id");
  const requestId = requestIdHeader?.trim();

  return {
    requestId: requestId && requestId.length > 0 ? requestId : crypto.randomUUID(),
  };
};
