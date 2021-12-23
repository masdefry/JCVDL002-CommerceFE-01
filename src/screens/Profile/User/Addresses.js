import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import classes from "./Address.module.css";
// import Button from "@mui/material/Button";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createAddress, listAddresses, updateDefaultAddress } from "../../../actions/userAction";

const Addresses = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listAddress = useSelector((state) => state.listAddress);
  const { addresses } = listAddress;

  useEffect(() => {
    dispatch(listAddresses())
  }, []);

  const saveAddressHandler = (e) => {
    e.preventDefault();
    const dataAddress = {
      address: address,
      is_default: "0",
      idusers : userInfo.id
    }
    dispatch(createAddress(dataAddress));
    setAddress("")
  };

  const setDefaultAddress = (id) => {
    if (window.confirm("Are you sure?")) {
      const dataAddress = {
        idaddress: id
      }
      dispatch(updateDefaultAddress(dataAddress));
    }
    
  };

  let addressTemp;
  if (addresses) {
    if (addresses.length === 0) {
      addressTemp = (
        <>
          <Typography variant="h4" gutterBottom component="div">
            Add a new Address
          </Typography>
          <form onSubmit={saveAddressHandler}>
            <TextField
              fullWidth
              label="Address"
              variant="filled"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br /><br />
            <Button type="submit" className="btn-sm btn-success">
              Add new Address
            </Button>
            <br /><br />
          </form>
          <h1>No Address, make a new Address now!</h1>
        </>
      );
    } else {
      addressTemp = (
        <div className={classes.wrapper}>
          <Typography variant="h4" gutterBottom component="div">
            Add a new Address
          </Typography>
          <form onSubmit={saveAddressHandler}>
            <TextField
              fullWidth
              label="Address"
              variant="filled"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br /><br />
            <Button type="submit" className="btn-sm btn-success">
              Add new Address
            </Button>
            <br /><br />
          </form>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NO</th>
                <th>ADDRESS</th>
                <th>IS DEFAULT</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{address.address}</td>
                  <td>
                    <Button 
                      className={address.is_default == 1 ? "btn-sm btn-danger" : " btn-sm  "} 
                      disabled={address.is_default == 1}
                      onClick={() => setDefaultAddress(address.idaddress)}>Set Default</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
  return (
    <>
      <div>{addressTemp}</div>
    </>
  );
};

export default Addresses;
