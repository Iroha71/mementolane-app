import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Index />} />
      <Route path="/task/create" element={<TaskCreate />} />
    </Routes>
  );
}

export default App;
