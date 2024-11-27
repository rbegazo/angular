import { Component } from '@angular/core';
import { Product } from '../../../core/models/product/product';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  product: Product = {id: '', name: '', price: 0 };
 
  constructor(private productService: ProductService) {}
 
  onSubmit() {
    this.productService.createProduct(this.product).subscribe({
      next: (data) => {
        console.log('Producto agregado:', data);
        // Aquí puedes agregar lógica para redirigir o mostrar un mensaje
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
      }
    });
  }
}
