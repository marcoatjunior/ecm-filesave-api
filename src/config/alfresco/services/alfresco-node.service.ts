import { HttpService } from '@nestjs/axios';
import { Injectable, StreamableFile } from '@nestjs/common';
import { Readable } from 'stream';
import { Node } from '../interfaces';

@Injectable()
export class AlfrescoNodeService {
  constructor(private http: HttpService) {}

  async consulta(id: string): Promise<Node> {
    return new Promise<Node>((resolve) =>
      this.http
        .get<Node>(this.montaUrl(id))
        .subscribe({ next: ({ data }) => resolve(data) }),
    );
  }

  async download(id: string): Promise<StreamableFile> {
    return new Promise<StreamableFile>((resolve) =>
      this.http
        .get<Readable>(`${this.montaUrl(id)}/content`, {
          responseType: 'stream',
        })
        .subscribe({ next: ({ data }) => resolve(new StreamableFile(data)) }),
    );
  }

  async upload(nome: string, diretorio: string): Promise<Node> {
    return new Promise<Node>((resolve) =>
      this.http
        .post<Node>(
          `${this.montaUrl(process.env.ALFRESCO_ID_FAMILIA)}/children`,
          { name: nome, nodeType: 'cm:content', relativePath: diretorio },
        )
        .subscribe({ next: ({ data }) => resolve(data) }),
    );
  }

  async atualiza(id: string, buffer: Buffer<ArrayBufferLike>): Promise<Node> {
    return new Promise<Node>((resolve) =>
      this.http
        .put<Node>(`${this.montaUrl(id)}/content`, buffer, {
          headers: { 'Content-Type': 'application/pdf' },
        })
        .subscribe({ next: ({ data }) => resolve(data) }),
    );
  }

  async exclui(id: string): Promise<void> {
    this.http.delete<void>(`${this.montaUrl(id)}`);
  }

  private montaUrl(id?: string): string {
    return !id
      ? `${process.env.ALFRESCO_SERVICES_URL}/nodes`
      : `${process.env.ALFRESCO_SERVICES_URL}/nodes/${id}`;
  }
}
