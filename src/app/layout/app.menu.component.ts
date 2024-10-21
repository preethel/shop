import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },
          {
            label: 'Appointment',
            icon: 'pi pi-calendar',
            routerLink: ['/appointments'],
          },
          { label: 'Customer', icon: 'pi pi-user', routerLink: ['/customers'] },
        ],
      },
      {
        label: 'Rentals',
        items: [
          {
            label: 'Wedding',
            icon: 'pi pi-arrow-right-arrow-left',
            routerLink: ['rentals/weddings'],
          },
          {
            label: 'Individual',
            icon: 'pi pi-id-card',
            routerLink: ['rentals/individuals'],
          },
          {
            label: 'Gown',
            icon: 'pi pi-gift',
            routerLink: ['rentals/gowns'],
          },
        ],
      },
      // {
      //   label: 'Sales',
      //   items: [
      //     {
      //       label: 'Transaction',
      //       icon: 'pi pi-arrow-right-arrow-left',
      //       routerLink: ['/index'],
      //     },
      //     {
      //       label: 'Refunds',
      //       icon: 'pi pi-wallet',
      //       routerLink: ['/index'],
      //     },
      //     {
      //       label: 'Payouts',
      //       icon: 'pi pi-credit-card',
      //       routerLink: ['/index'],
      //     },
      //   ],
      // },
      {
        label: 'Admin',
        items: [
          {
            label: 'Manage Items',
            icon: 'pi pi-user-edit',
            // routerLink: ['admin/items'],
            items: [
              {
                label: 'Items',
                icon: 'pi pi-users',
                routerLink: ['admin/items'],
              },
              {
                label: 'Item Styles',
                icon: 'pi pi-users',
                routerLink: ['admin/item-styles'],
              },
            ],
          },
          { label: 'Users', icon: 'pi pi-users', routerLink: ['admin/users'] },
        ],
      },
      //   {
      //     label: 'Prime Blocks',
      //     items: [
      //       {
      //         label: 'Free Blocks',
      //         icon: 'pi pi-fw pi-eye',
      //         routerLink: ['/blocks'],
      //         badge: 'NEW',
      //       },
      //       {
      //         label: 'All Blocks',
      //         icon: 'pi pi-fw pi-globe',
      //         url: ['https://www.primefaces.org/primeblocks-ng'],
      //         target: '_blank',
      //       },
      //     ],
      //   },
      //   {
      //     label: 'Utilities',
      //     items: [
      //       {
      //         label: 'PrimeIcons',
      //         icon: 'pi pi-fw pi-prime',
      //         routerLink: ['/utilities/icons'],
      //       },
      //       {
      //         label: 'PrimeFlex',
      //         icon: 'pi pi-fw pi-desktop',
      //         url: ['https://www.primefaces.org/primeflex/'],
      //         target: '_blank',
      //       },
      //     ],
      //   },
      //   {
      //     label: 'Pages',
      //     icon: 'pi pi-fw pi-briefcase',
      //     items: [
      //       {
      //         label: 'Landing',
      //         icon: 'pi pi-fw pi-globe',
      //         routerLink: ['/landing'],
      //       },
      //       {
      //         label: 'Auth',
      //         icon: 'pi pi-fw pi-user',
      //         items: [
      //           {
      //             label: 'Login',
      //             icon: 'pi pi-fw pi-sign-in',
      //             routerLink: ['/auth/login'],
      //           },
      //           {
      //             label: 'Error',
      //             icon: 'pi pi-fw pi-times-circle',
      //             routerLink: ['/auth/error'],
      //           },
      //           {
      //             label: 'Access Denied',
      //             icon: 'pi pi-fw pi-lock',
      //             routerLink: ['/auth/access'],
      //           },
      //         ],
      //       },
      //       {
      //         label: 'Crud',
      //         icon: 'pi pi-fw pi-pencil',
      //         routerLink: ['/pages/crud'],
      //       },
      //       {
      //         label: 'Timeline',
      //         icon: 'pi pi-fw pi-calendar',
      //         routerLink: ['/pages/timeline'],
      //       },
      //       {
      //         label: 'Not Found',
      //         icon: 'pi pi-fw pi-exclamation-circle',
      //         routerLink: ['/notfound'],
      //       },
      //       {
      //         label: 'Empty',
      //         icon: 'pi pi-fw pi-circle-off',
      //         routerLink: ['/pages/empty'],
      //       },
      //     ],
      //   },
      //   {
      //     label: 'Hierarchy',
      //     items: [
      //       {
      //         label: 'Submenu 1',
      //         icon: 'pi pi-fw pi-bookmark',
      //         items: [
      //           {
      //             label: 'Submenu 1.1',
      //             icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //               { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
      //               { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
      //               { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
      //             ],
      //           },
      //           {
      //             label: 'Submenu 1.2',
      //             icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //               { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
      //             ],
      //           },
      //         ],
      //       },
      //       {
      //         label: 'Submenu 2',
      //         icon: 'pi pi-fw pi-bookmark',
      //         items: [
      //           {
      //             label: 'Submenu 2.1',
      //             icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //               { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
      //               { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
      //             ],
      //           },
      //           {
      //             label: 'Submenu 2.2',
      //             icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //               { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     label: 'Get Started',
      //     items: [
      //       {
      //         label: 'Documentation',
      //         icon: 'pi pi-fw pi-question',
      //         routerLink: ['/documentation'],
      //       },
      //       {
      //         label: 'View Source',
      //         icon: 'pi pi-fw pi-search',
      //         url: ['https://github.com/primefaces/sakai-ng'],
      //         target: '_blank',
      //       },
      //     ],
      //   },
    ];
  }
}
