import { Component, OnInit } from '@angular/core';

import iziToast from 'izitoast';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { TarefaService } from 'src/app/services/tarefa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tarefa } from 'src/app/interfaces/tarefa';
import { CadastrarTarefaComponent } from '../tarefa/cadastrar-tarefa/cadastrar-tarefa.component';
import { EditarTarefaComponent } from '../tarefa/editar-tarefa/editar-tarefa.component';
import { TarefasFavoritadasComponent } from '../tarefa/tarefas-favoritadas/tarefas-favoritadas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioLogado: boolean = false;
  usuarioId = Number(sessionStorage.getItem("usuario-id"));
  form: FormGroup = new FormGroup({});
  tarefas: tarefa[] = [];
  tarefasPendentes: tarefa[] = [];
  tarefasEmAndamento: tarefa[] = [];
  tarefasConcluidas: tarefa[] = [];

  constructor(
    public dialog: MatDialog,
    public tarefaService: TarefaService,
    public usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.usuarioService.usuarioLogado();
    if (this.usuarioLogado) {
      this.listarTarefas();
    }
  }

  listarTarefas(): void {
    this.tarefaService.listarTarefa().subscribe({
      next: (tarefas) => {
        if (!tarefas || tarefas.length === 0) {
          iziToast.info({
            title: 'Aviso',
            message: 'Nenhuma tarefa encontrada.',
          });
          return;
        }

        const tarefasUsuario = tarefas.filter(tarefa => tarefa.usuarioId === this.usuarioId);

        this.tarefas = tarefasUsuario;
        this.tarefasPendentes = tarefasUsuario.filter(tarefa => tarefa.status === 'Pendente');
        this.tarefasEmAndamento = tarefasUsuario.filter(tarefa => tarefa.status === 'EmAndamento');
        this.tarefasConcluidas = tarefasUsuario.filter(tarefa => tarefa.status === 'Concluida');
      },
      error: (erro) => {
        console.error('Erro ao carregar tarefas:', erro);
        iziToast.error({
          title: 'Erro',
          message: 'Não foi possível carregar as tarefas.',
        });
      }
    });
  }

  abrirModalCadastro(): void {
    const dialogRef = this.dialog.open(CadastrarTarefaComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Tarefa cadastrada:', result);
      }
    });
  }

  abrirModalEditar(tarefa: tarefa): void {
    const dialogRef = this.dialog.open(EditarTarefaComponent, {
      width: '400px',
      data: tarefa
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Tarefa Editada:', result);
      }
    });
  }

  abrirModalTarefasFavoritadas(): void {
    const tarefasFavoritadas = JSON.parse(localStorage.getItem('tarefasFavoritadas') || '[]');

    this.dialog.open(TarefasFavoritadasComponent, {
      width: '400px',
      data: tarefasFavoritadas
    });
  }

  excluirTarefa(id: number): void {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.tarefaService.excluirTarefa(id).subscribe({
        next: () => {
          iziToast.success({
            title: 'Sucesso',
            message: 'Tarefa excluída com sucesso!',
          });
          this.listarTarefas();
        },
        error: (erro) => {
          console.error('Erro ao excluir tarefa:', erro);
          iziToast.error({
            title: 'Erro',
            message: 'Não foi possível excluir a tarefa.',
          });
        }
      });
    }
  }

  favoritarTarefa(tarefa: tarefa) {
    let tarefasFavoritadas = JSON.parse(localStorage.getItem('tarefasFavoritadas') || '[]');

    const tarefaExistente = tarefasFavoritadas.find((item: tarefa) => item.id === tarefa.id);

    if (!tarefaExistente) {
      tarefasFavoritadas.push(tarefa);
      localStorage.setItem('tarefasFavoritadas', JSON.stringify(tarefasFavoritadas));

      iziToast.success({
        title: 'Favorito',
        message: `${tarefa.nome} foi adicionado aos seus favoritos.`,
        position: 'topRight'
      });
    } else {
      iziToast.info({
        title: 'Info',
        message: `${tarefa.nome} já está nos seus favoritos.`,
        position: 'topRight'
      });
    }
  }
}
