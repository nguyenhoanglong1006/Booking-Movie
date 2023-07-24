package com.se.cineplex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.PhongChieu;

@Repository
public interface PhongChieuRepository extends JpaRepository<PhongChieu, Integer> {

	@Query(value = "SELECT DISTINCT phongchieu.* FROM phongchieu WHERE phongchieu.ma_rap = :maRap\n"
			+ "AND NOT EXISTS ( SELECT lichchieu.* FROM lichchieu WHERE phongchieu.id = lichchieu.ma_phongchieu\n"
			+ "AND lichchieu.ngay_chieu = :ngayChieu\n" + "AND CASE \n"
			+ "	WHEN :gioBatDau BETWEEN lichchieu.gio_bat_dau AND lichchieu.gio_ket_thuc\n"
			+ "	AND :gioKetThuc BETWEEN lichchieu.gio_bat_dau AND lichchieu.gio_ket_thuc THEN TRUE\n"
			+ "	WHEN lichchieu.gio_bat_dau BETWEEN :gioBatDau AND :gioKetThuc THEN TRUE\n"
			+ "	WHEN lichchieu.gio_ket_thuc BETWEEN :gioBatDau AND :gioKetThuc THEN TRUE\n" + "	ELSE FALSE \n"
			+ "END)", nativeQuery = true)
	List<PhongChieu> getDsPhongChieuTrong(int maRap, String ngayChieu, String gioBatDau, String gioKetThuc);
}
