import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled
} from "@mui/material";
import { Box, Modal, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBasketItemCount,
  clearBasket,
  removeItemFromBasket,
  setBasketOpened
} from "../store/slice/shop";

const StyledBox = styled(Box)`
  width: 400px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #acacac;
  box-shadow: 24px;
  padding: 8px;
  border-radius: 8px;
`;
export const BasketModal = (props) => {
  const dispatch = useDispatch();
  const { basketOpened, basket } = useSelector((state) => state.shop);

  const onBasketItemCountChange = useCallback(
    (product, increment) => {
      dispatch(changeBasketItemCount({ product, increment }));
    },
    [dispatch]
  );

  const totalPrice = basket.reduce(
    (price, item) => price + item.count + item.price,
    0
  );

  return (
    <Modal {...props} open={basketOpened}>
      <StyledBox>
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          <div style={{ display: "flex", paddingLeft: "340px" }}>
            <Button onClick={() => dispatch(setBasketOpened(false))}>x</Button>
          </div>
          Your Basket
        </Typography>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {basket.map((item, index) => (
            <>
              {index !== 0 && (
                <Divider
                  key={"divider_" + item.id}
                  variant="inset"
                  component="li"
                />
              )}
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemAvatar sx={{ mr: 1 }}>
                  <img
                    alt=""
                    src={item.image}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain"
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.title} x${item.count}`}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      ${item.price * item.count}
                      {item.count > 1 && <>(${item.price} per item)</>}
                    </Typography>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button onClick={() => onBasketItemCountChange(item, 1)}>
                    <KeyboardArrowUpIcon />
                  </Button>
                  {item.count}
                  <Button onClick={() => onBasketItemCountChange(item, -1)}>
                    <KeyboardArrowDownIcon />
                  </Button>
                </div>
                <IconButton
                  onClick={() => dispatch(removeItemFromBasket(item))}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </>
          ))}
        </List>
        <p
          style={{
            display: "block",
            textAlign: "center",
            margin: "0",
            padding: "0"
          }}
        >
          {" "}
          Total: ${totalPrice}{" "}
        </p>
        <Button onClick={() => dispatch(clearBasket())}>Clear all</Button>
      </StyledBox>
    </Modal>
  );
};
