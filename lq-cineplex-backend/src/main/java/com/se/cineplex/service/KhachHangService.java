package com.se.cineplex.service;

import java.util.List; 

import com.se.cineplex.entity.KhachHang;

public interface KhachHangService {
	
	public List<KhachHang> findAll();

	public KhachHang findById(int khachHangId);
	
	public KhachHang getKhachHangByEmail(String email);

	public void saveKhachHang(KhachHang khachHang);

	public void deleteById(int khachHangId);

}
