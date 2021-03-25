import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewRoutingModule } from './view-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';
import { CreateEditClienteComponent } from './cliente/create-edit-cliente/create-edit-cliente.component';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditProdutoComponent } from './produto/create-edit-produto/create-edit-produto.component';
import { NgxCurrencyModule } from "ngx-currency";
import { NovaVendaComponent } from './venda/nova-venda/nova-venda.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [ClienteComponent, ProdutoComponent, VendaComponent, CreateEditClienteComponent, CreateEditProdutoComponent, NovaVendaComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ViewRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ViewModule { }
