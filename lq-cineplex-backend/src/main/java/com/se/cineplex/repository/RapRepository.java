package com.se.cineplex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.Rap;

@Repository
public interface RapRepository extends JpaRepository<Rap, Integer>{
	
	@Query(value="SELECT rap.* FROM rap INNER JOIN diachi \n"
			+ "ON rap.ma_diachi = diachi.id \n"
			+ "WHERE diachi.tinh_thanh_pho = :tinhThanhPho", nativeQuery = true)
	 List<Rap> getDSRapByTinhThanhPho(String tinhThanhPho);
}
