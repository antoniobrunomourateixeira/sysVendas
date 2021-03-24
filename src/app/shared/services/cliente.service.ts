import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ClienteModel } from '../model/ClienteModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFireDatabase) { }

  insert(cliente: ClienteModel) {
    this.db.list('cliente').push(cliente).then((result: any) => {
      console.log(result.key);
    })
  }

  getAll() {
    return this.db.list('cliente')
      .snapshotChanges()
      .pipe(
        map(changes => {
          
          return changes.map(c => ({ key: c.payload.key, cliente: c.payload.val() as ClienteModel }));
        }))
    // return this.db.list('cliente')
    //   .snapshotChanges()
    //   .pipe(
    //     map(changes => {
    //       console.info(changes);
    //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
    //     }))
  }

  update(cliente: ClienteModel) {
    this.db.list('cliente').update(cliente.key, cliente).catch((error: any) => {
      console.log(error);
    })
  }

  delete(key: string) {
    this.db.object(`cliente/${key}`).remove();
  }


}
