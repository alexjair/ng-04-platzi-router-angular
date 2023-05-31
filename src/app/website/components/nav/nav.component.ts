import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';

//redirecction
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService : CategoriesService,
    private router: Router
  ) { }

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories : Category[] = [];

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    //LLamada de todas las categorias para el menu.
    this.funGetAllCategories();
    //llamar profile
    this.authService.user$.subscribe(
      data => {
        this.profile = data;
      }
    );
  }

  funGetAllCategories(){
    this.categoriesService.getAll()
    .subscribe( dtCategory => {
      console.log('nav: funGetAllCategories() => ',dtCategory);
      this.categories = dtCategory;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    //usuario normal
    //this.authService.loginAndGet('john@mail.com', 'changeme')
    //usuario administrador
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(user => {
      console.log('login: => ',user);
      if(user.role == 'admin'){
        alert('Bienvenido administrador');
        //this.router.navigate(['/cms']);
        this.router.navigate(['/profile']);
      }
      if(user.role == 'customer'){
        this.router.navigate(['/profile']);
      }
    });
  }

  funLogout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
