import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home/Home";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>``
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
