import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/product/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let products: Product[] = [{ id: '1', name: 'Producto 1', price: 10 }, { id: '2', name: 'Producto 2', price: 20.5 }];

  const myServiceSubject = new Subject<Product[]>();

  const myServiceSubjectMock = jasmine.createSpyObj('ProductService', products,{
    getProducts: () => myServiceSubject.asObservable()
  }); //Indica que función del servicio de productos se va a simular

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: myServiceSubjectMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }))
  
  
  
  /*beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar la lista de productos', fakeAsync(() => {
    myServiceSubject.next(products);
    myServiceSubject.complete();
    fixture.detectChanges();  
    tick();
    expect(component.products.length).toBe(2);  
    expect(component.products[0].name).toBe('Producto 1');
  }));


});
