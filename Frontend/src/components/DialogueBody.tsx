import { Carousel, IconButton, Image, Text, VStack, List, Button, Dialog, Flex } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Game } from "../types";
import "@fontsource-variable/ibm-plex-sans";
import { useState } from "react";
import { GameDialogue } from "./GameDialogue";

export function DialogueBody({ game }: { game: Game }) {
    const screenshots = game.screenshots ?? [];
    const [parentGame, setParentGame] = useState<Game | null>(null);

    async function handleViewParent() {
        const res = await fetch(`/api/games/${game.parentGameId}`);
        const data = await res.json();
        setParentGame(data);
    }

    return (
        <Flex display="flex" flexDir={{base: "column", md: "row"}} pt="5" gap="50px" alignItems="stretch" maxH={{base: "none", md: "60dvh" }} overflow={{base: "initial", md: "hidden"}}>
            <VStack alignItems="flex-start" overflow={{base: "initial", md: "auto" }} pr="5">
                <List.Root gap="2" fontFamily="IBM Plex Sans Variable">
                    {game.parentGameId && (
                        <>
                            <List.Item>
                                <Text>
                                    <strong>Main Game:</strong>
                                    {" "}
                                    <Button variant="ghost" onClick={handleViewParent} p="0" h="0" colorPalette="teal" _hover={{ textDecoration: "underline", bg: "transparent" }}>{game.parentGame}</Button>
                                </Text>
                            </List.Item>
                            {parentGame && (
                                <Dialog.Root open={true} placement="center" onOpenChange={() => setParentGame(null)}>
                                    <GameDialogue game={parentGame}/>
                                </Dialog.Root>
                            )}
                        </>
                    )}
                    <List.Item>
                        <Text><strong>Release Date:</strong> {new Date(game.releaseDate * 1000).toLocaleDateString()}</Text>
                    </List.Item>
                    <List.Item>
                        <Text><strong>Current Rating:</strong> {game.rating ? Math.round(game.rating) : "No rating available."}</Text>
                    </List.Item>
                    <List.Item>
                        <Text><strong>Description:</strong> {game.summary || "No description available."}</Text>
                    </List.Item>
                    <List.Item>
                        <Text><strong>Story:</strong> {game.storyline || "No storyline available."}</Text>
                    </List.Item>
                </List.Root>
            </VStack>
            {screenshots.length > 0 && (
                <Carousel.Root slideCount={game.screenshots.length} ml="auto" loop w="full" alignItems="center">
                    <Carousel.ItemGroup w={{base: "full", md: "2xl"}} h={{base: "200px", md: "400px"}}>
                        {
                            screenshots.map(
                                (screenshot, index) =>
                                    <Carousel.Item key={index} index={index}  h="full" w="full" justifyContent="center" overflow="hidden">
                                        <Image  h="full" w="full" loading="eager" decoding="async" src={"https:" + screenshot.url.replace("t_thumb", "t_1080p").replace(".jpg", ".webp")} objectFit="contain"/>
                                    </Carousel.Item>
                            )
                        }
                    </Carousel.ItemGroup>
                    <Carousel.Control display="flex" gap="1" alignItems="center" justifyContent="center">
                        <Carousel.PrevTrigger asChild>
                            <IconButton size="xs" variant="ghost" _hover={{ bg: "transparent" }}>
                                <LuChevronLeft />
                            </IconButton>
                        </Carousel.PrevTrigger>
                        <Carousel.IndicatorGroup>
                            {
                                screenshots.map(
                                    (screenshot, index) =>
                                        <Carousel.Indicator unstyled key={index} index={index} _current={{outline: game.gameType == 0 ? "1px solid #619b8a" : "1px solid #8a6199", outlineOffset: "1px"}} w="30px" h="20px">
                                            <Image src={"https:" + screenshot.url} loading="lazy" decoding="async" fetchPriority="low" objectFit="cover" h="full" w="full"/>
                                        </Carousel.Indicator>
                                )
                            }
                        </Carousel.IndicatorGroup>
                        <Carousel.NextTrigger asChild>
                            <IconButton size="xs" variant="ghost" _hover={{ bg: "transparent" }}>
                                <LuChevronRight />
                            </IconButton>
                        </Carousel.NextTrigger>
                    </Carousel.Control>
                </Carousel.Root>
            )}
        </Flex>
    );
}