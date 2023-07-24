package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.LoaiDichVu;

public interface LoaiDichVuService {
	
	public List<LoaiDichVu> findAll();

	public LoaiDichVu findById(int loaiDichVuId);

	public void saveLoaiDichVu(LoaiDichVu loaiDichVu);

	public void deleteById(int loaiDichVuId);


}
