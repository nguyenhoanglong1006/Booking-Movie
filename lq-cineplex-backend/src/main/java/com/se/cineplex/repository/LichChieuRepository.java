package com.se.cineplex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.LichChieu;

@Repository
public interface LichChieuRepository extends JpaRepository<LichChieu, Integer>{
	
	 @Query(value="SELECT DISTINCT lichchieu.*\n"
	 		+ "FROM phim INNER JOIN lichchieu ON phim.id = lichchieu.ma_phim\n"
	 		+ "INNER JOIN phongchieu ON lichchieu.ma_phongchieu = phongchieu.id\n"
	 		+ "INNER JOIN rap ON phongchieu.ma_rap = rap.id\n"
	 		+ "WHERE lichchieu.ma_phim = :maPhim AND phongchieu.ma_rap = :maRap", nativeQuery = true)
	 List<LichChieu> getDsLichChieuByPhimRap(int maPhim, int maRap);
	 
	 @Query(value="SELECT DISTINCT lichchieu.* FROM phim\n"
	 		+ "INNER JOIN lichchieu ON phim.id = lichchieu.ma_phim\n"
	 		+ "INNER JOIN phongchieu ON lichchieu.ma_phongchieu = phongchieu.id\n"
	 		+ "INNER JOIN rap ON phongchieu.ma_rap = rap.id \n"
	 		+ "WHERE lichchieu.ma_phim = :maPhim \n"
	 		+ "AND phongchieu.ma_rap = :maRap \n"
	 		+ "AND lichchieu.ngay_chieu = :ngayChieu", nativeQuery = true)
		 List<LichChieu> getDsLichChieuByPhimRapNgayChieu(int maPhim, int maRap, String ngayChieu);

}
