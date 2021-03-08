import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl   : string = environment.baseUrl;
  private _usuario! : Usuario;


  get usuario() {
    return {...this._usuario};
  }



  constructor( private http: HttpClient ) { }

  login( email: string, password: string  ) {
    
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          localStorage.setItem('asd', resp.token!);
          if( resp.ok ) {
            this._usuario = {
              name : resp.name!,
              uid  : resp.uid!
            }
          }
          
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }



  validarToken() {
    const url = `${ this.baseUrl}/auth/renew`;
    const headers =  new HttpHeaders()
      .set('x-token', localStorage.getItem('asd') || '' );

    return this.http.get( url, { headers: headers} );


  }


}
