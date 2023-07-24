package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.ChucVu;

public interface ChucVuService {
	
	public List<ChucVu> findAll();

	public ChucVu findById(int chucVuId);

	public void saveChucVu(ChucVu chucVu);

	public void deleteById(int chucVuId);

}
