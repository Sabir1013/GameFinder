import { CloseButton, Flex, IconButton, List, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { InputGroup } from "@chakra-ui/react/input-group";
import { LuSearch } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router";
import { Link } from "@chakra-ui/react";
import { FaRandom } from "react-icons/fa";
import { useSearch } from "../hooks/useSearch";
import "@fontsource/ibm-plex-mono";
import "@fontsource-variable/ibm-plex-sans";
import { useSavedGames } from "../hooks/useSavedGames";

export function Sidebar() {
  const { query, setQuery, setResults, fetchData } = useSearch();
  const { setSavedQuery, savedQuery, setPage } = useSavedGames();
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved";
  const currentQuery = isSavedPage ? savedQuery : query;

  const inputEndElem = currentQuery ? (
    <CloseButton
      size="xs"
      onClick={() => {
        if (isSavedPage) {
          setSavedQuery("");
        } else {
          setQuery("");
          setResults([]);
        }
      }}
      bg="transparent"
    />
  ) : undefined;

  return (
    <Flex as="aside" position="fixed" top={0} w="300px" bgImage="radial-gradient(circle at center, #001427, #1A202C)" direction="column" textAlign="center" minH="100vh" borderRight="1px solid #619b8a" flexShrink={0} boxShadow="inset -20px 0 40px #00000066">
      <Text as="h1" mt="10" fontWeight="bold" fontSize="2xl" textShadow="0px 0px 5px teal, 0px 0px 10px teal, 0px 0px 15px teal" fontFamily="IBM Plex Mono">Game Finder</Text>
      <Flex direction="row" justifyContent="center" alignItems="center" mt="10" pr="5" pl="5">
        <InputGroup startElement={<LuSearch />} endElement={inputEndElem} mr="5">
          <Input placeholder="Search games" value={currentQuery} onChange={e => isSavedPage ? setSavedQuery(e.target.value) : setQuery(e.target.value)} borderRadius="full" name="queryBox" autoComplete="off" fontFamily="IBM Plex Sans Variable" disabled={location.pathname === "/about"} />
        </InputGroup>
        <IconButton disabled={location.pathname != "/"} size="xs" bg="#619b8a" onClick={() => (setQuery(""), fetchData(`http://localhost:8080/api/games/randomize`))}><FaRandom /></IconButton>
      </Flex>
      <List.Root mt="10rem" gap="2" fontFamily="IBM Plex Mono">
        <List.Item>
          <Link asChild>
            <RouterLink to="/" onClick={() => setPage(1)}>Finder</RouterLink>
          </Link>
        </List.Item>
        <List.Item>
          <Link asChild>
            <RouterLink to="/saved" onClick={() => setPage(1)}>Saved</RouterLink>
          </Link>
        </List.Item>
        <List.Item>
          <Link asChild>
            <RouterLink to="/about">About</RouterLink>
          </Link>
        </List.Item>
      </List.Root>
      <Text as="h1" mt="auto" mb="5" fontFamily="IBM Plex Mono">© 2026 Sabir Tarique</Text>
    </Flex>
  );
}