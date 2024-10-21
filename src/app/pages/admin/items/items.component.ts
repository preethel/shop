import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Item } from '../../models/item';
import { ItemService } from '../../../services/item.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  providers: [MessageService],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  selectedItems: Item[] = [];
  itemDialog: boolean = false;
  deleteItemsDialog: boolean = false;
  item: Item = {} as Item;
  cols: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'itemStyleId', header: 'Item Style ID' },
      { field: 'isDamaged', header: 'Is Damaged' },
    ];
    this.loadItems('', 0, 10);
  }

  loadItems(filter: string, page: number, size: number) {
    this.itemService.getPagedItems(filter, page, size).subscribe((data) => {
      if (data) {
        this.items = data;
      }
    });
  }

  openNew() {
    this.item = {} as Item;
    this.itemDialog = true;
  }

  editItem(item: Item) {
    this.item = { ...item };
    this.itemDialog = true;
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item.id).subscribe(() => {
      this.loadItems('', 0, 10);
    });
  }

  deleteSelectedItems() {
    const ids = this.selectedItems.map((item) => item.id);
    ids.forEach((id) =>
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems('', 0, 10);
      })
    );
    this.deleteItemsDialog = false;
  }

  saveItem() {
    if (this.item.id) {
      this.itemService.updateItem(this.item).subscribe(() => {
        this.loadItems('', 0, 10);
        this.itemDialog = false;
      });
    } else {
      this.itemService.addItem(this.item).subscribe(() => {
        this.loadItems('', 0, 10);
        this.itemDialog = false;
      });
    }
  }

  hideDialog() {
    this.itemDialog = false;
  }

  confirmDeleteItems() {
    this.deleteSelectedItems();
  }

  onGlobalFilter(table: any, event: Event) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }
}
