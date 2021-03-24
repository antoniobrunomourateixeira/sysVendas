import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepModel } from '../model/CepModel';

@Injectable({
  providedIn: 'root'
})

export class BuscaCepService {

  constructor(private _http: HttpClient) { }

  public getDadosEndereco(cep): Observable<CepModel> {
    return this._http.get<CepModel>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
