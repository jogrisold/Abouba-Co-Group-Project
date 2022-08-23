// import {Carousel} from './Carousel'
import GlobalStyles from "./GlobalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import ItemDetails from "./ItemDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import CartPage from "./CartPage";
import Footer from "./Footer";

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
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/cart" element={<CartPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
