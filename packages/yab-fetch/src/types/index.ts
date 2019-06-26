export interface RequestOptions extends RequestInit {
  params?: Record<string, string | string[]>;
  onError?: unknown;
}
