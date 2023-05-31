import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
  ){
  }

  productId: string | null = null;
  product: Product | null = null;

  funGoToBack(){
    this.location.back();
  }

  ngOnInit(): void{
    this.route.paramMap
    .pipe(
      switchMap(params => {
        //el 'id' debe de ser el mismo de la url del routerLink.
        this.productId = params.get('id');
        console.log('ngOnInit(): productId =>',this.productId);
        if(this.productId != null) {
          return this.productsService.getOne(
              this.productId
            );
        }else{
          return [null];
        }
      })
    ).subscribe(data => {
      this.product = data;
    });
  }

}

