import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'app/shared/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public listaProdutos = [];

  constructor(private _service: ProdutoService) { }

  ngOnInit(): void {
    this.getListaProdutos();
  }

  public getListaProdutos() {
    this._service.getAll().subscribe( res => {
      this.listaProdutos = res;
    })
  }

  public delete(key) {
    this._service.delete(key);
    this.getListaProdutos();
  }

}
