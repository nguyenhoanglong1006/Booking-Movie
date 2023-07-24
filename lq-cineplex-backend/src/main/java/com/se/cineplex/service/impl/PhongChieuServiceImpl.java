package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.PhongChieu;
import com.se.cineplex.repository.PhongChieuRepository;
import com.se.cineplex.service.PhongChieuService;

import jakarta.transaction.Transactional;

@Service
public class PhongChieuServiceImpl implements PhongChieuService{
	
	@Autowired
	private PhongChieuRepository phongChieuRepository;

	@Override
	@Transactional
	public List<PhongChieu> findAll() {
		return phongChieuRepository.findAll();
	}

	@Override
	@Transactional
	public PhongChieu findById(int phongChieuId) {
		return phongChieuRepository.findById(phongChieuId).get();
	}

	@Override
	@Transactional
	public void savePhongChieu(PhongChieu phongChieu) {
		phongChieuRepository.save(phongChieu);
	}

	@Override
	@Transactional
	public void deleteById(int phongChieuId) {
		phongChieuRepository.deleteById(phongChieuId);
	}

	@Override
	@Transactional
	public List<PhongChieu> getDsPhongTrong(int maRap, String ngayChieu, String gioBatDau, String gioKetThuc) {
		return phongChieuRepository.getDsPhongChieuTrong(maRap, ngayChieu, gioBatDau, gioKetThuc);
	}

}
