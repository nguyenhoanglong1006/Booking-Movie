package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.LichChieu;

public interface LichChieuService {

	public List<LichChieu> findAll();

	public List<LichChieu> getDsLichChieuByPhimRap(int maPhim, int maRap);

	public List<LichChieu> getDsLichChieuByPhimRapNgayChieu(int maPhim, int maRap, String ngayChieu);

	public LichChieu findById(int lichChieuId);

	public void saveLichChieu(LichChieu lichChieu);

	public void deleteById(int lichChieuId);
}
