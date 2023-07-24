package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.LoaiGhe;

@Repository
public interface LoaiGheRepository extends JpaRepository<LoaiGhe, Integer>{

}
