import { Component, OnInit } from '@angular/core';

import iziToast from 'izitoast';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa.service';
import { tarefa } from 'src/app/interfaces/tarefa';
import { CadastrarTarefaComponent } from '../tarefa/cadastrar-tarefa/cadastrar-tarefa.component';
import { EditarTarefaComponent } from '../tarefa/editar-tarefa/editar-tarefa.component';

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

  constructor(
    public dialog: MatDialog,
    public tarefaService: TarefaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listarTarefas();
  }

  initializeForm() {
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
        this.tarefas = tarefas;
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

}
