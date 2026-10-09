import { Route, Routes } from "react-router";
import "./App.css";
import Index from "./pages/Index";

function App() {
  return (
    <Routes >
      <Route index path="/" element={<Index />} />
    </Routes>
  );
}

export default App;
