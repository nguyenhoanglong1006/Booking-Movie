package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.TheLoai;

public interface TheLoaiService {
	public List<TheLoai> findAll();

	public TheLoai findById(int theLoaiId);

	public void saveTheLoai(TheLoai theLoai);

	public void deleteById(int theLoaiId);

}
