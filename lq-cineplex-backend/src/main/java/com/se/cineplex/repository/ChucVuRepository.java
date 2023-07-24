package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.ChucVu;

@Repository
public interface ChucVuRepository extends JpaRepository<ChucVu, Integer>{

}
