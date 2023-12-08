import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

function CustomerDialog({ customer, handleChange }) {
  const renderTextField = (label, name) => (
    <TextField
      margin="dense"
      label={label}
      name={name}
      fullWidth
      variant="standard"
      value={customer[name]}
      onChange={handleChange}
    />
  );

  return (
    <DialogContent>
      {renderTextField('First name', 'firstname')}
      {renderTextField('Last name', 'lastname')}
      {renderTextField('Street address', 'streetaddress')}
      {renderTextField('Post code', 'postcode')}
      {renderTextField('City', 'city')}
      {renderTextField('Email', 'email')}
      {renderTextField('Phone', 'phone')}
    </DialogContent>
  );
}

export default CustomerDialog;
