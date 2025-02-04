import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../interfaces/login';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class loginService {

    private apiUrl = 'http://localhost:5248/api/auth/login';
    usuarioLogado: boolean = false;

    constructor(private http: HttpClient) { }

    login(Email: string, Senha: string): Observable<login> {
        return this.http.post<login>(this.apiUrl, { Email, Senha }).pipe(
            tap((value) => {
                sessionStorage.setItem("auth-token", value.token);
                sessionStorage.setItem("usuario-id", value.usuarioId.toString())
                this.usuarioLogado = true;
            }
            )
        );
    }
}
