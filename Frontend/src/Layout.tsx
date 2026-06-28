import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { SearchProvider } from "./context/SearchProvider";
import { Flex } from "@chakra-ui/react";

function Layout() {
    return (
        <SearchProvider>
            <Flex>
                <Sidebar/>
                <Outlet/>
            </Flex>
        </SearchProvider>
    );
}

export {Layout}