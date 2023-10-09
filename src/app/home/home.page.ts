import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseDeDatosService } from '../services/base-de-datos.service';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public form!: FormGroup;
  public loginInvalido = false;
  public validando = false;
  public cargando = false;
  public acceso = 0;

  constructor(private fb: FormBuilder,private router : Router, private db: BaseDeDatosService){ 
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password':['', [Validators.required]],
    });
  }

  ngAfterViewInit(){
    if(this.db.usuario){
      this.db.usuario = undefined;
    }
    else{
      this.cargando = true;
      setTimeout(()=>{
        setTimeout(()=>{
          SplashScreen.hide();
          setTimeout(()=>{
            this.cargando = false;
          }, 2500);
        }, 1000);
      },500);
    }
  }

  Login(){
    this.limpiarEspacios();
    this.loginInvalido = false;
    this.validando = true;
    const usuario = this.form.value;
    const sub = this.db.obtenerUsuarios().subscribe(listaUsuarios=>{
      sub.unsubscribe();
      for(let datos of listaUsuarios){
        console.log(datos);
        if(datos.correo == usuario.email && datos.clave == usuario.password){
          datos.clave = "";
          this.db.login(datos);
          this.validando = false;
          this.limpiarInputs();
          this.router.navigate(["selector"]);
          return;
        }
      }
      this.loginInvalido = true;
      this.validando = false;
    });
  }

  private limpiarEspacios(){
    this.form.get('email')?.setValue(this.form.get('email')?.value.trim());
    this.form.get('password')?.setValue(this.form.get('password')?.value.trim());
  }

  private limpiarInputs(){
    this.form.get('email')?.setValue("");
    this.form.get('password')?.setValue("");
  }

  completarInvitado(){
    this.completarForm("invitado@invitado.com", "222222");
  }

  completarAdmin(){
    this.completarForm("admin@admin.com", "111111");
  }

  completarUsuario(){
    this.completarForm("usuario@usuario.com", "333333");
  }

  completarAnonimo(){
    this.completarForm("anonimo@anonimo.com", "444444");
  }

  completarTester(){
    this.completarForm("tester@tester.com", "555555");
  }

  private completarForm(email: string, password: string){
    this.form.get('email')?.setValue(email);
    this.form.get('password')?.setValue(password);
  }

  SiguienteAcceso(){
    this.acceso += 1;
    if(this.acceso == 6){
      this.acceso = 1;
    }
    this.ActualizarAcceso();
  }

  AnteriorAcceso(){
    this.acceso -= 1;
    if(this.acceso == 0){
      this.acceso = 5;
    }
    this.ActualizarAcceso();
  }

  ActualizarAcceso(){
    switch(this.acceso){
      case 1:
        this.completarAdmin();
        break;

      case 2:
        this.completarInvitado();
        break;

      case 3:
        this.completarUsuario();
        break;

      case 4:
        this.completarAnonimo();
        break;

      case 5:
        this.completarTester();
          break;
    }
  }

}
