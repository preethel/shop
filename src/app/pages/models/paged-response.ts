export class PagedResponse<T> {
  Items: T[];
  TotalRecords: number;
  CurrentPage: number;
  PageSize: number;

  constructor(items: T[], totalRecords: number, currentPage: number, pageSize: number) {
    this.Items = items;
    this.TotalRecords = totalRecords;
    this.CurrentPage = currentPage;
    this.PageSize = pageSize;
  }
}
