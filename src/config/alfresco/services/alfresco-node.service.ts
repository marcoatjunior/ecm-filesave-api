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

  upload(nome: string): Promise<Node> {
    return new Promise<Node>((resolve) =>
      this.http
        .post<Node>(
          `${this.montaUrl(process.env.ALFRESCO_ID_FAMILIA)}/children`,
          { name: nome, nodeType: 'cm:content' },
        )
        .subscribe({ next: ({ data }) => resolve(data) }),
    );
  }

  atualizaConteudo(id: string, buffer: Buffer<ArrayBufferLike>): Promise<Node> {
    return new Promise<Node>((resolve) =>
      this.http
        .put<Node>(`${this.montaUrl(id)}/content`, buffer, {
          headers: { 'Content-Type': 'application/pdf' },
        })
        .subscribe({
          next: ({ data }) => resolve(data),
          error: (error) => console.log('eqwewqeeq', error.response.data),
        }),
    );
  }

  exclui(id: string): Promise<{}> {
    return new Promise<{}>(() =>
      this.http
        .delete<{}>(`${this.montaUrl(id)}`)
        .subscribe({ next: () => {} }),
    );
  }

  private montaUrl(id?: string): string {
    return !id
      ? `${process.env.ALFRESCO_SERVICES_URL}/nodes`
      : `${process.env.ALFRESCO_SERVICES_URL}/nodes/${id}`;
  }
}
