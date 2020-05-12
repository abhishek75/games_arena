import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardApiService } from '../shared/services/dashboard-api.service';
import { AlertService } from '@app/core';
import { Constants } from '../shared/constants/constants';
import { DashboardModel } from '../shared/models/dashboard.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnChanges, OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<DashboardModel.DashboardDataObjectType>([]);
  selection = new SelectionModel<DashboardModel.DashboardDataObjectType>(true, []);
  renderedData: DashboardModel.DashboardDataObjectType[];
  paginatorEvent: PageEvent;
  dashboardSetStatus = this.constants.FETCHING;
  pageSizeOptions = [10, 20, 50, 100];

  @Input() paginatorPageIndex: number;
  @Input() totalNumberOfDocuments: number;
  @Input() numberOfDocumentsShownPerPage: number;
  @Input() sets: DashboardModel.DashboardDataObjectType[];
  @Input() selected: DashboardModel.DashboardDataObjectType[];
  @Input() dashboardSetsResponseStatus: string;
  @Output() selectedChange = new EventEmitter<DashboardModel.DashboardDataObjectType[]>();
  @Output() paginatorPageChangeEvent: EventEmitter<PageEvent> = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  entityName:string;
  gamesList: DashboardModel.DashboardDataObjectType[] = [];
  sortKey: string = '';
  sortOrder: string = '';
  constructor(
    private router: Router,
    private dashboardApiService: DashboardApiService,
    private alertService: AlertService) {
  }

  ngOnInit() {
  }

  getSearchParams

  ngOnChanges(changes: SimpleChanges) {
    const pageIndexUpdate: SimpleChange = changes.paginatorPageIndex;
    const setUpdate: SimpleChange = changes.sets;
    const dashboardSetsResponseStatus: SimpleChange =  changes.dashboardSetsResponseStatus;
    if (pageIndexUpdate) {
      this.paginatorPageIndex = pageIndexUpdate.currentValue;
    }
    if (dashboardSetsResponseStatus) {
      this.dashboardSetsResponseStatus = dashboardSetsResponseStatus.currentValue;
    }
    if (setUpdate) {
      this.sets = setUpdate.currentValue;
      this.gamesList = [...this.sets];
      this.resetSorting();
      this.clearSearchInput();
    }
  }

  get constants() {
    return Constants;
  }

  paginatorChangeEvent(event: PageEvent) {
    this.paginatorEvent = event;
    this.paginatorPageIndex = this.paginatorEvent.pageIndex;
    this.paginatorPageChangeEvent.emit(event);
  }

  getOptionText(option: DashboardModel.DashboardDataObjectType) {
    if(option) {
      return option.title;
    }
  }

  searchFormChange(value) {
    this.gamesList = value.length >= 1 ? this.updateAutoCompleteOptions(value) : [...this.sets];
  }

  updateAutoCompleteOptions(searchValue: string){
    let autocompleteOptions = this.sets.filter((item: DashboardModel.DashboardDataObjectType) => {
      if(item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return item;
      }
     });
     return autocompleteOptions;
  }

  beginSearch(event: MatAutocompleteSelectedEvent) {
    this.gamesList = this.sets.filter((item: DashboardModel.DashboardDataObjectType) => {
      if(item.title.toLowerCase().includes(event.option.value.title.toLowerCase())) {
        return item;
      }
    })
  }

  clearSearchInput() {
    this.entityName = '';
    this.gamesList = [...this.sets]
  }

  sortChange(event: MatSelectChange) {
    if(event.value === 'asc') {
      this.gamesList = this.gamesList.sort((a,b) => {
        return a.score - b.score;
      })
    } else {
      this.gamesList = this.gamesList.sort((a,b) => {
        return b.score - a.score;
      })
    }
  }

  resetSorting() {
    this.sortKey = '';
    this.sortOrder = '';
  }
}

