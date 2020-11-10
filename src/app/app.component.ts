import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


import {Group, Row} from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'sample-app';
  groupDataSource:MatTableDataSource<Group>;
  groupTableColumns: any[];
  groupDataTableColumn: string[];
  groupTableData:Group[];
  tableConfig = {
    groupNumber:4,
    columnNumber:17,
    rowNumber:49
  }

  constructor(public appService:AppService){

  }
  ngOnInit(){
    this.groupTableColumns = ["groupName","groupData"];
    this.groupDataTableColumn = ["rowName"];
    for(let colNum=1; colNum<= this.tableConfig.columnNumber; colNum++){
      let colName = "S" + colNum;
      this.groupDataTableColumn.push(colName);
    }
    let tableData = []
    for(let groupNum=1; groupNum<=this.tableConfig.groupNumber; groupNum++){
      //create group
      let group = this.createGroup(groupNum);

      // Add To group data Source
      tableData.push(group);

    }
    this.groupTableData = tableData
    this.groupDataSource = new MatTableDataSource(tableData);


  }

  private createGroup(groupNum: number) {
    let group = new Group();
    group.groupName = "G" + groupNum;
    //create groupData
    let initialRows = this.appService.createGroupData(this.tableConfig.rowNumber,this.groupDataTableColumn);
    group.groupData = new MatTableDataSource(initialRows);
    group.columnTotal = new Row();
    this.groupDataTableColumn.forEach(colName => {
      if (colName === "rowName") {
        group.columnTotal[colName] = "Total";
      } else {
        group.columnTotal[colName] = this.getColumnTotal(colName, group.groupData.data);
      }
    });
    return group;
  }

  createGroupData(): Row[] {
    let rows : Row[] = [];
    for(let rowNum=1; rowNum<=this.tableConfig.rowNumber ;rowNum++){
      let row = new Row();
      //row.rowName = "R" + rowNum;
      this.groupDataTableColumn.forEach(col =>{
        if(col !== "rowName"){
          row[col]=0.0;
        }else{
          row[col] = "R" + rowNum;
        }
      })
      rows.push(row)
    }
    return rows;
  }

  calcColumnTotal(colName,group){
    group.columnTotal[colName] =  this.getColumnTotal(colName,group.groupData.data);
    this.groupDataSource._updateChangeSubscription();
    //this.groupDataSource.refresh()
  }

  getColumnTotal(colName,groupData){

    let colData= groupData.map(row => parseFloat(row[colName]));
    let total = colData.reduce(function(a, b)
    {
        return a + b;
    });
    return total;
  }


}
