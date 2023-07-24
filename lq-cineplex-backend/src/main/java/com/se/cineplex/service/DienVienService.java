package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.DienVien;

public interface DienVienService {
	
	public List<DienVien> findAll();

	public DienVien findById(int dienVienId);

	public void saveDienVien(DienVien dienVien);

	public void deleteById(int dienVienId);
}
