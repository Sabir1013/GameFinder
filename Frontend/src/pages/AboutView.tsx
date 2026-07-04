import { Flex, Strong, Text } from "@chakra-ui/react";
import "@fontsource-variable/ibm-plex-sans";

export function AboutView() {
    return (
        <Flex ml="300px" width="100vw" minHeight="100vh" padding={10} direction="column" alignItems="center" bg="#0a0908" justifyContent="space-evenly">
            <Flex border="1px solid #619b8a" h="100px" w="1000px" alignItems="center" justifyContent="center" p="5">
                <Text fontSize="2xl" fontFamily="IBM Plex Sans Variable">Welcome to the <Strong>Game Finder</Strong>! Here, you can search for your favorite games or game franchises for some simple information.</Text>
            </Flex>
            <Flex border="1px solid #619b8a" h="100px" w="1000px" alignItems="center" justifyContent="center" p="5">
                <Text fontSize="2xl" fontFamily="IBM Plex Sans Variable">In the <Strong>Finder Tab</Strong>, you can either search or click the randomize button for a list of 24 random games. </Text>
            </Flex>
            <Flex border="1px solid #619b8a" h="100px" w="1000px" alignItems="center" justifyContent="center" p="5">
                <Text fontSize="2xl" fontFamily="IBM Plex Sans Variable">You can <Strong>save</Strong> anything you like by clicking the Save button in the game card's dialog. View these games in the <Strong>Saved Tab</Strong>.</Text>
            </Flex>
            <Flex border="1px solid #619b8a" h="100px" w="1000px" alignItems="center" justifyContent="center" p="5">
                <Text fontSize="2xl" fontFamily="IBM Plex Sans Variable">Enjoy exploring all the games available! From the retro to the futue releases. All data is from the <Strong>IGDB API</Strong>.</Text>
            </Flex>
        </Flex>
    );
}