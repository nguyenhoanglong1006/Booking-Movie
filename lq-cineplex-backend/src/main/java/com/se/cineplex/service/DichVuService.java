package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.DichVu;

public interface DichVuService {

	public List<DichVu> findAll();

	public DichVu findById(int dichVuId);

	public void saveDichVu(DichVu dichVu);

	public void deleteById(int dichVuId);

}
