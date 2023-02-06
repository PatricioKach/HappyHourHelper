import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  changeAmount,
  removeFromCart,
} from "../../redux/actions/actions.js";
import { Image, SubAdd } from "../../components/RowCart/RowCart.styles.js";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import accounting from "accounting";

const RowCart = ({ img, name, price, has_discount, amount }) => {
  const dispatch = useDispatch();
  const [am, setAm] = useState(amount);

  const subtot = price * am;

  const handleClick = (e) => {
    if (e === "rest") {
      dispatch(changeAmount({ am: am - 1, name }));
      setAm(am - 1);
    } else {
      setAm(am + 1);
      dispatch(changeAmount({ am: am + 1, name }));
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell
        component="th"
        value="name"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <DeleteIcon onClick={() => dispatch(removeFromCart(name))} />
        {name}
        <Image src={img} />
      </TableCell>
      <TableCell align="right" value="price">
        {accounting.formatMoney(price)}
      </TableCell>
      <TableCell align="right" value="quantity">
        <SubAdd>
          <IconButton
            color="secondary"
            type="text"
            disabled={am === 1}
            onClick={() => {
              handleClick("rest");
            }}
          >
            -
          </IconButton>
          <input type="number" className="input" value={am} />
          <IconButton
            color="secondary"
            onClick={() => {
              handleClick("add");
            }}
          >
            +
          </IconButton>
        </SubAdd>
      </TableCell>
      <TableCell align="right" value="subtotal">
        {accounting.formatMoney(subtot)}
      </TableCell>
      {/* <TableCell align="right" value="total">
        {accounting.formatMoney(totalConDesc())}
      </TableCell> */}
    </TableRow>
  );
};

export default RowCart;
