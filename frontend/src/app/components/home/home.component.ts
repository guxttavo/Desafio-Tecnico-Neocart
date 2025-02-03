import { Component, OnInit } from '@angular/core';
import { carro } from 'src/app/interfaces/carro';

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
  carros: carro[] = [];
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

  editarCarro() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      const carroAtualizado: carro = {
        id: null,
        nome: formData.nome,
        ano: formData.ano,
        quilometragem: formData.quilometragem,
        valorBruto: formData.valorBruto,
        concessionaria: formData.concessionaria,
        placa: formData.placa,
        dono: parseInt(formData.donos, 10),
        valorLiquido: formData.valorLiquido,
        categoria: { id: parseInt(formData.categoria, 10) },
        cor: { id: parseInt(formData.cor, 10) },
        fabricante: { id: parseInt(formData.fabricante, 10) },
        combustivel: { id: parseInt(formData.combustivel, 10) },
        observacoes: formData.observacoes,
        usuario: { id: parseInt(formData.usuario, 10) }
      };
    } else {
      iziToast.error({
        title: 'Erro!',
        message: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }


  listarCarro() {
  
  }

  deletarCarro(id: number) {

  }

  favoritarCarro(carro: carro) {
    let carrosFavoritados = JSON.parse(localStorage.getItem('carrosFavoritados') || '[]');

    const carroExistente = carrosFavoritados.find((item: carro) => item.id === carro.id);

    if (!carroExistente) {
      carrosFavoritados.push(carro);
      localStorage.setItem('carrosFavoritados', JSON.stringify(carrosFavoritados));

      iziToast.success({
        title: 'Favorito',
        message: `${carro.nome} foi adicionado aos seus favoritos.`,
        position: 'topRight'
      });
    } else {
      iziToast.info({
        title: 'Info',
        message: `${carro.nome} já está nos seus favoritos.`,
        position: 'topRight'
      });
    }
  }


  abrirModalEditarCarro(carro: carro) {
    this.initializeForm(); // Inicializa o formulário
    this.form.patchValue({
      nome: carro.nome,
      ano: carro.ano,
      quilometragem: carro.quilometragem,
      valorBruto: carro.valorBruto,
      concessionaria: carro.concessionaria,
      placa: carro.placa,
      donos: carro.dono?.toString(),
      valorLiquido: carro.valorLiquido,
      categoria: carro.categoria.id.toString(),
      cor: carro.cor?.id.toString(),
      fabricante: carro.fabricante?.id.toString(),
      combustivel: carro.combustivel?.id.toString(),
      observacoes: carro.observacoes,
      usuario: carro.usuario.id.toString(),
    });
  }
  

  filtrarCarros() {
    this.carros = this.carros.filter((carro) => {
      const nomeValido = this.filtroNome
        ? carro.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
        : true;
      const categoriaValida = this.filtroCategoria
        ? carro.categoria.nome === this.filtroCategoria
        : true;
      return nomeValido && categoriaValida;
    });
  }
}
