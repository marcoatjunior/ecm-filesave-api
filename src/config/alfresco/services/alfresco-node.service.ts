import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Node } from '../interfaces';

@Injectable()
export class AlfrescoNodeService {
  constructor(private http: HttpService) {}

  consulta(id: string): Observable<Node> {
    const a = this.http
      .get(`${process.env.ALFRESCO_SERVICES_URL}/nodes/${id}`);
      a.subscribe(() => {}, (err) => console.log(err))
      
      return a.pipe(map((response: AxiosResponse) => response.data));
  }
}
