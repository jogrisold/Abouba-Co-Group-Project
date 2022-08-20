import { useState, useEffect, useContext } from "react";
import SideBar from './SideBar'
// import {Carousel} from './Carousel'
import {StoreContext} from './StoreContext'
import {Homepage} from './Homepage'
import createGlobalStyle from "./GlobalStyles";
import GlobalStyle from "./GlobalStyles";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

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
            </Routes>
          </BrowserRouter>
      </>
    )
};

export default App;
