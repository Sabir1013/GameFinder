package com.sabir.twitchbackend;

import java.util.concurrent.ThreadLocalRandom;

import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IGDBService {
    private final AuthService twitchService;
    private  RestTemplate APICaller;
    private final String endpoint;

    private static final int MAX_GAMES = 263373;
    private static final int LIMIT = 25;

    public IGDBService(AuthService twitchService) {
        this.twitchService = twitchService;

        endpoint = "https://api.igdb.com/v4/games";

        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        cm.setMaxTotal(5);
        cm.setDefaultMaxPerRoute(5);

        CloseableHttpClient client = HttpClients.custom().setConnectionManager(cm).build();

        this.APICaller = new RestTemplate(new HttpComponentsClientHttpRequestFactory(client));
    }

    public HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Client-ID", twitchService.getConfig().getClientID());
        headers.set("Authorization", "Bearer " + twitchService.getAccessToken());
        headers.set("Accept", "application/json");

        return headers;
    }

    public String getGames(String query, int page) {
        int offset = (page - 1) * LIMIT;

        String body = String.format("fields name, first_release_date, screenshots.url, game_type, cover.url, rating, summary, storyline; search \"%s\"; where game_type = 0 & cover.url != null; limit %d; offset %d;", query, LIMIT, offset);
        HttpEntity<String> request = new HttpEntity<String>(body, getHeaders());
        
        String response = APICaller.exchange(endpoint, HttpMethod.POST, request, String.class).getBody();
        return response;
    }

    public String getRandomGames() {
        int offset = ThreadLocalRandom.current().nextInt((MAX_GAMES - LIMIT) + 1);

        String body = String.format("fields name, first_release_date, screenshots.url, game_type, cover.url, rating, summary, storyline; where game_type = 0 & cover.url != null; limit %d; offset %d;", 24, offset);
        HttpEntity<String> request = new HttpEntity<String>(body, getHeaders());
        
        String response = APICaller.exchange(endpoint, HttpMethod.POST, request, String.class).getBody();
        return response;
    }
}