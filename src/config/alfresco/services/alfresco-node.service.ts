import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Readable } from 'stream';
import { Node } from '../interfaces';

@Injectable()
export class AlfrescoNodeService {
  constructor(private http: HttpService) {}

  consulta(id: string): Observable<Node> {
    return this.http
      .get<Node>(this.montaUrl(id))
      .pipe(map((response: AxiosResponse<Node>) => response.data));
  }

  download(id: string): Promise<Readable> {
    return new Promise<Readable>((resolve) =>
      this.http
        .get<Readable>(`${this.montaUrl(id)}/content`, {
          responseType: 'stream',
        })
        .subscribe({ next: ({ data }) => resolve(data) }),
    );
  }

  private montaUrl(id?: string): string {
    if (!id) {
      return `${process.env.ALFRESCO_SERVICES_URL}/nodes`;
    }
    return `${process.env.ALFRESCO_SERVICES_URL}/nodes/${id}`;
  }
}
