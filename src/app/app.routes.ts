import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pag/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'formulario',
    loadComponent: () => import('./pag/formulario/formulario.page').then( m => m.FormularioPage)
  },
];

@NgModule({ 
  imports: [ 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) 
  ], 
  exports: [RouterModule] 
}) 
export class AppRoutingModule {}