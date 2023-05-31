import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent  } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      //redirection
      { path: '', redirectTo: '/home', pathMatch: 'full' },

      //control
      { path: 'home', component: HomeComponent },

      //modular to
      //old --> { path: 'category/:id', component: CategoryComponent },
      //new -->
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true,
        },
      },


      { path: 'mycart', component: MycartComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product/:id', component: ProductDetailComponent },

      //free
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
