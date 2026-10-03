export function formatApiError(error: any, operation: string): string {
  const status = error?.status ?? 'unknown';

  if (status === 401) {
    return `Session expired or JWT is invalid (HTTP 401).\nPlease login again.`;
  }

  if (status === 403) {
    return `Access denied (HTTP 403).\nYou do not have permission to perform this operation.`;
  }

  const backendMessage =
    error?.error?.message ??
    (typeof error?.error === 'string' ? error.error : null) ??
    error?.message;

  if (backendMessage) {
    return `${operation} failed (HTTP ${status}).\n${backendMessage}`;
  }

  return `${operation} failed (HTTP ${status}).`;
}