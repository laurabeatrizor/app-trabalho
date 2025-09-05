import { Injectable } from '@angular/core';
import { Solicitacao } from '../models/solicitacao.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl = 'http://localhost:3000/solicitacao';

  constructor(private http: HttpClient) { }

  getSolicitacoes(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>('http://localhost:3000/solicitacao');
  }

  adicionar(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.http.post<Solicitacao>(this.apiUrl, solicitacao);
  }
}