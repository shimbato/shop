import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ShopModule } from "../components/ShopModule";
import { setBasketOpened } from "../store/slice/shop";
import { AuthorisedPage } from "./AuthorisedPage";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const ShopPage = () => {
  const dispatch = useDispatch();

  return (
    <AuthorisedPage>
      <Navbar
        title="Shop"
        sx={{ mb: 2 }}
        rightContent={
          <IconButton
            color="inherit"
            size="large"
            onClick={() => dispatch(setBasketOpened(true))}
          >
            <ShoppingBasketIcon />
          </IconButton>
        }
      />
      <div>
        <ShopModule />
      </div>
    </AuthorisedPage>
  );
};
