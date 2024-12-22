import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction } from 'express';
import { lastValueFrom } from 'rxjs';
import { TicketResponse } from '../interfaces';
import { AlfrescoAuthService } from '../services';

@Injectable()
export class AlfrescoMiddleware implements NestMiddleware {
  ticket: TicketResponse = null;

  constructor(private authService: AlfrescoAuthService) {}

  async use(
    request: Request,
    response: Response,
    next: (error?: Error | NextFunction) => void,
  ) {
    this.populaTicket().then((ticket) => {
      const { id } = ticket.entry;
      axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Basic ${btoa(id)}`;
        return config;
      });
      next();
    });
  }

  private async populaTicket(): Promise<TicketResponse> {
    if (!this.ticket) {
      this.ticket = await lastValueFrom(this.authService.geraTicket());
    }
    return this.ticket;
  }
}
