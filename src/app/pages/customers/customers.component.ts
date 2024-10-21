import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [MessageService],
})
export class CustomersComponent implements OnInit {
  customerDialog: boolean = false;
  deleteCustomerDialog: boolean = false;
  deleteCustomersDialog: boolean = false;
  customers: Customer[] = [];
  customer: Customer = {} as Customer;
  selectedCustomers: Customer[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  totalRecords: number = 0;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadCustomers();

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'telNumber', header: 'Tel Number' },
      { field: 'email', header: 'Email' },
      { field: 'address', header: 'Address' },
    ];
  }

  loadCustomers(
    filter: string = '',
    page: number = 1,
    size: number = this.rowsPerPageOptions[0]
  ) {
    this.customerService.getPagedCustomers(filter, page, size).subscribe({
      next: (res) => {
        if (res) {
          this.customers = res.items;
          this.totalRecords = res.totalItems;
        } else {
          this.customers = [];
          console.warn('Expected an array but received:', res);
        }
      },
      error: (err) => {
        console.error('Error loading customers:', err);
        this.customers = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customers',
          life: 3000,
        });
      },
    });
  }

  openNew() {
    this.customer = {} as Customer;
    this.submitted = false;
    this.customerDialog = true;
  }

  deleteSelectedCustomers() {
    this.deleteCustomersDialog = true;
  }

  editCustomer(customer: Customer) {
    this.customer = { ...customer };
    this.customerDialog = true;
  }

  deleteCustomer(customer: Customer) {
    this.deleteCustomerDialog = true;
    this.customer = { ...customer };
  }

  confirmDeleteSelected() {
    this.deleteCustomersDialog = false;
    this.selectedCustomers.forEach((customer) => {
      this.customerService.deleteCustomer(customer.id).subscribe(() => {
        this.customers = this.customers.filter((val) => val.id !== customer.id);
      });
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Customers Deleted',
      life: 3000,
    });
    this.selectedCustomers = [];
  }

  confirmDelete() {
    this.deleteCustomerDialog = false;
    this.customerService.deleteCustomer(this.customer.id).subscribe(() => {
      this.customers = this.customers.filter(
        (val) => val.id !== this.customer.id
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Customer Deleted',
        life: 3000,
      });
      this.customer = {} as Customer;
    });
  }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }

  saveCustomer() {
    this.submitted = true;

    if (this.customer.id) {
      this.customerService.updateCustomer(this.customer).subscribe(() => {
        this.customers[this.findIndexById(this.customer.id)] = this.customer;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customer Updated',
          life: 3000,
        });
        this.customers = [...this.customers];
        this.customerDialog = false;
        this.customer = {} as Customer;
      });
    } else {
      this.customerService.addCustomer(this.customer).subscribe((id) => {
        this.customer.id = id;
        this.customers.push(this.customer);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customer Created',
          life: 3000,
        });
        this.customers = [...this.customers];
        this.customerDialog = false;
        this.customer = {} as Customer;
      });
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id === id) {
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
    this.loadCustomers(filterValue, first / rows + 1, rows);
  }
}
