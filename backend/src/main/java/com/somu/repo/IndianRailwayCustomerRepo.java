package com.somu.repo;

import com.somu.model.RailwayCustomerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndianRailwayCustomerRepo extends JpaRepository<RailwayCustomerModel, Long> {
}
