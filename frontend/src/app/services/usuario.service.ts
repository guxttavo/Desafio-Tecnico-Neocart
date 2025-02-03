import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: usuario) {
    return this.http.post(`${this.apiUrl + "/cadastrarUsuario"}`, usuario);
  }

  editarUsuario(id: number, usuario: usuario) {
    return this.http.put(`${this.apiUrl}/editarUsuario/${id}`, usuario);
  }
  
  buscarUsuarioPorId(id: number) {
    return this.http.get<usuario>(`${this.apiUrl}/buscarPorId/${id}`)
  }
}
