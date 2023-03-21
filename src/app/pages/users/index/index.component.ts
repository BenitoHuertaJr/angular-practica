import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationParams } from 'src/app/interfaces/PaginationParams';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ElectronService } from 'src/app/services/electron.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

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

  displayedColumns: string[] = ['image_link', 'id', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<User, MatPaginator> = new MatTableDataSource<User, MatPaginator>([]);

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.dataSource = new MatTableDataSource<User, MatPaginator>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
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

    this.userService.all(params).subscribe({
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
    this.getUsers();
  }

  announceSortChange(sortState: Sort) {

    this.sortBy = sortState.active;
    this.sortDirection = sortState.direction;

    this.getUsers();
  }

  refreshUsers() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.sortBy = '';
    this.sortDirection = '';

    this.getUsers();
  }

  goToEditPage(id: any) {
    this.router.navigateByUrl('/users/' + id + '/edit');
  }

  deleteUser(id: any) {
    this.electronService.confirm('Eliminar usuario', '¿Estás seguro? No se podrán revertir los cambios').then(confirm => {
      if (confirm) {
        this.userService.delete(id).subscribe({
          next: () => {
            this.refreshUsers();
          }
        });
      }
    });
  }
}
