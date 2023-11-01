import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { ThemeProvider as NextThemesProvider } from "next-themes";

//Pages imports
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Register from "./pages/Register";
import CanvasIndex from "./pages/CanvasIndex";

function App() {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/details" element={<CanvasIndex />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </NextThemesProvider>
  );
}

export default App;
