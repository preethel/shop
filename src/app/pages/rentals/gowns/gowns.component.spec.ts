import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GownsComponent } from './gowns.component';

describe('GownsComponent', () => {
  let component: GownsComponent;
  let fixture: ComponentFixture<GownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GownsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
