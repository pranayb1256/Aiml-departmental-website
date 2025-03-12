import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";
import Teaching from "./Components/Faculty/Teaching";  // Import Faculty Page
import NonTeaching from "./Components/Faculty/NonTeaching";  // Import Faculty Page
import HodDesk from "./Components/Faculty/HodDesk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>``
          <Route index element={<Home />} />
          <Route path="/HodDesk" element={<HodDesk/>} />
          <Route path="/Teaching" element={<Teaching/>} />
          <Route path="/NonTeaching" element={<NonTeaching/>} />
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
