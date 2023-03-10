import React, { useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import Wine from "../../assets/winee.png";
import "./Cards.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import accounting from "accounting";

export const notify = () =>
  toast("┬íProducto agregado al carrito!", {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const AddToCart = styled(Button)({
  textTransform: "none",
  fontSize: 12,
});

const Card = ({ product }) => {
  const { id, name, img, price, stock } = product && product;
  const stateCart = useSelector((state) => state.root.cart);
  const [amount, setAmount] = useState(
    stateCart && stateCart.find((e) => e.id === id)
      ? stateCart.find((e) => e.amount)
      : 1
  );

  // stateCart && stateCart.find((e) => e.id === id)
  //   ? stateCart.find((e) => e.id === id).amount
  //   : 1

  useEffect(() => {
    if (stateCart) {
      stateCart.find((e) => (e.id === id ? setAmount(e.amount) : 0));
    } else {
      console.log("no hay");
    }
  }, [stateCart]);

  const dispatch = useDispatch();

  const handleAdd = (e) => {
    if (!e.target.value) {
      return;
    }
    dispatch(addToCart({ ...product, amount }));
    notify();
  };

  const handleClick = (e) => {
    if (e === "rest") {
      setAmount(amount - 1);
    } else {
      setAmount(amount + 1);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="main-container">
        <div onClick={() => navigate(`/product/${id}`)}>
          <div className="img-box">
            <img className="image" src={img ? img : Wine} alt="not found" />
          </div>
          <div className="price">{accounting.formatMoney(price)}</div>
          <div className="name">
            <h4 className="name-tag">{name}</h4>
          </div>
        </div>

        <div className="sub-add">
          <IconButton
            color="secondary"
            sx={{ color: "#52373c" }}
            disabled={amount === 1}
            onClick={() => {
              handleClick("rest");
            }}
          >
            <IndeterminateCheckBoxRoundedIcon sx={{ fontSize: "2.6rem" }} />
          </IconButton>
          <input
            type="number"
            className="input"
            value={amount}
            style={{
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid #bdbdbd",
              width: "80%",
            }}
          />
          <IconButton
            disabled={amount >= stock}
            sx={{ color: "#52373c" }}
            color="secondary"
            onClick={() => {
              handleClick("add");
            }}
          >
            <AddBoxRoundedIcon sx={{ fontSize: "2.6rem" }} />
          </IconButton>
        </div>
        <div className="add-btn">
          <AddToCart
            variant="contained"
            color="secondary"
            startIcon={<ShoppingCartOutlinedIcon />}
            value={id}
            onClick={(e) => handleAdd(e)}
            sx={{ backgroundColor: "#52373c", width: "100%" }}
          >
            Agregar
          </AddToCart>
        </div>
      </div>
    </div>
  );
};

export default Card;
