import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { TicketRequest, TicketResponse } from '../interfaces';

@Injectable()
export class AlfrescoAuthService {
  constructor(private http: HttpService) {}

  geraTicket(): Observable<TicketResponse> {
    return this.http
      .post<TicketResponse>(
        `${process.env.ALFRESCO_AUTH_URL}/tickets`,
        this.getRequestBody(),
      )
      .pipe(map((response: AxiosResponse<TicketResponse>) => response.data));
  }

  private getRequestBody(): TicketRequest {
    return {
      userId: process.env.ALFRESCO_AUTH_USERNAME,
      password: process.env.ALFRESCO_AUTH_PASSWORD,
    };
  }
}
