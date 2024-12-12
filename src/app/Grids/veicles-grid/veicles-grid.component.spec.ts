import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiclesGridComponent } from './veicles-grid.component';

describe('VeiclesGridComponent', () => {
  let component: VeiclesGridComponent;
  let fixture: ComponentFixture<VeiclesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiclesGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeiclesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
