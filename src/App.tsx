import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";
import ActualIndex from "./pages/actuals/ActualIndex";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Index />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/actuals" element={<ActualIndex />} />
      </Routes>
    </div>
  );
}

export default App;
