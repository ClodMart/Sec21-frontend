import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { ConfigsService, IApiConfig, ResponseDataType } from "./configuration.service";

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {

    private configs: IApiConfig = {};
  
    constructor(private httpClient: HttpClient, private configsService: ConfigsService) { 
      this.configsService.GetApiConfig().pipe(take(1)).subscribe((confgs=>{
        this.configs = confgs;
      }));
    }
  
    public getObs<T>(url: string, params?: HttpParams, headers?: HttpHeaders, withCredentials: boolean = false, responseType?: ResponseDataType): Observable<T> {
      const responseTypeString = this.getResponsetype(responseType);
      return this.httpClient
        .get<T>(`${this.configs.API_URL}${url}`, { headers, params, withCredentials, responseType: responseTypeString });
    }
  
    public postObs<T>(url: string, body?: unknown, headers?: HttpHeaders, withCredentials: boolean = false, params?: HttpParams, responseType?: ResponseDataType): Observable<T> {
      const responseTypeString = this.getResponsetype(responseType);
      headers = new HttpHeaders;  
      headers = headers?.append("Content-Type", "application/json");
      headers = headers?.append("Accept", "application/json");
  
      return this.httpClient
        .post<T>(`${this.configs.API_URL}${url}`, body, { headers, params, withCredentials, responseType: responseTypeString });
    }
  
    public putObs<T>(url: string, body?: unknown, headers?: HttpHeaders, withCredentials: boolean = false, params?: HttpParams, responseType?: ResponseDataType): Observable<T> {
      const responseTypeString = this.getResponsetype(responseType);
      return this.httpClient
        .put<T>(`${this.configs.API_URL}${url}`, body, { headers, params, withCredentials, responseType: responseTypeString });
         }
  
    public deleteObs<T>(url: string, params?: HttpParams, headers?: HttpHeaders, withCredentials: boolean = false, responseType?: ResponseDataType): Observable<T> {
      const responseTypeString = this.getResponsetype(responseType);
      return this.httpClient
        .delete<T>(`${this.configs.API_URL}${url}`, { headers, params, withCredentials, responseType: responseTypeString });
    }
  
    private getResponsetype(responseType: ResponseDataType | undefined): any {
        if(responseType){
            switch (responseType) {
                case 'json':
                  return 'json';
                case 'blob':
                  return 'blob';
                case 'text':
                  return 'text';
                case 'arraybuffer':
                  return 'arraybuffer';
                default:
                  return 'json';
              }
            }
        else{
            return null;
        }
        }
  }