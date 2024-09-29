export interface IResponseData {
  code: "success" | "error";
  message: string;
  statusCode: number;
}

export interface IResponse<T> extends IResponseData {
  data?: T;
}
