import React from 'react';
import './App.css';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

class App extends React.Component {

  public remoteDatasource : DataManager = new DataManager (
    {
      url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
      adaptor: new ODataV4Adaptor,
      crossDomain: true
    }
  );
  public dataQuery : Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
  public subNodeDataQuery : Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
  public remoteDataFields : Object = {
    dataSource: this.remoteDatasource, query: this.dataQuery, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
    child: { dataSource: this.remoteDatasource, query: this.subNodeDataQuery, id: 'OrderID', text: 'ShipName', parentID: 'EmployeeID'}
  };
  public hierarchicalData : Object[] =[
    { id: '01', name: 'Local Disk (C:)', expanded: true,
    subChild: [
      { id: '01-01', name: 'Program Files', expanded: true,
      subChild: [
        { id: '01-01-01', name: '7-Zip' },
        { id: '01-01-02', name: 'Git' },
        { id: '01-01-03', name: 'IIS Express' }
      ]
      },
      { id: '01-02', name: 'Users', expanded: true,
      subChild: [
        { id: '01-02-01', name: 'Smith' },
        { id: '01-02-02', name: 'Admin' }
       ]
      },
      { id: '01-03', name: 'Windows', 
      subChild: [
        { id: '01-03-01', name: 'FileManager' } 
       ]
      }
    ]
    },
    { id: '02', name: 'Local Disk (D:)',
    subChild: [
      { id: '02-01', name: 'Personals' },
      { id: '02-02', name: 'Projects' }
     ]
    },
    { id: '03', name: 'Local Disk (E:)',
    subChild: [
      { id: '03-01', name: 'Pictures' }, 
      { id: '03-02', name: 'Documents' } 
     ]
    }
  ];
  public datasourceFields: Object = {
    dataSource: this.hierarchicalData, id: 'id', text: 'name', child: 'subChild'
  };
  public enableMultiSelection: boolean = true;
  public enableCheckbox: boolean = true;
  public allowNodeEditing: boolean = true;
  public draganddropNodes: boolean = true;
  render() {
    return ( <TreeViewComponent fields={this.datasourceFields} 
      allowMultiSelection={this.enableMultiSelection}
      showCheckBox={this.enableCheckbox}
      allowEditing={this.allowNodeEditing}
      allowDragAndDrop={this.draganddropNodes}></TreeViewComponent>); 
  }
}

export default App;
