import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import axios from 'axios';
import { NextFunction } from 'express';
import { lastValueFrom } from 'rxjs';
import { TicketResponse } from '../interfaces';
import { AlfrescoAuthService } from '../services';
import { excecoes } from 'src/common/resources';

@Injectable()
export class AlfrescoMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AlfrescoMiddleware.name);

  ticket: TicketResponse = null;

  constructor(private authService: AlfrescoAuthService) {}

  async use(
    request: Request,
    response: Response,
    next: (error?: Error | NextFunction) => void,
  ) {
    try {
      this.populaTicket().then((ticket) => {
        const { id } = ticket.entry;
        axios.interceptors.request.use((config) => {
          config.headers['Authorization'] = `Basic ${btoa(id)}`;
          return config;
        });
        next();
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(excecoes.erroInterno);
    }
  }

  private async populaTicket(): Promise<TicketResponse> {
    if (!this.ticket) {
      this.ticket = await lastValueFrom(this.authService.geraTicket());
    }
    return this.ticket;
  }
}
