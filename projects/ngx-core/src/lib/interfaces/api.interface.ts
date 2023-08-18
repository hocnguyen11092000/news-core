export interface ICoreApiObject {
  url: string;
  method: string;
  external?: boolean;
  [key: string]: any;
}

export interface ICoreApiBaseResponse {
  [key: string]: any;
}
