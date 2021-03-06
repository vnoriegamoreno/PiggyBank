import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { income } from "../../mock";

const currency = require("currency.js");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: "scroll"
  },
  hover: {
    cursor: "pointer"
  },
  newIncome: {
    background: "silver"
  },
  inputStyle: {
    border: "0px",
    padding: "5px",
    width: "80px"
  },
  optionStyle: {
    border: "0px",
    padding: "5px",
    width: "100px"
  }
});

const Expenses = () => {
  const classes = useStyles();
  const [incomeState, setIncomeState] = useState([]);
  const [newIncomeState, setNewIncomeState] = useState([]);
  useEffect(() => {
    setIncomeState(income);
  }, []);

  const addIncomeHandler = () => {
    if (newIncomeState.length === 0) {
      setNewIncomeState([
        {
          id: uuid(),
          amount: 0,
          date: moment(new Date()).format("MM/DD/YYYY"),
          company: "",
          bankId: "ba15fff7-1575-4778-95d7-e1dfebfe4558"
        }
      ]);
    } else {
      alert(`Can't add more incomes until you saved the current income`);
    }
  };

  const onChangeNewIncomeHandler = (e) => {
    let value = e.target.value;
    switch (e.target.id) {
      case "amount":
        setNewIncomeState((prevState) => [{ ...prevState[0], amount: value }]);
        break;
      case "date":
        setNewIncomeState((prevState) => [{ ...prevState[0], date: value }]);
        break;
      case "company":
        setNewIncomeState((prevState) => [{ ...prevState[0], company: value }]);
        break;
      default:
        break;
    }
  };

  const onDeleteNewIncomeHandler = () => {
    setNewIncomeState([]);
  };

  const onMergeNewIncomeHandler = () => {
    setIncomeState((prevState) => [...prevState, newIncomeState[0]]);
    onDeleteNewIncomeHandler();
  };

  return (
    <div>
      <h1>Expenses</h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils}></MuiPickersUtilsProvider>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeState.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{currency(row.amount).format()}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.bankId}</TableCell>
                <TableCell align="center">
                  <EditIcon className={classes.hover} />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon className={classes.hover} />
                </TableCell>
              </TableRow>
            ))}
            {newIncomeState.length > 0 &&
              newIncomeState.map((newIncome) => (
                <TableRow key={newIncome.id} className={classes.newIncome}>
                  <TableCell>{newIncome.id}</TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={newIncome.amount}
                      id="amount"
                      onChange={onChangeNewIncomeHandler}
                      className={classes.inputStyle}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={newIncome.date}
                      id="date"
                      onChange={onChangeNewIncomeHandler}
                      className={classes.inputStyle}
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      id="company"
                      onChange={onChangeNewIncomeHandler}
                      className={classes.optionStyle}
                    >
                      <option value="" selected></option>
                      <option value="Company">Company</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </TableCell>
                  <TableCell>{newIncome.bankId}</TableCell>
                  <TableCell align="center">
                    <SaveIcon
                      className={classes.hover}
                      onClick={onMergeNewIncomeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteIcon
                      className={classes.hover}
                      onClick={onDeleteNewIncomeHandler}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan="7">
                <AddIcon className={classes.hover} onClick={addIncomeHandler} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Expenses;
