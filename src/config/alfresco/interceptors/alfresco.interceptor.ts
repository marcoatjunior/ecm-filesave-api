import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import axios from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { TicketResponse } from '../interfaces';
import { AlfrescoAuthService } from '../services';

@Injectable()
export class AlfrescoInterceptor implements NestInterceptor {
  ticket: TicketResponse = null;

  constructor(private authService: AlfrescoAuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['Authorization'];
    if (!authorization) {
      this.populaAccessToken();
    }
    return next.handle();
  }

  private populaAccessToken(): void {
    lastValueFrom(this.authService.geraTicket()).then((ticket) => {
      axios.defaults.headers.common['Authorization'] =
        `Basic ${btoa(ticket.entry.id)}`;
    });
  }
}
