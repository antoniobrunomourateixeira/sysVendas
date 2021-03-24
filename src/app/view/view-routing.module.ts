import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CreateEditClienteComponent } from './cliente/create-edit-cliente/create-edit-cliente.component';
import { CreateEditProdutoComponent } from './produto/create-edit-produto/create-edit-produto.component';
import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';

const routes: Routes = [
  { path: "cliente", component: ClienteComponent },
  { path: "cadastrarCliente", component: CreateEditClienteComponent },
  { path: "editarCliente/:id", component: CreateEditClienteComponent },
  { path: "produto", component: ProdutoComponent },
  { path: "cadastrarProduto", component: CreateEditProdutoComponent },
  { path: "editarProduto/:id", component: CreateEditProdutoComponent },
  { path: "venda", component: VendaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
