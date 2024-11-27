import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { UserComponent } from './shared/components/user/user.component';
import { AboutComponent} from './shared/components/about/about.component';
import { ProductComponent } from './features/products/product/product.component';
import { ProductCreateComponent } from './features/products/product-create/product-create.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { AuthGuard } from './core/guardians/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { LogoutComponent } from './shared/components/logout/logout.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'about',
    component:AboutComponent,
  },
  {
    path:'user/:id',
    component:UserComponent,
  },

  {
    path:'products',
    component:ProductComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path:'create',
        component:ProductCreateComponent,
      },
      {
        path:'list',
        component:ProductListComponent,
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'logout',
    component:LogoutComponent,
    canActivate:[AuthGuard],
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
