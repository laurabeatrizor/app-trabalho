import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  PossoAjudar: string = "Voluntário";
  QueroAjuda: string = "Preciso de ajuda";

  constructor() {
  }
}
