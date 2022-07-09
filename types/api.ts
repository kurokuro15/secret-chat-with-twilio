export interface ApiError {
  status: number;
  message: string;
  [key: string]: any;
}
