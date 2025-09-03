import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule],

})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  forgotPassword() {
    console.log('Redirecionar para recuperação de senha');
  }

  goToCadastro() {
    this.router.navigateByUrl('/cadastro');
  }

}
