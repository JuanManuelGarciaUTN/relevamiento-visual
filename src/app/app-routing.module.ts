import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';
import { ListadoComponent } from './listado/listado.component';
import { ListadoFeoComponent } from './listado-feo/listado-feo.component';
import { GraficoComponent } from './grafico/grafico.component';
import { GraficoFeoComponent } from './grafico-feo/grafico-feo.component';
import { MisFotosComponent } from './mis-fotos/mis-fotos.component';
import { MisFotosFeoComponent } from './mis-fotos-feo/mis-fotos-feo.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'selector',
    component: SelectorComponent
  },
  {
    path: 'listado-lindo',
    component: ListadoComponent
  },
  {
    path: 'listado-feo',
    component: ListadoFeoComponent
  },
  {
    path: 'grafico-lindo',
    component: GraficoComponent
  },
  {
    path: 'grafico-feo',
    component: GraficoFeoComponent
  },
  {
    path: 'mis-fotos-lindo',
    component: MisFotosComponent
  },
  {
    path: 'mis-fotos-feo',
    component: MisFotosFeoComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
