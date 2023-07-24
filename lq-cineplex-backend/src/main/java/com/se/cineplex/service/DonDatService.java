package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.DonDat;

public interface DonDatService {
	
	public List<DonDat> findAll();

	public DonDat findById(int donDatId);

	public void saveDonDat(DonDat donDat);

	public void deleteById(int donDatId);

}
