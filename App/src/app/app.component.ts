import { Component } from '@angular/core';
import { TipoSolicitacao } from './models/tipo-solicitacao.enum'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  PossoAjudar: TipoSolicitacao;
  QueroAjuda: TipoSolicitacao;

  constructor() {
    this.PossoAjudar = TipoSolicitacao.PossoAjudar;
    this.QueroAjuda = TipoSolicitacao.QueroAjuda;
  }
}
