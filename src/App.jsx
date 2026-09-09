import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Formulas from "./pages/Formulas";
import Visualizer from "./pages/Visualizer";
import Footer from "./components/Footer";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/visulizer" element={<Visualizer />} />
        <Route path="/abut" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;