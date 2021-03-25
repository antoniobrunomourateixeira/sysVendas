import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RetornoProduto } from 'app/shared/model/Retornos/RetornoProduto';
import { ObjetoNovaVendaModel } from 'app/shared/model/Venda/ObjetoNovaVendaModel';
import { ProdutosVenda } from 'app/shared/model/Venda/ProdutosVendaModel';
import { ClienteService } from 'app/shared/services/cliente.service';
import { ProdutoService } from 'app/shared/services/produto.service';
import { VendaService } from 'app/shared/services/venda.service';

@Component({
  selector: 'app-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.css']
})
export class NovaVendaComponent implements OnInit {
  public formVenda: FormGroup;
  public listaClientes = [];
  public listaProdutos: RetornoProduto[] = [];
  public produtoSelecionado: ProdutosVenda[] =[];
  public valorTotal = 0;

  constructor(
    private _fb: FormBuilder,
    private _service: VendaService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _clienteService: ClienteService,
    private _produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.formVenda = this._fb.group({
      cliente: [''],
      produto: [''],
      qtd: [''],
      valor: ['']
    });

    this.getClientes();
    this.getListaProdutos();
  }

  public getClientes() {
    this._clienteService.getAll().subscribe( res => {
      this.listaClientes = res;
      console.log(res);
    })
  }

  public getListaProdutos() {
    this._produtoService.getAll().subscribe( res => {
      this.listaProdutos = res;
    })
  }

  public sumValor(qtd) {
    var valor = this.listaProdutos.filter(x => x.key == this.formVenda.value.produto)[0].produto.valor;
    var qtde = this.formVenda.value.qtd
    this.formVenda.patchValue({valor: valor * qtde})
  }

  addProduto() {
    var valoresForm = this.formVenda.value;
    var prod =  new ProdutosVenda()
      prod.key = valoresForm.produto;
      prod.produto = this.listaProdutos.filter(x => x.key == this.formVenda.value.produto)[0].produto.nome;
      prod.qtde = this.formVenda.value.qtd;
      prod.valor = this.listaProdutos.filter(x => x.key == this.formVenda.value.produto)[0].produto.valor;
      prod.total = this.listaProdutos.filter(x => x.key == this.formVenda.value.produto)[0].produto.valor * this.formVenda.value.qtd;
      this.valorTotal += prod.total;
    this.produtoSelecionado.push(prod);

    this.formVenda.patchValue({
      produto: [''],
      qtd: [''],
      valor: ['']
    })
  }

  public salvar() {
    // let total = 0;

    // for (let index = 0; index < this.produtoSelecionado.length; index++) {
    //   total = total + this.produtoSelecionado[index].valor;
    // }


    let objVenda = new ObjetoNovaVendaModel();
    objVenda.id_cliente = this.formVenda.value.cliente;
    objVenda.nome_cliente = this.listaClientes.filter(x => x.key == this.formVenda.value.cliente)[0].cliente.nome;
    objVenda.produtos = this.produtoSelecionado;
    objVenda.valor_total = this.valorTotal;

    this._service.insert(objVenda);
    this._router.navigate(['/view/venda']);
  }

}
