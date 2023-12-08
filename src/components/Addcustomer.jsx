import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CustomerDialog from "./customerdialog";

function Addcustomer() {
  const initialCustomerState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  };

  const [customer, setCustomer] = useState(initialCustomerState);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const saveCustomer = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error when adding customer: " + response.statusText);
        }
      })
      .catch((err) => console.error(err));

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Addcustomer;
