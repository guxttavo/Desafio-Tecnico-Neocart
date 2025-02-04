import { Component, OnInit } from '@angular/core';

import iziToast from 'izitoast';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa-service';
import { tarefa } from 'src/app/interfaces/tarefa';

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

  tarefasPorData: { [key: string]: tarefa[] } = {};

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
        this.tarefas = tarefas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
        
        this.tarefasPorData = this.tarefas.reduce((acc, tarefa) => {
          const dataFormatada = new Date(tarefa.data).toLocaleDateString(); // Converte para string legível
          if (!acc[dataFormatada]) {
            acc[dataFormatada] = [];
          }
          acc[dataFormatada].push(tarefa);
          return acc;
        }, {} as { [key: string]: tarefa[] });
  
        console.log('Tarefas organizadas por data:', this.tarefasPorData);
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
  
}
