// import {Carousel} from './Carousel'
import GlobalStyles from "./GlobalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import SignIn from "./SignIn";
import Profile from "./Profile";
import CartPage from "./CartPage";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header/>
        <Routes>
          {/* react router v6 uses element attribute to render components */}
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/product/:productId" element={<ItemDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/cart" element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
