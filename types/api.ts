export interface ApiError {
  status: number;
  message: string;
  [key: string]: any;
}

export interface Credentials {
  email: string;
  password: string;
}
