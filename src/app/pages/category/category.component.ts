import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  constructor(
    private route : ActivatedRoute,
    private productsService : ProductsService,
  ){}

  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;

  onLoadMore(){
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  ngOnInit(): void{

    this.route.paramMap
    .pipe(
      switchMap(params => {
        //el 'id' debe de ser el mismo de la url del routerLink.
        this.categoryId = params.get('id');
        //console.log(this.categoryId);
        if(this.categoryId != null) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
        }else{
          return [];
        }
      })
    ).subscribe(data => {
      this.products = data;
    });

    //Evitar el  "Call Back hell"
    /*********** [Mala practica, doble subscribe] **********/
    /*
    this.route.paramMap.subscribe( params =>{
      //el 'id' debe de ser el mismo de la url del routerLink.
      this.categoryId = params.get('id');
      //console.log(this.categoryId);
      if(this.categoryId != null) {
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset).subscribe(data => {
          this.products = data;
        });
      }
    });
    */
  }


}
