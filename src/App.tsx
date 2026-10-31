import { Route, Routes } from "react-router";
import Index from "./pages/Index";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
