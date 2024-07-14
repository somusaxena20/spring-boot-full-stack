package com.somu.service;

import com.somu.model.RailwayCustomerModel;

public interface IndianRailwayService {

    RailwayCustomerModel customerProvision(RailwayCustomerModel model);
    String getCurrentStatus(Integer trainNo, Integer dayNo);
}
