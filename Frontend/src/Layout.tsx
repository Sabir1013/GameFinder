import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { SearchProvider } from "./context/SearchProvider";
import { Flex } from "@chakra-ui/react";
import { SavedGamesProvider } from "./context/SavedGamesProvider";

export function Layout() {
    return (
        <SearchProvider>
            <SavedGamesProvider>
                <Flex>
                    <Sidebar/>
                    <Outlet/>
                </Flex>
            </SavedGamesProvider>
        </SearchProvider>
    );
}