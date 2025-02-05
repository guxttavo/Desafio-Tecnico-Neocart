import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tarefa } from 'src/app/interfaces/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

export enum Status {
  Pendente = 'Pendente',
  EmAndamento = 'EmAndamento',
  Concluida = 'Concluida'
}

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent implements OnInit {
  
  form!: FormGroup;
  statusEnum = Object.values(Status);
  usuarioId = Number(sessionStorage.getItem("usuario-id"));

  constructor(
    private dialogRef: MatDialogRef<CadastrarTarefaComponent>,
    private fb: FormBuilder,
    public tarefaService: TarefaService,
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
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

      let dataCorrigida = new Date(tarefa.data);
      dataCorrigida.setDate(dataCorrigida.getDate() + 1);

      const objetoTarefa: tarefa = {
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        data: dataCorrigida.toISOString(),
        status: tarefa.status,
        usuarioId: this.usuarioId
      };

      this.tarefaService.cadastrarTarefa(objetoTarefa).subscribe({
        next: (response) => {
          console.log('Tarefa cadastrada com sucesso:', response);
          this.dialogRef.close(tarefa);
          window.location.reload();
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
