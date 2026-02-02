import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectLevel from "./pages/SelectLevel";
import OLForm from "./pages/OLForm";
import ALForm from "./pages/ALForm";
import DiplomaForm from "./pages/DiplomaForm";
import HNDForm from "./pages/HNDForm";
import DegreeForm from "./pages/DegreeForm";
import PostgraduateForm from "./pages/PostgraduateForm";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-level" element={<SelectLevel />} />
        <Route path="/form/ol" element={<OLForm />} />
        <Route path="/form/al" element={<ALForm />} />
        <Route path="/form/diploma" element={<DiplomaForm />} />
        <Route path="/form/hnd" element={<HNDForm />} />
        <Route path="/form/bsc" element={<DegreeForm />} />
        <Route path="/form/postgrad" element={<PostgraduateForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
