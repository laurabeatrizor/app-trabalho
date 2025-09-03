import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true, 
  imports: [IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class CadastroPage implements OnInit {
  cadastroForm!: FormGroup;

  constructor( private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

   senhasIguais(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  cadastrar() {
    if(this.cadastroForm.valid) {
      // Criar usuário a partir do form
      const usuario = this.cadastroForm.value;
      this.usuarioService.adicionar(usuario); // salva via serviço
      this.cadastroForm.reset(); // limpa o form
      this.router.navigateByUrl('/home'); // redireciona para Home
    }
  }

}
