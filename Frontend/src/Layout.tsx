import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
// import { SearchProvider } from "./context/SearchProvider";
import { Flex } from "@chakra-ui/react";

export function Layout() {
    return (
        
                <Flex>
                    <Sidebar/>
                    <Outlet/>
                </Flex>
        
    );
}