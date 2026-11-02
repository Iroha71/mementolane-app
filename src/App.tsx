import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";
import ActualIndex from "./pages/actuals/ActualIndex";
import TaskUpdate from "./pages/tasks/TaskUpdate";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Index />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/:id/edit" element={<TaskUpdate />} />
        <Route path="/actuals" element={<ActualIndex />} />
      </Routes>
    </div>
  );
}

export default App;
