import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router";
  
  import AppLayout from "../components/layout/AppLayout";
  
  import Login from "../pages/Login";
  import Register from "../pages/Register";
  import ForgotPassword from "../pages/ForgotPassword";
  
  import Dashboard from "../pages/Dashboard";
  import Tasks from "../pages/Tasks";
  import Calendar from "../pages/Calendar";
  import Goals from "../pages/Goals";
  
  import NotFound from "../pages/NotFound";
  
  function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
  
          <Route path="/register" element={<Register />} />
  
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
  
          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
  
            <Route
              path="/tasks"
              element={<Tasks />}
            />
  
            <Route
              path="/calendar"
              element={<Calendar />}
            />
  
            <Route
              path="/goals"
              element={<Goals />}
            />
          </Route>
  
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />
  
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRoutes;