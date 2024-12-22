import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { TicketRequest, TicketResponse } from '../interfaces';

@Injectable()
export class AlfrescoAuthService {
  constructor(private http: HttpService) {}

  getTicket(): Observable<TicketResponse> {
    return this.http
      .post(`${process.env.ALFRESCO_AUTH_URL}/tickets`, this.getBody())
      .pipe(map((response: AxiosResponse) => response.data));
  }

  private getBody(): TicketRequest {
    return {
      userId: process.env.ALFRESCO_AUTH_USERNAME,
      password: process.env.ALFRESCO_AUTH_PASSWORD,
    };
  }
}
