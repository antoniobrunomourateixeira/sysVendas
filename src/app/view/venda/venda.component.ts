import { Component, OnInit } from '@angular/core';
import { RetornoVenda } from 'app/shared/model/Retornos/RetornoVenda';
import { VendaService } from 'app/shared/services/venda.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  public listaVendas = [];
  constructor(
    private _service: VendaService
  ) { }

  ngOnInit(): void {
    this.getVendas();
  }

  public getVendas() {
    this._service.getAll().subscribe(res => {
      this.listaVendas = res;
    })
  }

}
