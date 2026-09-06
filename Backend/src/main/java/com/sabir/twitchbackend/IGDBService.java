package com.sabir.twitchbackend;

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
    private final RestTemplate APICaller;
    private final String endpoint;

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

    public String getGamesPage(int offset) {
        String body = String.format("fields name, first_release_date, screenshots.url, game_type, cover.url, rating, summary, storyline; where game_type = 0 & cover.url != null; limit 500; offset %d;", offset);
        HttpEntity<String> request = new HttpEntity<String>(body, getHeaders());

        String response = APICaller.exchange(endpoint, HttpMethod.POST, request, String.class).getBody();
        return response;
    }
}