package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.DienVien;

@Repository
public interface DienVienRepository extends JpaRepository<DienVien, Integer>{

}
