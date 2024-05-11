package com.somu.controller;

import com.somu.service.ProcessUsageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/process")
public class ProcessUsageController {

    @Autowired
    private ProcessUsageService processUsageService;

    @GetMapping(value = "/metric", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMetrics()
    {
        return new ResponseEntity<>(processUsageService.getMetrics(), HttpStatus.OK);
    }

    @GetMapping(value = "/metric/{metricName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMetricDetails(@PathVariable String metricName)
    {
        return new ResponseEntity<>(processUsageService.getMetricBasedOnProcess(metricName), HttpStatus.OK);
    }
}
