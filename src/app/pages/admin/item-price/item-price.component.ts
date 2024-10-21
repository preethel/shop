import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ItemPriceService } from '../../../services/item-price.service';
import { ItemPrice } from '../../models/item-price';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.component.html',
  styleUrl: './item-price.component.scss',
  providers: [MessageService],
})
export class ItemPriceComponent implements OnInit {
  itemPriceDialog: boolean = false;
  deleteItemPriceDialog: boolean = false;
  deleteItemPricesDialog: boolean = false;
  itemPrice: ItemPrice = {} as ItemPrice;
  itemPrices: ItemPrice[] = [];
  selectedItemPrices: ItemPrice[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  totalRecords: number = 0;
  @Input() inputItemPrices: ItemPrice[] | any;
  constructor(
    private itemPriceService: ItemPriceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Verify the input data
    console.log('Received item prices:', this.inputItemPrices);

    // Initialize itemPrices with the input data
    this.itemPrices = this.inputItemPrices || [];

    // Define columns for the table
    this.cols = [
      { field: 'itemStyle', header: 'Item Style' },
      { field: 'itemStyleId', header: 'Item Style ID' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'price', header: 'Price' },
      { field: 'boyPrice', header: 'Boy Price' },
      { field: 'babyPrice', header: 'Baby Price' },
    ];
  }

  loadItemPrices() {
    this.itemPrices = this.inputItemPrices || [];
  }

  openNew() {
    this.itemPrice = {} as ItemPrice;
    this.submitted = false;
    this.itemPriceDialog = true;
  }

  deleteSelectedItemPrices() {
    this.deleteItemPricesDialog = true;
  }

  editItemPrice(itemPrice: ItemPrice) {
    this.itemPrice = { ...itemPrice };
    this.itemPriceDialog = true;
  }

  deleteItemPrice(itemPrice: ItemPrice) {
    this.deleteItemPriceDialog = true;
    this.itemPrice = { ...itemPrice };
  }

  confirmDelete() {
    this.deleteItemPriceDialog = false;
    this.itemPriceService.deleteItemPrice(this.itemPrice.id).subscribe(() => {
      this.itemPrices = this.itemPrices.filter(
        (val) => val.id !== this.itemPrice.id
      );
      this.messageService.add({
        severity: 'Success',
        summary: 'Successful',
        detail: 'Item Price Deleted',
        life: 3000,
      });
      this.itemPrice = {} as ItemPrice;
    });
  }

  hideDialog() {
    this.itemPriceDialog = false;
    this.submitted = false;
  }

  saveItemPrice() {
    this.submitted = true;

    if (this.itemPrice.id) {
      this.itemPriceService.updateItemPrice(this.itemPrice).subscribe(() => {
        this.itemPrices[this.findIndexById(this.itemPrice.id)] = this.itemPrice;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Price Updated',
          life: 3000,
        });
        this.itemPrices = [...this.itemPrices];
        this.itemPriceDialog = false;
        this.itemPrice = {} as ItemPrice;
      });
    } else {
      this.itemPriceService.addItemPrice(this.itemPrice).subscribe((id) => {
        this.itemPrice.id = id;
        this.itemPrices.push(this.itemPrice);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Price Created',
          life: 3000,
        });
        this.itemPrices = [...this.itemPrices];
        this.itemPriceDialog = false;
        this.itemPrice = {} as ItemPrice;
      });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.itemPrices.length; i++) {
      if (this.itemPrices[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
