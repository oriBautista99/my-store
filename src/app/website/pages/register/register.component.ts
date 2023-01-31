import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { onExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {

  constructor() { }

  onExit(){
    const rta = confirm('Logica desde comp, estas seguro salir?');
    return rta;
  }
}
