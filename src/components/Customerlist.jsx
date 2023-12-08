import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddCustomer from './Addcustomer';

const Customerlist = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => {
        const customerData = data.content.map(customerInfo => ({
          ...customerInfo,
          customerHref: customerInfo.links.find(link => link.rel === "self").href,
        }));

        setCustomers(customerData);
      });

  }, []);

  const deleteCustomer = (link) => {
    console.log('Delete button clicked with link:', link);
  };

  const columns = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'streetaddress', headerName: 'Street address', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'city', headerName: 'City', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, suppressFilterButton: true },
    { field: '_links.self.href', headerName: 'Actions', cellRenderer: (params) => <button onClick={() => deleteCustomer(params.value)}>Delete</button> },
  ];

  return (
    <>
      <AddCustomer />
      <div className="ag-theme-alpine" style={{ height: 600, width: '200%' }}>
        <AgGridReact columnDefs={columns} rowData={customers} pagination={true} paginationAutoPageSize={true} />
      </div>
    </>
  );
};

export default Customerlist;
