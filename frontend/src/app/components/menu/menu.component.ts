import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  usuarioLogado: boolean = false;
  nomeUsuario = sessionStorage.getItem("usuario-nome")?.split(' ')[0] || '';
  usuarioId: number | null = Number(sessionStorage.getItem("usuario-id")) || null; // Correção aqui


  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuarioLogado();

    if (this.usuarioLogado) {
      const usuarioLogadoId = this.usuarioId;
      if (usuarioLogadoId) {
        this.usuarioService.buscarUsuarioPorId(usuarioLogadoId).subscribe({
          next: (usuario) => {
            this.usuarioId = usuario.id ?? null;
          }, error: (error: any) => {
            console.error(error);
          }
        }
        )
      }
    }
  }

  sair(): void {
    sessionStorage.clear();
    this.usuarioLogado = false;
    window.location.reload();
  }
}
