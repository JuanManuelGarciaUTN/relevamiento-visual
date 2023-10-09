import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  cerrarSesion(){
    this.router.navigate(['home']);
  }

  activarLindo(){
    this.router.navigate(['listado-lindo']);
  }
  activarFeo(){
    this.router.navigate(['listado-feo']);
  }

}
