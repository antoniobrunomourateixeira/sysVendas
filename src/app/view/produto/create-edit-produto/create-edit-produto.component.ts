import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'app/shared/services/produto.service';
declare var $: any;

@Component({
  selector: 'app-create-edit-produto',
  templateUrl: './create-edit-produto.component.html',
  styleUrls: ['./create-edit-produto.component.css']
})
export class CreateEditProdutoComponent implements OnInit {
  public formProduto: FormGroup;
  public acao: string = 'Cadastrar';
  
  constructor( 
    private _fb: FormBuilder,
    private _service: ProdutoService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.formProduto = this._fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      key: ['']
    });

    const productIdFromRoute = this._activateRoute.snapshot.paramMap.get('id');

    this.getProduto(productIdFromRoute);
  }

  public salvar() {
    if(this.formProduto.value.key) {
      this.showMessage("Produto alterado com sucesso!");
      this._service.update(this.formProduto.value);
    } else {
      this.showMessage("Produto cadastrado com sucesso!");
      this._service.insert(this.formProduto.value);
    }
    this._router.navigate(['/view/produto'])
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

  public getProduto(key: string) {
    if(key) {
      this.acao = 'Editar';
      this._service.getAll().subscribe( res => {
        var cliente = res;
        
        cliente = cliente.filter(x => x.key == key);
        console.log(cliente);
  
        this.formProduto.patchValue({
          nome: cliente[0].produto.nome,
          valor: cliente[0].produto.valor,
          key: cliente[0].key,
        })
  
      })
    }
  }


}
