import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tarefa } from 'src/app/interfaces/tarefa';
import { TarefaService } from 'src/app/services/tarefa-service';

// Enum de status
export enum Status {
  Pendente = 'Pendente',
  EmAndamento = 'Em Andamento',
  Concluida = 'Concluída'
}

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent {
  form: FormGroup;
  statusEnum = Object.values(Status);
  usuarioId: number = 1;

  constructor(
    private dialogRef: MatDialogRef<CadastrarTarefaComponent>,
    private fb: FormBuilder,
    public tarefaService: TarefaService,
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      status: [Status.Pendente, Validators.required],
      usuario: this.usuarioId
    });
  }

  salvar(): void {
    if (this.form.valid) {
      const tarefa = this.form.value;

      const objetoTarefa: tarefa = {
        id: null,
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        data: tarefa.data,
        status: tarefa.status,
        usuarioId : tarefa.usuarioId
      }

      this.tarefaService.cadastrarTarefa(objetoTarefa).subscribe({
        next: (response) => {
          console.log('Tarefa cadastrada com sucesso:', response);
          this.dialogRef.close(tarefa);
        },
        error: (error) => {
          console.error('Erro ao cadastrar tarefa:', error);
        }
      });
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
