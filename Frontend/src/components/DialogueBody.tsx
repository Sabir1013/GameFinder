import { Carousel, IconButton, Image, Text, VStack, List} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Game } from "../types";
import "@fontsource-variable/ibm-plex-sans";

export function DialogueBody({game} : {game : Game}) {
    const screenshots = game.screenshots ?? [];

    return (
        <>
            <VStack alignItems="flex-start">
                <List.Root gap="2" fontFamily="IBM Plex Sans Variable">
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
                <Carousel.Root slideCount={game.screenshots.length} ml="auto" maxW="500px" loop>
                    <Carousel.ItemGroup>
                        {
                            screenshots.map(
                                (screenshot, index) => 
                                    <Carousel.Item key={index} index={index} border="1px solid #619b8a" w="500px" h="300px">
                                        <Image loading="eager" decoding="async" src={"https:" + screenshot.url.replace("t_thumb", "t_1080p").replace(".jpg", ".webp")} h="100%" w="100%" objectFit="cover" />
                                    </Carousel.Item>
                            )
                        }
                    </Carousel.ItemGroup>
                    <Carousel.Control display="flex"  gap="4" alignItems="center" justifyContent="center">
                        <Carousel.PrevTrigger asChild>
                            <IconButton size="xs" variant="ghost">
                                <LuChevronLeft/>
                            </IconButton>
                        </Carousel.PrevTrigger>
                        <Carousel.IndicatorGroup overflow="scroll">
                            {
                                screenshots.map(
                                    (screenshot, index) =>
                                        <Carousel.Indicator unstyled key={index} index={index} w="30px" _current={{ border: "1px solid #619b8a"}}>
                                            <Image src={"https:" + screenshot.url} loading="lazy" decoding="async" fetchPriority="low" objectFit="contain"/>
                                        </Carousel.Indicator>
                                )
                            }
                        </Carousel.IndicatorGroup>
                        <Carousel.NextTrigger asChild>
                            <IconButton size="xs" variant="ghost">
                                <LuChevronRight />
                            </IconButton>
                        </Carousel.NextTrigger>
                    </Carousel.Control>
                </Carousel.Root>
            )}    
        </>
    );
}