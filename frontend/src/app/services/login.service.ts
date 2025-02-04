import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../interfaces/login';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class loginService {

    private apiUrl = 'http://localhost:5248/api/auth';
    usuarioLogado: boolean = false;

    constructor(private http: HttpClient) { }

    login(email: string, senha: string): Observable<login> {
        return this.http.post<login>(this.apiUrl + "/login", { email, senha }).pipe(
            tap((value) => {
                sessionStorage.setItem("auth-token", value.token);
                sessionStorage.setItem("usuario-id", value.usuarioId.toString())
                sessionStorage.setItem("usuario-nome", value.nome)
                this.usuarioLogado = true;
            }
            )
        );
    }
}
