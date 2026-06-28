import { Flex, Link, List, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { InputGroup } from "@chakra-ui/react/input-group";
import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearch } from "../context/useSearch";

function Sidebar() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const controllerRef = useRef<AbortController | null>(null);
    const {setResults} = useSearch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query])

    useEffect(() => {
        if (debouncedQuery.trim() === "") {
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
    }, [debouncedQuery, setResults])

    return (
        <Flex as="aside" position="fixed" top={0} w="300px" bg="#001427" direction="column" textAlign="center" minH="100vh" borderRight="1px solid #619b8a" flexShrink={0} boxShadow="inset -20px 0 40px #00000066">
            <Text as="h1" mt="10" fontWeight="bold" fontSize="2xl">Game Finder</Text>
            <InputGroup startElement={<LuSearch/>} mt="10" pr="10" pl="10">
                <Input placeholder="Search games" onChange={e => setQuery(e.target.value)} borderRadius="full"/>
            </InputGroup>
            <List.Root mt="10rem" gap="2">
                <List.Item><Link href="/">Finder</Link></List.Item>
                <List.Item><Link href="/saved">Saved</Link></List.Item>
                <List.Item><Link href="/about">About</Link></List.Item>
            </List.Root>
            <Text as="h1" mt="auto" mb="5">© 2026 Sabir Tarique</Text>
        </Flex>
    );
}

export {Sidebar};