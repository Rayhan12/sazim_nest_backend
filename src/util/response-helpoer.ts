export function buildResponse<T = any>(
  statusCode: number,
  message: string,
  data?: T
) {
  return {
    statusCode,
    message,
    data: data ?? null,
  };
}