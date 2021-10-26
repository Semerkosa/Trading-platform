package com.jointrivial.portfolio.service.impl;

import com.google.gson.Gson;
import com.jointrivial.portfolio.model.dto.BalanceRootDto;
import com.jointrivial.portfolio.service.AssetService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AssetServiceImpl implements AssetService {

    private static final String BALANCES_URL = "http://localhost:8082/asset/balances";

    private final Gson gson;

    public AssetServiceImpl(Gson gson) {
        this.gson = gson;
    }

    @Override
    public BalanceRootDto getAllBalances(String keyOrganizations) throws URISyntaxException, IOException, InterruptedException {

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(BALANCES_URL))
                .header("KeyOrganizations", keyOrganizations)
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return gson.fromJson(response.body(), BalanceRootDto.class);
    }
}
