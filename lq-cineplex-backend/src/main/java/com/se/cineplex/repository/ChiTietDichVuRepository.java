package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.ChiTietDichVu;

@Repository
public interface ChiTietDichVuRepository extends JpaRepository<ChiTietDichVu, Integer>{

}
