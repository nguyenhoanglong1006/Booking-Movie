package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.DiaChi;

public interface DiaChiService {
	public List<DiaChi> findAll();

	public DiaChi findById(int diaChiId);

	public void saveDiaChi(DiaChi diaChi);

	public void deleteById(int diaChiId);

}
