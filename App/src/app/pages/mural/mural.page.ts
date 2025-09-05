import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Solicitacao } from 'src/app/models/solicitacao.model';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MuralPage implements OnInit {
  filtroSelecionado: string = 'Todas';
  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit() {

    this.solicitacaoService.getSolicitacoes().subscribe({
      next: async (res) => {
        this.solicitacoes = res;
      },
      error: (err) => console.error('Erro ao consultar:', err)
    });

  }

  filtrarSolicitacoes() {
    if (this.filtroSelecionado === 'Todas') {
      return this.solicitacoes;
    }

    return this.solicitacoes.filter(s => s.tipo === this.filtroSelecionado);
  }
}
