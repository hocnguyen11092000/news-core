import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageHelper } from './storage-helper.service';
import { Observable, map } from 'rxjs';
import { ICoreApiBaseResponse, ICoreApiObject } from '../interfaces';

@Injectable()
export class NgxCoreAPICallService {
  constructor(private readonly http: HttpClient) {}

  /**
   * API from config
   */
  get API_URL() {
    // return this.config.configData ? this.config.configData.APP_API : '';
    return '';
  }

  /**
   * Token key from config
   */
  get TOKEN_KEY() {
    // return this.config.configData ? this.config.configData.APP_TOKEN_KEY : '';
    return '';
  }

  /**
   * Auth token key from config
   */
  get TOKEN_AUTH_KEY() {
    // return this.config.configData ? this.config.configData.APP_TOKEN_AUTH_KEY : '';
    return '';
  }
  /**
   * Set a header to api request
   * @param _customHeader Customer header from outside
   * @param forceToken Force token to set
   * @returns HTTP Header
   */
  setHeader(_customHeader?: any, forceToken?: string) {
    let access_token =
      forceToken && forceToken !== ''
        ? forceToken
        : StorageHelper.get(this.TOKEN_KEY);
    let headers: HttpHeaders = new HttpHeaders();
    if (access_token && access_token !== '') {
      headers = headers.append('Authorization', `Bearer ${access_token}`);
    }
    headers = headers.append(
      'Content-Language',
      StorageHelper.getCurrentLang()
    );
    headers = headers.append('Content-Type', 'application/json');

    if (_customHeader) {
      for (let d in _customHeader) {
        headers = headers.set(d, _customHeader[d]);
      }
    }
    return headers;
  }

  /**
   * Set the initial param value
   * @param customHeader Custom Header
   * @param customParams Custom params
   * @param notReplaceHeader Force not replace header
   * @param url url to call
   * @returns a init to option
   */
  setInit(
    customHeader: any,
    customParams?: any,
    notReplaceHeader: boolean = false,
    url?: string,
    forceToken?: string
  ) {
    const headers = notReplaceHeader
      ? customHeader
      : this.setHeader(customHeader, forceToken);
    let _init = {
      headers: headers,
      withCredentials: undefined,
      reportProgress: undefined,
      responseType: undefined, // 'arraybuffer'|'blob'|'json'|'text',
      observe: undefined,
    };
    if (customParams) {
      _init = { ..._init, ...customParams };
    }
    return _init;
  }

  /**
   * Build the uri
   * @param external IF true, the url will be used directly
   * @param url Url to call
   * @returns Url of api
   */
  buildURI(external: boolean, url: string) {
    if (external) {
      return url;
    }
    return `${this.API_URL}${url}`;
  }

  /**
   * Call api
   * @param object The api object for calling
   * @param body Body to param
   * @param customHeader Custom header
   * @param customParams Custom params
   * @returns Observable data
   */
  callApi(
    object: ICoreApiObject | any,
    body: any,
    customHeader?: any,
    customParams?: any,
    forceToken?: string
  ) {
    try {
      const uri = this.buildURI(!!object.external, object.url);
      const initials = this.setInit(
        customHeader,
        customParams,
        false,
        uri,
        forceToken
      );
      const reqOption = new HttpRequest(object.method, uri, body, initials);

      return this.http.request(reqOption).pipe(
        map((response: any) => {
          if (response && response.status === 200 && response['body']) {
            return response.body as ICoreApiBaseResponse | any;
          } else {
            return response;
          }
        })
      );
    } catch (error) {
      console.log('=== [ERROR CALL API]', error);
      return new Observable(undefined);
    }
  }
}
