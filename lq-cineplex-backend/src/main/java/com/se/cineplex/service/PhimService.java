package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.Phim;

public interface PhimService {
	public List<Phim> findAll();
	
	public List<Phim> getDsPhimDangSapChieu();

	public Phim findById(int phimId);

	public void savePhim(Phim phim);

	public void deleteById(int phimId);
	
	public List<Phim> getDSPhimByMaRap(int maRap);
	 
}
