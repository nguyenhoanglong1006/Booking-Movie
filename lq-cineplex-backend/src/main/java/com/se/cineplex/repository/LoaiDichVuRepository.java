package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.LoaiDichVu;

@Repository
public interface LoaiDichVuRepository extends JpaRepository<LoaiDichVu, Integer>{

}
