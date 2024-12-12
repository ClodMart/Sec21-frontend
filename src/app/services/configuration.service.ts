import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { apiConfigFilePath } from "../applicationFileParameters";

export interface IApiConfig{
    API_URL?:string,
    SIGNALAR_URL?: string
}

export type ResponseDataType = 'json'|'blob'|'text'|'arraybuffer'| undefined

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private httpClient: HttpClient) { 
  }

  public GetApiConfig(): Observable<IApiConfig>{
    return this.httpClient.get<IApiConfig>(apiConfigFilePath);
  }
}