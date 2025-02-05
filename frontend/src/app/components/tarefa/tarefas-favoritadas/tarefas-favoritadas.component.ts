import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tarefa } from 'src/app/interfaces/tarefa';

@Component({
  selector: 'app-tarefas-favoritadas',
  templateUrl: './tarefas-favoritadas.component.html',
  styleUrls: ['./tarefas-favoritadas.component.css']
})
export class TarefasFavoritadasComponent {
  constructor(
    public dialogRef: MatDialogRef<TarefasFavoritadasComponent>,
    @Inject(MAT_DIALOG_DATA) public tarefasFavoritadas: tarefa[]
  ) {}

  removerFavorito(tarefa: tarefa): void {
    this.tarefasFavoritadas = this.tarefasFavoritadas.filter(t => t.id !== tarefa.id);
    localStorage.setItem('tarefasFavoritadas', JSON.stringify(this.tarefasFavoritadas));
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}
