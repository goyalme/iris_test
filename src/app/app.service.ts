import { Injectable } from "@angular/core";
import { Row } from './app.model';

@Injectable()
export class AppService{

  getTableData(tableConfig:any){

  }

  createGroupData(rowNumber,tableColumns): Row[] {
    let rows : Row[] = [];
    for(let rowNum=1; rowNum<=rowNumber ;rowNum++){
      let row = new Row();
      //row.rowName = "R" + rowNum;
      tableColumns.forEach(col =>{
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
}
