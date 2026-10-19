import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";
import EffortIndex from "./pages/efforts/EffortIndex";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/task/create" element={<TaskCreate />} />
      <Route path="/effort" element={<EffortIndex />} />
    </Routes>
  );
}

export default App;
