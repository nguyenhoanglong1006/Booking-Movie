package com.se.cineplex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.Phim;

@Repository
public interface PhimRepository extends JpaRepository<Phim, Integer> {
	
	
	@Query(value = "SELECT phim.* FROM phim \n"
			+ "WHERE phim.trang_thai != 'Ngừng chiếu'", nativeQuery = true)
	List<Phim> getDSPhimDangSapChieu();

	@Query(value = "SELECT DISTINCT phim.* FROM phim INNER JOIN lichchieu ON phim.id = lichchieu.ma_phim \n"
			+ "INNER JOIN phongchieu ON lichchieu.ma_phongchieu = phongchieu.id INNER JOIN rap ON phongchieu.ma_rap = :maRap", nativeQuery = true)
	List<Phim> getDSPhimByMaRap(int maRap);
}
