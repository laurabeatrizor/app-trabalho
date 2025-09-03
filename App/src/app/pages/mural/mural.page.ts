import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MuralPage implements OnInit {

  filtroSelecionado: string = 'todos';

  solicitacoes = [
    {
      nome: 'Fulano',
      tipo: 'voluntario',
      descricao: 'Disponível para cortar a grama',
      telefone: '(51) 99999-9999'
    },
    {
      nome: 'Ciclano',
      tipo: 'Precisa de ajuda',
      descricao: 'Preciso de ajuda com compras',
      telefone: '(51) 98888-8888'
    },
    {
      nome: 'Beltrano',
      tipo: 'voluntario',
      descricao: 'Disponível para dar aulas de reforço',
      telefone: '(51) 97777-7777'
    }
  ];
  filtrarSolicitacoes() {
    if (this.filtroSelecionado === 'todos') {
      return this.solicitacoes;
    }
    return this.solicitacoes.filter(s => s.tipo === this.filtroSelecionado);
  }



  constructor() { }

  ngOnInit() {
  }

}
