import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProdutoComponent } from './create-edit-produto.component';

describe('CreateEditProdutoComponent', () => {
  let component: CreateEditProdutoComponent;
  let fixture: ComponentFixture<CreateEditProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
