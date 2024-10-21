import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStylesComponent } from './item-styles.component';

describe('ItemStyleComponent', () => {
  let component: ItemStylesComponent;
  let fixture: ComponentFixture<ItemStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemStylesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
