import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';
import "../App.css";

const Traininglist = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('http://traineeapp.azurewebsites.net/api/trainings');
        const data = await response.json();

        const trainingData = await Promise.all(
          data.content.map(async training => {
            const customerHref = training.links.find(link => link.rel === 'customer').href;
            const customerResponse = await fetch(customerHref);
            const customerData = await customerResponse.json();

            return {
              id: training.id,
              date: dayjs(training.date).format('DD/MM/YYYY HH:mm'),
              duration: training.duration,
              activity: training.activity,
              customerName: `${customerData.firstname} ${customerData.lastname}`,
            };
          })
        );

        console.log('Processed Training Data:', trainingData);

        setTrainings(trainingData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchTrainings();
  }, []);
  const deleteTraining = (link) => {
    console.log('Delete button clicked with link:', link);
  };
  const columns = [
    { field: 'date', headerName: 'Date and time', sortable: true, filter: 'agTextColumnFilter' },
    { width: 160, field: 'duration', headerName: 'Duration (min)', sortable: true, filter: 'agTextColumnFilter' },
    { width: 170, field: 'activity', headerName: 'Activity', sortable: true, filter: 'agTextColumnFilter' },
    { width: 170, field: 'customerName', headerName: 'Customer', sortable: true, filter: 'agTextColumnFilter' },
    {field: '_links.self.href', headerName: 'Actions', cellRenderer: (params) => <button onClick={() => deleteTraining(params.value)}>Delete</button> },

  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact columnDefs={columns} rowData={trainings} pagination={true} />
    </div>
  );
};

export default Traininglist;
