package com.somu.controller;

import com.somu.model.RailwayCustomerModel;
import com.somu.service.IndianRailwayService;
import com.somu.utils.CustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/railway")
public class IndianRailwayApiController {

    @Autowired
    private IndianRailwayService indianRailwayService;

    @PostMapping(value = "/provision", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> railwayApiCustomerProvision(@RequestBody RailwayCustomerModel body)
    {
        log.info("railway api customer provision called...");
        try {
            RailwayCustomerModel railwayCustomerModel = indianRailwayService.customerProvision(body);
            System.out.println("Railway Customer Provision Successful : " + railwayCustomerModel);
            return new ResponseEntity<>(new CustomResponse(railwayCustomerModel), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new CustomResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getLiveStatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> railwayApiGetTrainStatus(@RequestParam("trainNo") Integer trainNo, @RequestParam(value = "startDay", required = false) Integer dayNo)
    {
        log.info("railway api get train status called...");
        try {
            String response = indianRailwayService.getCurrentStatus(trainNo, dayNo);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new CustomResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
