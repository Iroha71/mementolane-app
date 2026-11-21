import { Link, Route, Routes } from "react-router";
import Index from "./pages/Index";
import TaskCreate from "./pages/tasks/TaskCreate";
import ActualIndex from "./pages/actuals/ActualIndex";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuLink,
} from "./components/ui/navigation-menu";
import TaskUpdate from "./pages/tasks/TaskUpdate";
import { NotebookPen, Ticket } from "lucide-react";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="w-full bg-lime-600 p-2">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <span className="text-lg">MementoLane</span>{" "}
              <span className="text-base">v{__APP_VERSION__}</span>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link to="/">
                    <Ticket />
                    タスク一覧
                  </Link>
                }
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link to="/actuals">
                    <NotebookPen />
                    実績の記録
                  </Link>
                }
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route index element={<Index />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/:id/edit" element={<TaskUpdate />} />
            <Route path="/actuals" element={<ActualIndex />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
