import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Issue} from './models/issue';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] =
    ['passengerid', 'pClass', 'name', 'sex', 'age', 'sibsp', 'parch', 'ticket',
     'fare', 'cabin', 'embarked', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {dataKey: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, passengerid: number, pClass: number, name: string, sex: string, age: number,
    sibsp: number, parch: number, ticket: string, fare: number, cabin: string, embarked: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {passengerid: passengerid, pClass: pClass, name: name,
        sex: sex, age: age, sibsp: sibsp, parch: parch, ticket: ticket,
        fare: fare, cabin: cabin, embarked: embarked}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.passengerid === passengerid);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, passengerid: number, pClass: number, name: string, sex: string, age: number,
    sibsp: number, parch: number, ticket: string, fare: number, cabin: string, embarked: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {passengerid: passengerid, pClass: pClass, name: name,
        sex: sex, age: age, sibsp: sibsp, parch: parch, ticket: ticket,
        fare: fare, cabin: cabin, embarked: embarked}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.passengerid === passengerid);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {

          const searchStr = (issue.passengerid + issue.pClass +
                             issue.name + issue.sex + issue.age + issue.sibsp +
                             issue.parch + issue.ticket + issue.fare + issue.cabin +
                             issue.embarked).toLowerCase();

          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'passengerid': [propertyA, propertyB] = [a.passengerid, b.passengerid]; break;
        case 'pClass': [propertyA, propertyB] = [a.pClass, b.pClass]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'sex': [propertyA, propertyB] = [a.sex, b.sex]; break;
        case 'age': [propertyA, propertyB] = [a.age, b.age]; break;
        case 'sibsp': [propertyA, propertyB] = [a.sibsp, b.sibsp]; break;
        case 'parch': [propertyA, propertyB] = [a.parch, b.parch]; break;
        case 'ticket': [propertyA, propertyB] = [a.ticket, b.ticket]; break;
        case 'fare': [propertyA, propertyB] = [a.fare, b.fare]; break;
        case 'cabin': [propertyA, propertyB] = [a.cabin, b.cabin]; break;
        case 'embarked': [propertyA, propertyB] = [a.embarked, b.embarked]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
