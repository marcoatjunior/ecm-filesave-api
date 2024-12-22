import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Node } from '../interfaces';

@Injectable()
export class AlfrescoNodeService {
  constructor(private http: HttpService) {}

  consulta(id: string): Observable<Node> {
    return this.http
      .get<Node>(`${process.env.ALFRESCO_SERVICES_URL}/nodes/${id}`)
      .pipe(map((response: AxiosResponse<Node>) => response.data));
  }
}
