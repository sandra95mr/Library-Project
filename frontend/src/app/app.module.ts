import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; //para manejar formularios que cambian sus datos


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductComponent } from './componentes/product/product.component';
import { BodyComponent } from './componentes/body/body.component';
import { HomeComponent } from './componentes/home/home.component';
import { CartComponent } from './componentes/cart/cart.component';
import { SignUpComponent } from './componentes/sign-up/sign-up.component';
import { LoginComponent } from './componentes/login/login.component';
import { FilterPipe } from './shared/filter.pipe';
import { ManagementComponent } from './componentes/management/management.component';
import { AsideLeftComponent } from './componentes/aside-left/aside-left.component';
import { AsideRightComponent } from './componentes/aside-right/aside-right.component';
import { ComponentCartComponent } from './componentes/component-cart/component-cart.component';
import { FiltersComponent } from './componentes/filters/filters.component';
import { BookComponent } from './componentes/book/book.component';
import { MisComprasComponent } from './componentes/mis-compras/mis-compras.component';
import { FotoComponent } from './componentes/foto/foto.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    BodyComponent,
    HomeComponent,
    CartComponent,
    SignUpComponent,
    LoginComponent,
    FilterPipe,
    ManagementComponent,
    AsideLeftComponent,
    AsideRightComponent,
    ComponentCartComponent,
    FiltersComponent,
    BookComponent,
    MisComprasComponent,
    FotoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
