package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.LoaiPhongChieu;

@Repository
public interface LoaiPhongChieuRepository extends JpaRepository<LoaiPhongChieu, Integer>{

}
