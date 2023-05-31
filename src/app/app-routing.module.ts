import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
//Precarga de modulos all
import { PreloadAllModules } from '@angular/router';
// Preload Personalizado
import { CustomPreloadService } from './services/custom-preload.service'
//Estrategia: QuickLink Strategy | https://github.com/mgechev/ngx-quicklink | npm install ngx-quicklink --legacy-peer-deps
import { QuicklinkStrategy } from 'ngx-quicklink'
//guards: cms
import { AdminGuard } from './../app/guards/admin.guard';

const routes: Routes = [
  //WEBSITE!! -->MODULS
  { path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true,
    },
  },
  //CMS!! -->Sys. Manager. contents
  { path: 'cms',
    canActivate:[AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },
  //free
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // 01: Estrategia de carga todos los modulos
    //preloadingStrategy: PreloadAllModules

    // 02: Estrategia de carga de algunos modulos
    //preloadingStrategy: CustomPreloadService

    // Carga los que el navegador ve..
    //03: Estrategia: QuickLink Strategy | https://github.com/mgechev/ngx-quicklink | npm install ngx-quicklink --legacy-peer-deps
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
