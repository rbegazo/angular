import { Component } from '@angular/core';
import { Product } from '../../../core/models/product/product';
import { ProductService } from '../../../core/services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  errorMessage: string | null = null;
 
 
  constructor(private productService: ProductService, private router: Router) {
 
    this.ngOnInit()
  }
 
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los productos.';
        console.error('Error al obtener productos:', err);
      }
    });
  }
 
  viewDetails(id : string) {
    // Aquí podrías implementar la lógica para ver los detalles de un producto
    console.log('Ver detalles del producto con ID:', id);
  }
 
  redirect(){
    this.router.navigate(['/products/create']);
  }
 
  redirectUpdate(id: string){
    this.router.navigate(['/products/update/'+id+'/']);
  }
 
 
  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          console.log('Producto eliminado:', id);
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar el producto.';
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }
}
