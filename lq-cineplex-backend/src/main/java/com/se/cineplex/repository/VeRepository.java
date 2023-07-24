package com.se.cineplex.repository;

import java.util.List; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.Ve;

@Repository
public interface VeRepository extends JpaRepository<Ve, Integer>{
	 @Query(value="SELECT ve.* FROM ve WHERE ve.ma_dondat = :maDonDat", nativeQuery = true)
	 List<Ve> getDsVeMaDonDat(int maDonDat);
}
