import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpService) {}

  consultaUsuarioLogado(): Observable<UserModel> {
    return this.http
      .get<any>(`${process.env.AUTH0_DOMAIN}/userinfo`)
      .pipe(map((response: AxiosResponse<UserModel>) => response.data));
  }
}
