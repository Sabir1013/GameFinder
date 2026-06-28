package com.sabir.twitchbackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TwitchConfig {
    @Value("${twitch.clientID}")
    private String clientID;

    @Value("${twitch.clientSECRET}")
    private String clientSECRET;

    public String getClientID() {
        return clientID;
    }

    public String getClientSECRET() {
        return clientSECRET;
    }
}