package com.sabir.twitchbackend;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {
    private TwitchConfig config;
    private String accessToken;

    private final RestTemplate APICaller = new RestTemplate();

    public AuthService(TwitchConfig config) {
        this.config = config;
    }

    public TwitchConfig getConfig() {
        return config;
    }

     public String getAccessToken() {
        if (accessToken == null) {
            accessToken = generateAccessToken();
        }

        return accessToken;
    }

    private String generateAccessToken() {
        String requestURL = String.format("https://id.twitch.tv/oauth2/token?client_id=%s&client_secret=%s&grant_type=client_credentials",
            config.getClientID(),
            config.getClientSECRET()
        );

        ResponseEntity<Map<String, Object>> responseEntity = APICaller.exchange(requestURL, HttpMethod.POST, null, new ParameterizedTypeReference<Map<String, Object>>(){});
        Map<String, Object> response = responseEntity.getBody();
        String accessToken = (String) response.get("access_token");

        return accessToken;
    }
}