package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.NhanVien;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer>{
	 @Query(value="SELECT * FROM nhanvien WHERE nhanvien.email = :email", nativeQuery = true)
	 NhanVien getNhanVienByEmail(String email);
}
