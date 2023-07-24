package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.Rap;

public interface RapService {
	public List<Rap> findAll();

	public Rap findById(int rapId);
	
	public List<Rap> getDSRapByTinhThanhPho(String tinhThanhPho);

	public void saveRap(Rap rap);

	public void deleteById(int rapId);

}
