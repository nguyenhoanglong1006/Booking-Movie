package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.Ve;

public interface VeService {

	public List<Ve> findAll();

	public Ve findById(int veId);
	
	public List<Ve> getDsVeMaDonDat(int maDonDat);

	public void saveVe(Ve ve);
	
	public void saveAllVe(List<Ve> dsVe);

	public void deleteById(int veId);

}
