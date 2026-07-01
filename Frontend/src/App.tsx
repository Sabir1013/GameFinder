import { Route, Routes, useLocation } from "react-router";
import { Layout } from "./Layout";
import { ListView } from "./pages/ListView";
import { SavedView } from "./pages/SavedView";
import { AboutView } from "./pages/AboutView";
import { Toaster } from "./components/ui/toaster";
import { SearchProvider } from "./context/SearchProvider";
import { SavedGamesProvider } from "./context/SavedGamesProvider";

export function App() {
  const location = useLocation();
  
  return (
    <>
     <SavedGamesProvider>
    <SearchProvider key={location.pathname}>
               
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<ListView/>}/>
          <Route path="/saved" element={<SavedView/>}/>
          <Route path="/about" element={<AboutView/>}/>
        </Route>
      </Routes>
     
    </SearchProvider>
     </SavedGamesProvider>
      <Toaster/>
    </>
   
  );
}