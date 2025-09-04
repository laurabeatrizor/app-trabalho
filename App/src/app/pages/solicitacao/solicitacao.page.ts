import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { TipoSolicitacao } from 'src/app/models/tipo-solicitacao.enum';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { Solicitacao } from 'src/app/models/solicitacao.model';

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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService) { }

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
      const valoresForm = this.solicitacaoForm.value;

      const novaSolicitacao: Solicitacao = {
        nome: valoresForm.nome,
        cidade: valoresForm.cidade,
        descricao: valoresForm.descricao,
        tipo: valoresForm.tipo
      }

      console.log(novaSolicitacao);
      this.solicitacaoService.adicionar(novaSolicitacao).subscribe({
        next: (res) => {
          console.log('Solicitacao salva:', res)

          this.solicitacaoForm.reset();
          this.router.navigateByUrl('/');
        },
        error: (err) => console.error('Erro ao salvar:', err)
      });

    }
  }

}
