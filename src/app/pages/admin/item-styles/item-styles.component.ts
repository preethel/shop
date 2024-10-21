import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ItemStyle } from '../../models/item-style';
import { ItemStyleService } from '../../../services/item-style.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-item-styles',
  templateUrl: './item-styles.component.html',
  styleUrl: './item-styles.component.scss',
  providers: [MessageService],
})
export class ItemStylesComponent implements OnInit {
  expandedRows: expandedRows = {};

  itemStyleDialog: boolean = false;
  deleteItemStyleDialog: boolean = false;
  deleteItemStylesDialog: boolean = false;
  itemStyles: ItemStyle[] = [];
  itemStyle: ItemStyle = {} as ItemStyle;
  selectedItemStyles: ItemStyle[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  totalRecords: number = 0;
  createItemStyle = false;
  constructor(
    private itemStyleService: ItemStyleService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadItemStyles();
    this.cols = [
      { field: 'displayName', header: 'Display Name' },
      { field: 'itemCategory', header: 'Item Category' },
      { field: 'sizeType', header: 'Size Type' },
      { field: 'externalId', header: 'External ID' },
      // { field: 'price', header: 'Price' },
      // { field: 'boyPrice', header: 'Boy Price' },
      // { field: 'babyPrice', header: 'Baby Price' },
    ];
  }

  loadItemStyles() {
    let itemCategoryId = '';
    let includePrices = true;
    this.itemStyleService
      .getAllItemStyles(includePrices, itemCategoryId)
      .subscribe(
        //   (data) => {
        //   this.itemStyles = data.Items;
        //   this.totalRecords = data.TotalRecords;
        // }
        {
          next: (res) => {
            if (res) {
              this.itemStyles = res;
              this.totalRecords = res.length;
            }
          },
          error: (err) => {
            console.log(err);
          },
        }
      );
  }

  openNew() {
    this.itemStyle = {} as ItemStyle;
    this.submitted = false;
    this.itemStyleDialog = true;
    this.createItemStyle = true;
  }

  deleteSelectedItemStyles() {
    this.deleteItemStylesDialog = true;
  }

  editItemStyle(itemStyle: ItemStyle) {
    this.createItemStyle = false;
    this.itemStyle = { ...itemStyle };
    this.itemStyleDialog = true;
  }

  deleteItemStyle(itemStyle: ItemStyle) {
    this.deleteItemStyleDialog = true;
    this.itemStyle = { ...itemStyle };
  }

  confirmDeleteSelected() {
    this.deleteItemStylesDialog = false;
    this.selectedItemStyles.forEach((itemStyle) => {
      this.itemStyleService.deleteItemStyle(itemStyle.id).subscribe(() => {
        this.itemStyles = this.itemStyles.filter(
          (val) => val.id !== itemStyle.id
        );
      });
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Item Prices Deleted',
      life: 3000,
    });
    this.selectedItemStyles = [];
  }

  confirmDelete() {
    this.deleteItemStyleDialog = false;
    this.itemStyleService.deleteItemStyle(this.itemStyle.id).subscribe(() => {
      this.itemStyles = this.itemStyles.filter(
        (val) => val.id !== this.itemStyle.id
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Item Price Deleted',
        life: 3000,
      });
      this.itemStyle = {} as ItemStyle;
    });
  }

  hideDialog() {
    this.itemStyleDialog = false;
    this.submitted = false;
  }

  saveItemStyle() {
    this.submitted = true;

    if (this.itemStyle.id) {
      this.itemStyleService.updateItemStyle(this.itemStyle).subscribe(() => {
        this.itemStyles[this.findIndexById(this.itemStyle.id)] = this.itemStyle;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Price Updated',
          life: 3000,
        });
        this.itemStyles = [...this.itemStyles];
        this.itemStyleDialog = false;
        this.itemStyle = {} as ItemStyle;
      });
    } else {
      this.itemStyleService.addItemStyle(this.itemStyle).subscribe((id) => {
        this.itemStyle.id = id;
        this.itemStyles.push(this.itemStyle);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Price Created',
          life: 3000,
        });
        this.itemStyles = [...this.itemStyles];
        this.itemStyleDialog = false;
        this.itemStyle = {} as ItemStyle;
      });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.itemStyles.length; i++) {
      if (this.itemStyles[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const first = table.first ?? 0;
    const rows = table.rows ?? this.rowsPerPageOptions[0];
    this.loadItemStyles();
  }
}
interface expandedRows {
  [key: string]: boolean;
}
