package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.KhachHang;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer>{
	@Query(value="SELECT * FROM khachhang WHERE khachhang.email = :email", nativeQuery = true)
	 KhachHang getKhachHangByEmail(String email);
}
