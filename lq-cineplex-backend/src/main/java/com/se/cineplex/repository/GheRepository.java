package com.se.cineplex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.Ghe;

@Repository
public interface GheRepository extends JpaRepository<Ghe, Integer> {
	
//	 @Query(value="select g from Ghe g where g.phongChieu.id= :maPhongChieu")
//	 List<Ghe> getAllGheByMaPhongChieu(int maPhongChieu);
	 
	 @Query(value="select * from ghe where ma_phongchieu= :maPhongChieu", nativeQuery = true)
	 List<Ghe> getAllGheByMaPhongChieu(int maPhongChieu);
	 
	 @Query(value="SELECT ghe.* \n"
	 		+ "FROM ghe INNER JOIN ve ON ghe.id = ve.ma_ghe\n"
	 		+ "INNER JOIN lichchieu ON lichchieu.id = ve.ma_lichchieu\n"
	 		+ "INNER JOIN phongchieu ON ghe.ma_phongchieu = phongchieu.id \n"
	 		+ "AND lichchieu.ma_phongchieu = phongchieu.id \n"
	 		+ "WHERE ve.ma_ghe = ghe.id AND ma_lichchieu = :maLichChieu", nativeQuery = true)
	 List<Ghe> getDsGheDaBanLichChieu(int maLichChieu);

}
