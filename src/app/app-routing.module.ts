import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
//Precarga de modulos all
import { PreloadAllModules } from '@angular/router';
// Preload Personalizado
import { CustomPreloadService } from './services/custom-preload.service'

//{ path: '', redirectTo: '/home', pathMatch: 'full' },
const routes: Routes = [

  //{ path: '', component: HomeComponent },

  //WEBSITE!! -->MODULS
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    },
  },
  //CMS!! -->Sys. Manager. contents
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  //free
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Estrategia de carga todos los modulos
    //preloadingStrategy: PreloadAllModules

    // Estrategia de carga de algunos modulos
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
