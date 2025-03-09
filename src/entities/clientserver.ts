export interface ServerResponse<R> {
  success: true | false;
  message?: string;
  data: R;
  notFound: string[];
}