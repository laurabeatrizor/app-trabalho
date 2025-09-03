import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];

  adicionar(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  listar(): Usuario[] {
    return this.usuarios;
  }
}