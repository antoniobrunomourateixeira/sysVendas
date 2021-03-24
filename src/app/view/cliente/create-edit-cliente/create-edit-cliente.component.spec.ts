import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClienteComponent } from './create-edit-cliente.component';

describe('CreateEditClienteComponent', () => {
  let component: CreateEditClienteComponent;
  let fixture: ComponentFixture<CreateEditClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
