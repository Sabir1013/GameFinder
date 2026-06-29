import { CloseButton, Flex, IconButton, List, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { InputGroup } from "@chakra-ui/react/input-group";
import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearch } from "../context/useSearch";
import { Link, useLocation } from "react-router";
import { FaRandom } from "react-icons/fa";

export function Sidebar() {
    const [query, setQuery] = useState("");
    const controllerRef = useRef<AbortController | null>(null);
    const {setResults, debouncedQuery, setDebouncedQuery} = useSearch();
    const isSavedPath = useLocation().pathname === "/saved";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, setDebouncedQuery])

    useEffect(() => {
        if (debouncedQuery.trim() === "" || isSavedPath) {
            setResults([]);
            return;
        }

        if (controllerRef.current) controllerRef.current.abort(); 

        controllerRef.current = new AbortController();

        fetch(`http://localhost:8080/api/igdb/search?query=${encodeURIComponent(debouncedQuery)}`,{
            signal : controllerRef.current.signal
        })
            .then(res => res.json())
            .then(jres => setResults(jres))
            .catch(
                err => {
                    if (err.name !== "AbortError") console.log(err)
                }
            );
    }, [debouncedQuery, isSavedPath, setResults])

    const inputEndElem = query ? (
        <CloseButton size="xs" onClick={() => setQuery("")}  bg="transparent"/>
    ) : undefined;

    return (
        <Flex as="aside" position="fixed" top={0} w="300px" bg="#001427" direction="column" textAlign="center" minH="100vh" borderRight="1px solid #619b8a" flexShrink={0} boxShadow="inset -20px 0 40px #00000066">
            <Text as="h1" mt="10" fontWeight="bold" fontSize="2xl">Game Finder</Text>
            <Flex direction="row" justifyContent="center" alignItems="center" mt="10" pr="5" pl="5">
                <InputGroup startElement={<LuSearch/>} endElement={inputEndElem} mr="5">
                    <Input placeholder="Search games" value={query} onChange={e => setQuery(e.target.value)} borderRadius="full"/>
                </InputGroup>
                <IconButton size="xs" bg="#619b8a"><FaRandom/></IconButton>
            </Flex>
            <List.Root mt="10rem" gap="2">
                <List.Item><Link to="/">Finder</Link></List.Item>
                <List.Item><Link to="/saved">Saved</Link></List.Item>
                <List.Item><Link to="/about">About</Link></List.Item>
            </List.Root>
            <Text as="h1" mt="auto" mb="5">© 2026 Sabir Tarique</Text>
        </Flex>
    );
}