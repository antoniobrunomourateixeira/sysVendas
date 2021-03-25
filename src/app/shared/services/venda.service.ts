import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RetornoVenda } from '../model/Retornos/RetornoVenda';
import { ObjetoNovaVendaModel } from '../model/Venda/ObjetoNovaVendaModel';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private db: AngularFireDatabase) { }

  insert(venda: ObjetoNovaVendaModel) {
    this.db.list('venda').push(venda).then((result: any) => {
      console.log(result.key);
    })
  }

  getAll() {
    return this.db.list('venda')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, venda: c.payload.val() as RetornoVenda[] }));
        }))

  }

}
