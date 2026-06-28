import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { ListView } from "./pages/ListView";
import { SavedView } from "./pages/SavedView";
import { AboutView } from "./pages/AboutView";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<ListView/>}/>
          <Route path="/saved" element={<SavedView/>}/>
          <Route path="/about" element={<AboutView/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}