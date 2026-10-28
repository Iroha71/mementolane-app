import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";
import ActualIndex from "./pages/actuals/ActualIndex";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/task/create" element={<TaskCreate />} />
      <Route path="/actuals" element={<ActualIndex />} />
    </Routes>
  );
}

export default App;
