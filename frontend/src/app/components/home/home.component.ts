import { Component, OnInit } from '@angular/core';

import iziToast from 'izitoast';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioLogado: boolean = false;
  categorias: { nome: string }[] = [];
  filtroNome: string = '';
  filtroCategoria: string = '';
  usuarioId = Number(sessionStorage.getItem("usuario-id"));
  form: FormGroup = new FormGroup({});
  carroId = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      ano: ['', Validators.required],
      quilometragem: ['', Validators.required],
      valorBruto: ['', Validators.required],
      concessionaria: ['', Validators.required],
      placa: ['', Validators.required],
      donos: ['', Validators.required],
      categoria: ['', Validators.required],
      valorLiquido: ['', Validators.required],
      cor: ['', Validators.required],
      fabricante: ['', Validators.required],
      combustivel: ['', Validators.required],
      observacoes: ['', Validators.required],
      usuario: this.carroId
    });
  }
}
