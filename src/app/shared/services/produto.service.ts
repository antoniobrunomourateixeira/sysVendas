import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ProdutoModel } from '../model/ProdutoModel';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private db: AngularFireDatabase) { }

  insert(produto: ProdutoModel) {
    this.db.list('produto').push(produto).then((result: any) => {
      console.log(result.key);
    })
  }

  getAll() {
    return this.db.list('produto')
      .snapshotChanges()
      .pipe(
        map(changes => {
          
          return changes.map(c => ({ key: c.payload.key, produto: c.payload.val() as ProdutoModel }));
        }))

  }

  update(prod: ProdutoModel) {
    this.db.list('produto').update(prod.key, prod).catch((error: any) => {
      console.log(error);
    })
  }

  delete(key: string) {
    this.db.object(`produto/${key}`).remove();
  }
}
