import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService,
    private route : ActivatedRoute,
  ) {
  }

  productId: string | null = null; //params
  products: Product[] = [];
  limit = 10;
  offset = 0;

  onLoadMore(){
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe( params =>{
      this.productId = params.get('product'); //url: ?product=12
      console.log(this.productId);

    });
  }

}
