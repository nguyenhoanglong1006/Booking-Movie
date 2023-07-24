package com.se.cineplex.service;
 
import java.util.List; 
import com.se.cineplex.entity.NhanVien;

public interface NhanVienService {
	
	public List<NhanVien> findAll();

	public NhanVien findById(int nhanVienId);
	
	public NhanVien getNhanVienByEmail(String email);

	public void saveNhanVien(NhanVien nhanVien);

	public void deleteById(int nhanVienId);

}
