package com.somu.service.impl;

import com.somu.service.ProcessUsageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class ProcessUsageServiceImpl implements ProcessUsageService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Object getMetrics() {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        System.out.println("Metric url : "+baseUrl+"/actuator/metrics");
        return restTemplate.getForObject(baseUrl+"/actuator/metrics", Object.class);
    }

    @Override
    public Object getMetricBasedOnProcess(String processName) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        System.out.println("Base url : "+baseUrl+"/actuator/metrics/"+processName);
        return restTemplate.getForObject(baseUrl+"/actuator/metrics/"+processName, Object.class);
    }
}
