package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.DiaChi;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, Integer>{

}
