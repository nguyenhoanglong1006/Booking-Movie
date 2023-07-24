package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.LoaiPhongChieu;

public interface LoaiPhongChieuService {
	
	public List<LoaiPhongChieu> findAll();

	public LoaiPhongChieu findById(int loaiPhongChieuId);

	public void saveLoaiPhongChieu(LoaiPhongChieu loaiPhongChieu);

	public void deleteById(int loaiPhonChieuId);


}
