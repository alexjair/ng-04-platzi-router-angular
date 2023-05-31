import { Component } from '@angular/core';
import { onExit } from './../../../guards/exit.guard'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {
  constructor(){}

  txtTitle = 'Modulo Registro';

  onExit(){
    const resp = confirm('Va ha salir del ['+this.txtTitle+']. Desea salir?');
    return resp;
  }

}
