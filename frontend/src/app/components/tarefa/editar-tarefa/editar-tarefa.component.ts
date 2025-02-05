
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaService } from 'src/app/services/tarefa.service';
import { tarefa } from 'src/app/interfaces/tarefa';

export enum Status {
  Pendente = 'Pendente',
  EmAndamento = 'EmAndamento',
  Concluida = 'Concluida'
}

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  statusEnum = Object.values(Status);
  usuarioId = Number(sessionStorage.getItem("usuario-id"));

  constructor(
    private dialogRef: MatDialogRef<EditarTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: tarefa,
    private fb: FormBuilder,
    private tarefaService: TarefaService
  ) {

  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarDadosTarefa();
  }

  inicializarFormulario() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      status: ['', Validators.required],
      usuarioId: [this.usuarioId]
    });
  }

  carregarDadosTarefa() {
    if (this.data) {
      const dataFormatada = this.formatarData(this.data.data); // Chama a função de formatação
      this.form.patchValue({
        id: this.data.id,
        nome: this.data.nome,
        descricao: this.data.descricao,
        data: dataFormatada,
        status: this.data.status
      });
    }
  }

  formatarData(data: string): string {
    if (!data) return '';
    const dataObj = new Date(data);
    return dataObj.toISOString().split('T')[0];
  }

  salvarTarefa(): void {
    if (this.form.valid) {
      const tarefaEditada: tarefa = this.form.value;

      this.tarefaService.editarTarefa(tarefaEditada).subscribe({
        next: (response) => {
          console.log('Tarefa editada com sucesso:', response);
          this.dialogRef.close(response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Erro ao editar tarefa:', error);
        }
      });
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}