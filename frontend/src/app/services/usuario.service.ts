import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://localhost:5248/api/tarefa';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: usuario) {
    return this.http.post(`${this.apiUrl + "/cadastrarUsuario"}`, usuario);
  }
}
