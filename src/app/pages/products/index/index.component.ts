
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PaginationParams } from 'src/app/interfaces/PaginationParams';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 30, 40, 50, 100, 200];
  length: number = 0;

  sortBy: string = '';
  sortDirection: string = '';

  search: string = '';

  displayedColumns: string[] = ['image_link', 'name', 'price', 'bar_code', 'sub_category_name', 'actions'];
  dataSource: MatTableDataSource<Product, MatPaginator> = new MatTableDataSource<Product, MatPaginator>([]);

  loading: boolean = false;

  backButtonText: string = '';

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.dataSource = new MatTableDataSource<Product, MatPaginator>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducts() {

    this.loading = true;

    let params: PaginationParams = {
      page: this.pageIndex + 1,
      per_page: this.pageSize,
    }

    if (this.sortBy || this.sortBy !== '') {
      params.sort_by = this.sortBy;
    }

    if (this.sortDirection || this.sortDirection !== '') {
      params.sort_direction = this.sortDirection;
    }

    if (this.search || this.search !== '') {
      params.search = this.search;

      if (!isNaN(Number(this.search)) && this.search.length > 10) {
        params.search_by = 'bar_code';
      }
    }

    this.productService.all(params).subscribe({
      next: (resp) => {
        this.dataSource = new MatTableDataSource(resp.data);
        this.paginator.length = resp.total;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }

  announceSortChange(sortState: Sort) {

    this.sortBy = sortState.active;
    this.sortDirection = sortState.direction;

    this.getProducts();
  }

  clearSearchProducts() {
    this.search = '';
    this.getProducts();
  }

  refreshProducts() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.search = '';
    this.sortBy = '';
    this.sortDirection = '';

    this.getProducts();
  }
}

