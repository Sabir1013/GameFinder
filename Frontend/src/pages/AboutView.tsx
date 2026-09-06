import { Flex, Strong, Text } from "@chakra-ui/react";
import "@fontsource-variable/ibm-plex-sans";

export function AboutView() {
    return (
        <Flex
            ml={{ base: 0, md: "300px" }}
            width={{ base: "100%", md: "100vw" }}
            minHeight="100dvh"
            padding={{ base: 5, md: 10 }}
            direction="column"
            alignItems="center"
            bg="#0a0908"
            gap="5"
            justifyContent="space-evenly"
        >
            <Flex border="1px solid #619b8a" w={{ base: "100%", md: "1000px" }} maxW="1000px" p="5">
                <Text fontSize={{ base: "sm", md: "2xl" }} fontFamily="IBM Plex Sans Variable">Welcome to the <Strong>Game Finder</Strong>! Here, you can search for your favorite games or game franchises for some simple information.</Text>
            </Flex>
            <Flex border="1px solid #619b8a" w={{ base: "100%", md: "1000px" }} maxW="1000px" p="5">
                <Text fontSize={{ base: "sm", md: "2xl" }} fontFamily="IBM Plex Sans Variable">In the <Strong>Finder Tab</Strong>, you can either search or click the randomize button for a list of 24 random games.</Text>
            </Flex>
            <Flex border="1px solid #619b8a" w={{ base: "100%", md: "1000px" }} maxW="1000px" p="5">
                <Text fontSize={{ base: "sm", md: "2xl" }} fontFamily="IBM Plex Sans Variable">You can <Strong>save</Strong> anything you like by clicking the Save button in the game card's dialog. View these games in the <Strong>Saved Tab</Strong>.</Text>
            </Flex>
            <Flex border="1px solid #619b8a" w={{ base: "100%", md: "1000px" }} maxW="1000px" p="5">
                <Text fontSize={{ base: "sm", md: "2xl" }} fontFamily="IBM Plex Sans Variable">Enjoy exploring all the games available! From the retro to the future releases. All data is from the <Strong>IGDB API</Strong>.</Text>
            </Flex>
        </Flex>
    );
}