import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteService } from 'app/shared/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public listaClientes = [];

  constructor(
    public dialog: MatDialog,
    public service: ClienteService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getListaClientes();
  }

  openDialog() {
    this._router.navigate(['/view/cadastrarCliente'])
  }

  public getListaClientes() {
    this.service.getAll().subscribe( res => {
      this.listaClientes = res;
      console.log(res);
    })
  }

  public delete(key) {
    this.service.delete(key);
    this.getListaClientes();
  }

}
