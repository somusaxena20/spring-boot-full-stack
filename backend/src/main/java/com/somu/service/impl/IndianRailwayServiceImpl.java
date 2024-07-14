package com.somu.service.impl;

import com.somu.model.RailwayCustomerModel;
import com.somu.repo.IndianRailwayCustomerRepo;
import com.somu.service.IndianRailwayService;
import com.somu.utils.RequestSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class IndianRailwayServiceImpl implements IndianRailwayService {

    @Autowired
    private IndianRailwayCustomerRepo indianRailwayCustomerRepo;
    @Autowired
    private RequestSend requestSend;
    //org api
    private final String apiKey = "c7e27cac7bmsh94f5195e115eb79p190b05jsne25693aaf370";
    private final String host = "irctc1.p.rapidapi.com";


    @Override
    public RailwayCustomerModel customerProvision(RailwayCustomerModel model) {

        try{
            indianRailwayCustomerRepo.save(model);
            System.out.println("Customer provisioned successfully : "+model);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }

        return model;
    }

    @Override
    public String getCurrentStatus(Integer trainNo, Integer dayNo) {

        String hostUrl = "https://"+host+"/api/v1/liveTrainStatus";
        dayNo = dayNo == null || dayNo < 0 ? 0 : dayNo;

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(hostUrl)
                .queryParam("trainNo", trainNo)
                .queryParam("startDay", dayNo);
        System.out.println("Url : "+builder.toUriString());

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-RapidAPI-Key", apiKey);
        headers.add("X-RapidAPI-Host", host);

        String response = requestSend.callApiOfGet(trainNo, dayNo, builder, headers);

        return response;
    }
}
