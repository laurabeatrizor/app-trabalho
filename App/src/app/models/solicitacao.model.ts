import { TipoSolicitacao } from "./tipo-solicitacao.enum";

export interface Solicitacao {
  nome: string;
  cidade: string;
  tipo: TipoSolicitacao;
  descricao: string;
}
