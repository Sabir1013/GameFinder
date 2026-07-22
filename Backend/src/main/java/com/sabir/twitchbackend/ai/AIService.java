package com.sabir.twitchbackend.ai;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.pgvector.PGvector;

@Service
public class AIService {

    private final RestClient restClient = RestClient.create();

    public PGvector getEmbedding(String query) {

        Map<String, List<Double>> response = restClient.get()
                .uri("http://127.0.0.1:8000/embed?query=" + query)
                .retrieve()
                .body(Map.class);

        List<Double> values = response.get("embedding");

        float[] vector = new float[values.size()];

        for (int i = 0; i < values.size(); i++) {
            vector[i] = values.get(i).floatValue();
        }

        return new PGvector(vector);
    }
}