import { useState, useEffect, useContext } from "react";
import SideBar from './SideBar'
// import {Carousel} from './Carousel'
import {StoreContext} from './StoreContext'
import {Homepage} from './Homepage'

function App() {
  const [bacon, setBacon] = useState(null);

  // useEffect(() => {
  //   fetch("/bacon")
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);

  const { products, companies } = useContext(StoreContext);
    return (
      <>
      <SideBar/>
      <Homepage/>
      </>
    )

}

export default App;
