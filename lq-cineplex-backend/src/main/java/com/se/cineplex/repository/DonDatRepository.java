package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.DonDat;

@Repository
public interface DonDatRepository extends JpaRepository<DonDat, Integer>{

}
