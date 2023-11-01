import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { ThemeProvider as NextThemesProvider } from "next-themes";

//Pages imports
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Register from "./pages/Register";
import CanvasIndex from "./pages/CanvasIndex";
import Dashboard from "./pages/Dashboard";
import DashboardUpdate from "./pages/DashboardUpdate.jsx";
import YourList from "./components/YourList.jsx";

function App() {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/details" element={<CanvasIndex />} />
          <Route path="/dashboard/seller" element={<Dashboard />} />
          <Route path="/dashboard/seller/update" element={<DashboardUpdate />} />
          <Route path="/user/favourites" element={<YourList />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </NextThemesProvider>
  );
}

export default App;
