import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { IonHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { TipoSolicitacao } from 'src/app/models/tipo-solicitacao.enum';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule],
})
export class SolicitacaoPage implements OnInit {
  solicitacaoForm!: FormGroup;
  titulo: string = "";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const tipo = this.route.snapshot.paramMap.get('tipo');

    if (tipo == TipoSolicitacao.PossoAjudar.toString()) {
      this.titulo = "de volutariado";
    } else {
      this.titulo = "de pedido de ajuda";
    }

    console.log('tipoc recebido:', tipo);

    this.solicitacaoForm = this.fb.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
      tipo: [tipo, Validators.required], 
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }
  cadastrar() {
    if (this.solicitacaoForm.valid) {
      console.log('Solicitação enviada:', this.solicitacaoForm.value);
      this.solicitacaoForm.reset();
      this.router.navigateByUrl('/');
    }
  }

}
