export class ServerResponseViewModel<T> {
  errorCode: string;
  errorMessage: string;
  detailErrorList: Array<any> = [];
  validationMessages: Array<any> = [];
  data: T = null;
}
