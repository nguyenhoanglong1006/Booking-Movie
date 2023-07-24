package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.LoaiGhe;

public interface LoaiGheService {
	public List<LoaiGhe> findAll();

	public LoaiGhe findById(int loaiGheId);

	public void saveLoaiGhe(LoaiGhe loaiGhe);

	public void deleteById(int loaiGheId);
}
