import { useState, useEffect } from "react";
import SideBar from './SideBar'

function App() {
  const [bacon, setBacon] = useState(null);

  // useEffect(() => {
  //   fetch("/bacon")
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);

  return <div>{bacon ? bacon : `...where's my stuff?...`}</div>;
}

export default App;
