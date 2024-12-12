import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter, ViewChildren } from '@angular/core';
import { colType, ColumnDefinition } from '../../classes/BaseGridColumn';
import {MatCell, MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-base-grid',
  standalone: true,
  imports: [MatTableModule, MatTable, MatPaginator,MatSort, MatCell, MatToolbarModule, MatSortModule, CommonModule],
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss']
})
export class BaseGridComponent implements OnInit, AfterViewInit{
@ViewChild(MatTable) table!: MatTable<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChildren('DefaultCol') stretchedCols!: MatCell[];

@Input() public title?: string;
@Input() public columnsDefinitions: ColumnDefinition[] = []; 
@Input() public TableData: any[] = [];


@Output() public doubleClick: EventEmitter<any> = new EventEmitter();

 public columnList: string[] = [];
 public dataSource: MatTableDataSource<any> = new MatTableDataSource();
 public types = colType;

 ngOnInit(): void {
  
  if(!this.columnsDefinitions.some(x=>true)){
    this.columnList = Object.keys(this.TableData[0]);
    this.columnList.forEach(col => {
      this.columnsDefinitions.push({
        colId: col,
        header: col,
        colType: colType.string,
      });     
  });
}
else{
  this.columnsDefinitions.forEach(x=>{
    this.columnList.push(Object.keys(this.TableData[0]).find(y=>y == x.colId) ?? "");
  });
}


this.columnsDefinitions.forEach(colum => {
  colum.colType = colum.colType ?? colType.string;
});

  this.dataSource = new MatTableDataSource<any>(this.TableData);
  this.dataSource.sortingDataAccessor = (data, headerId)=>{
    return data[this.columnsDefinitions.find(x=>x.header==headerId)?.colId ?? headerId]
  };

  
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

doubleClickEmitter (row: any) {
  this.doubleClick.emit(row);
}


public refreshTable(){
  this.table.renderRows();
}

}


