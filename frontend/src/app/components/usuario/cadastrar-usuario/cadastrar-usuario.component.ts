import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import iziToast from 'izitoast';
import { usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(1)]],
      confirmarSenha: ['', Validators.required]
    }, { validator: this.senhasCoincidir('senha', 'confirmarSenha') });
  }

  cadastrarUsuario() {
    if (this.form.valid) {
      const usuario = this.form.value;

      const objetoUsuario: usuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
      }

      this.usuarioService.cadastrarUsuario(objetoUsuario).subscribe(
        {
          next: () => {
            iziToast.success({
              title: 'Sucesso',
              message: 'Usuário cadastrado com sucesso!',
              position: 'topRight'
            })
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 3000)
          }
        }
      );
    }
  }

  senhasCoincidir(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['senhasCoincidir']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ senhasCoincidir: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
