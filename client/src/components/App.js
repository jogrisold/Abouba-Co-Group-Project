import { useState, useEffect, useContext } from "react";
import SideBar from './SideBar'
// import {Carousel} from './Carousel'
import {StoreContext} from './StoreContext'
import {Homepage} from './Homepage'
import createGlobalStyle from "./GlobalStyles";
import GlobalStyle from "./GlobalStyles";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import ItemDetails from "./ItemDetails";

const  App = () => {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  const { products, companies } = useContext(StoreContext);
    return (
      <>
        <GlobalStyle />
          <BrowserRouter>
            <Routes>
              {/* react router v6 uses element attribute to render components */}
              <Route exact path='/' element={<Homepage/>}/>
              <Route exact path='/product/:productId' element={<ItemDetails/>}/>
            </Routes>
          </BrowserRouter>
      </>
    )
};

export default App;
