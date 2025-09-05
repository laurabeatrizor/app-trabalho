import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { Solicitacao } from 'src/app/models/solicitacao.model';
import { AlertController } from '@ionic/angular';

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
  solicitacoes: Solicitacao[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService, private alertController: AlertController) { }

  ngOnInit() {
    const tipo = this.route.snapshot.paramMap.get('tipo');

    this.titulo = '- ' + tipo;

    console.log('tipo recebido:', tipo);

    this.solicitacaoForm = this.fb.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?[0-9()\-\s]{8,20}$/)]],
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
        telefone: valoresForm.telefone,
        descricao: valoresForm.descricao,
        tipo: valoresForm.tipo
      }

      console.log(novaSolicitacao);

      this.solicitacaoService.adicionar(novaSolicitacao).subscribe({
        next: async (res) => {
          console.log('Solicitacao salva:', res)

          this.solicitacaoForm.reset();

          const alert = await this.alertController.create({
            header: 'Enviado',
            message: 'Solicitação enviada com sucesso',
            buttons: ['OK']
          });

          await alert.present();

          await alert.onDidDismiss();

          setTimeout(async () => {
            await alert.dismiss();
            this.router.navigateByUrl('/mural');
          }, 2000);
        },
        error: (err) => console.error('Erro ao salvar:', err)
      });
    }
  }
}
