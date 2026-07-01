import { CloseButton, Flex, IconButton, List, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { InputGroup } from "@chakra-ui/react/input-group";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router";
import { FaRandom } from "react-icons/fa";
import { useSearch } from "../hooks/useSearch";

export function Sidebar() {
    
    const {query, setQuery, setResults, fetchData} = useSearch();

    const inputEndElem = query ? (
        <CloseButton size="xs" onClick={() => (setQuery(""), setResults([]))}  bg="transparent"/>
    ) : undefined;

    return (
        <Flex as="aside" position="fixed" top={0} w="300px" bg="#001427" direction="column" textAlign="center" minH="100vh" borderRight="1px solid #619b8a" flexShrink={0} boxShadow="inset -20px 0 40px #00000066">
            <Text as="h1" mt="10" fontWeight="bold" fontSize="2xl">Game Finder</Text>
            <Flex direction="row" justifyContent="center" alignItems="center" mt="10" pr="5" pl="5">
                <InputGroup startElement={<LuSearch/>} endElement={inputEndElem} mr="5">
                    <Input placeholder="Search games" value={query} onChange={e => setQuery(e.target.value)} borderRadius="full" name="queryBox"/>
                </InputGroup>
                <IconButton disabled={location.pathname != "/"}size="xs" bg="#619b8a" onClick={() => (setQuery(""), fetchData(`http://localhost:8080/api/igdb/randomize`))}><FaRandom/></IconButton>
            </Flex>
            <List.Root mt="10rem" gap="2">
                <List.Item><Link to="/" >Finder</Link></List.Item>
                <List.Item><Link to="/saved" >Saved</Link></List.Item>
                <List.Item><Link to="/about" >About</Link></List.Item>
            </List.Root>
            <Text as="h1" mt="auto" mb="5">© 2026 Sabir Tarique</Text>
        </Flex>
    );
}