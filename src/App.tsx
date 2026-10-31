import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Index />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
      </Routes>
    </div>
  );
}

export default App;
