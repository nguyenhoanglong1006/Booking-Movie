package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.LichChieu;
import com.se.cineplex.repository.LichChieuRepository;
import com.se.cineplex.service.LichChieuService;

import jakarta.transaction.Transactional;

@Service
public class LichChieuServiceImpl implements LichChieuService{
	
	@Autowired
	private LichChieuRepository lichChieuRepository;

	@Override
	@Transactional
	public List<LichChieu> findAll() {
		return lichChieuRepository.findAll();
	}

	@Override
	@Transactional
	public LichChieu findById(int lichChieuId) {
		return lichChieuRepository.findById(lichChieuId).get();
	}

	@Override
	@Transactional
	public void saveLichChieu(LichChieu lichChieu) {
		lichChieuRepository.save(lichChieu);
	}

	@Override
	@Transactional
	public void deleteById(int lichChieuId) {
		lichChieuRepository.deleteById(lichChieuId);
	}

	@Override
	@Transactional
	public List<LichChieu> getDsLichChieuByPhimRap(int maPhim, int maRap) {
		return lichChieuRepository.getDsLichChieuByPhimRap(maPhim, maRap);
	}

	@Override
	@Transactional
	public List<LichChieu> getDsLichChieuByPhimRapNgayChieu(int maPhim, int maRap, String ngayChieu) {
		return lichChieuRepository.getDsLichChieuByPhimRapNgayChieu(maPhim, maRap, ngayChieu);
	}

}
