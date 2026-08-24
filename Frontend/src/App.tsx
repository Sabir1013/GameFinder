import { Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { FinderView } from "./pages/FinderView";
import { SavedGamesView } from "./pages/SavedGamesView";
import { AboutView } from "./pages/AboutView";
import { Toaster } from "./components/ui/toaster";
import { SearchProvider } from "./context/SearchProvider";
import { SavedGamesProvider } from "./context/SavedGamesProvider";

export function App() {

  return (
    <>
      <SavedGamesProvider>
        <SearchProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<FinderView />} />
              <Route path="/saved" element={<SavedGamesView />} />
              <Route path="/about" element={<AboutView />} />
            </Route>
          </Routes>
        </SearchProvider>
      </SavedGamesProvider>
      <Toaster />
    </>
  );
}