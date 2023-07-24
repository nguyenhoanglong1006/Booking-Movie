package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.DaoDien;

public interface DaoDienService {
	public List<DaoDien> findAll();

	public DaoDien findById(int daoDienId);

	public void saveDaoDien(DaoDien daoDien);

	public void deleteById(int daoDienId);
}
