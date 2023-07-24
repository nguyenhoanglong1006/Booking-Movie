package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.ChiTietDichVu;

public interface ChiTietDichVuService {

	public List<ChiTietDichVu> findAll();

	public void saveChiTietDichVu(ChiTietDichVu chiTietDichVu);
	
	public void saveDsChiTietDichVu(List<ChiTietDichVu> dsChiTietDichVu);

}
