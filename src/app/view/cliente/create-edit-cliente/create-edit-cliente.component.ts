import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BuscaCepService } from 'app/shared/services/busca-cep.service';
import { ClienteService } from 'app/shared/services/cliente.service';
declare var $: any;

@Component({
  selector: 'app-create-edit-cliente',
  templateUrl: './create-edit-cliente.component.html',
  styleUrls: ['./create-edit-cliente.component.css']
})
export class CreateEditClienteComponent implements OnInit {

  public formCLiente: FormGroup;
  public acao: string = 'Cadastrar';
  public UF = [
      {"nome": "Acre", "sigla": "AC"},
      {"nome": "Alagoas", "sigla": "AL"},
      {"nome": "Amapá", "sigla": "AP"},
      {"nome": "Amazonas", "sigla": "AM"},
      {"nome": "Bahia", "sigla": "BA"},
      {"nome": "Ceará", "sigla": "CE"},
      {"nome": "Distrito Federal", "sigla": "DF"},
      {"nome": "Espírito Santo", "sigla": "ES"},
      {"nome": "Goiás", "sigla": "GO"},
      {"nome": "Maranhão", "sigla": "MA"},
      {"nome": "Mato Grosso", "sigla": "MT"},
      {"nome": "Mato Grosso do Sul", "sigla": "MS"},
      {"nome": "Minas Gerais", "sigla": "MG"},
      {"nome": "Pará", "sigla": "PA"},
      {"nome": "Paraíba", "sigla": "PB"},
      {"nome": "Paraná", "sigla": "PR"},
      {"nome": "Pernambuco", "sigla": "PE"},
      {"nome": "Piauí", "sigla": "PI"},
      {"nome": "Rio de Janeiro", "sigla": "RJ"},
      {"nome": "Rio Grande do Norte", "sigla": "RN"},
      {"nome": "Rio Grande do Sul", "sigla": "RS"},
      {"nome": "Rondônia", "sigla": "RO"},
      {"nome": "Roraima", "sigla": "RR"},
      {"nome": "Santa Catarina", "sigla": "SC"},
      {"nome": "São Paulo", "sigla": "SP"},
      {"nome": "Sergipe", "sigla": "SE"},
      {"nome": "Tocantins", "sigla": "TO"}
  ];

  constructor(
    private _fb: FormBuilder,
    private _service: ClienteService,
    private _router: Router,
    private _cepService: BuscaCepService,
    private _activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.formCLiente = this._fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: [''],
      cidade: ['', Validators.required],
      estado: [''],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      key: ['']
    })

    const productIdFromRoute = this._activateRoute.snapshot.paramMap.get('id');

    this.getCliente(productIdFromRoute);

  }

  public salvar() {
    if(this.formCLiente.value.key) {
      this.showMessage("Cliente alterado com sucesso!");
      this._service.update(this.formCLiente.value);
    } else {
      this.showMessage("Cliente cadastrado com sucesso!");
      this._service.insert(this.formCLiente.value);
    }
    this._router.navigate(['/view/cliente'])
  }

  public showMessage(texto: string) {
    const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "check",
          message: texto

      },{
          type: type[2],
          timer: 4000,
          placement: {
              from: 'top',
              align: 'right'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  public getCliente(key) {
    if(key) {
      this.acao = 'Editar';
      this._service.getAll().subscribe( res => {
        var cliente = res;
        
        cliente = cliente.filter(x => x.key == key);
        console.log(cliente);
  
        this.formCLiente.patchValue({
          nome: cliente[0].cliente.nome,
          cpf: cliente[0].cliente.cpf,
          cep: cliente[0].cliente.cep,
          logradouro: cliente[0].cliente.logradouro,
          numero: cliente[0].cliente.numero,
          bairro: cliente[0].cliente.bairro,
          complemento: cliente[0].cliente.complemento,
          cidade: cliente[0].cliente.cidade,
          estado: cliente[0].cliente.estado,
          email: cliente[0].cliente.email,
          dataNascimento: cliente[0].cliente.dataNascimento,
          key: cliente[0].key,
        })
  
      })
    }
  }

  public preencherEndereco() {
    this._cepService.getDadosEndereco(this.formCLiente.value.cep).subscribe(res => {
      console.log(res)
      this.formCLiente.patchValue({
        logradouro: res.logradouro,
        bairro: res.bairro,
        cidade: res.localidade,
        estado: res.uf
      })
    });
  }

}
