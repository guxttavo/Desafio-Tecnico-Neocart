import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://localhost:5248/api/usuario';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: usuario) {
    return this.http.post(`${this.apiUrl}/cadastrarUsuario`, usuario);
  }
  
  buscarUsuarioPorId(id: number) {
    return this.http.get<usuario>(`${this.apiUrl}/buscarPorId/${id}`);
  }

  usuarioLogado(): boolean {
    const token = sessionStorage.getItem("auth-token");

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
