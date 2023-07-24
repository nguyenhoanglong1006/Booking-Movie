package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.LoaiPhongChieu;
import com.se.cineplex.repository.LoaiPhongChieuRepository;
import com.se.cineplex.service.LoaiPhongChieuService;

import jakarta.transaction.Transactional;

@Service
public class LoaiPhongChieuServiceImpl implements LoaiPhongChieuService{
	
	@Autowired
	private LoaiPhongChieuRepository loaiPhongChieuRepository;

	@Override
	@Transactional
	public List<LoaiPhongChieu> findAll() {
		return loaiPhongChieuRepository.findAll();
	}

	@Override
	@Transactional
	public LoaiPhongChieu findById(int loaiPhongChieuId) {
		return loaiPhongChieuRepository.findById(loaiPhongChieuId).get();
	}

	@Override
	@Transactional
	public void saveLoaiPhongChieu(LoaiPhongChieu loaiPhongChieu) {
		loaiPhongChieuRepository.save(loaiPhongChieu);
	}

	@Override
	@Transactional
	public void deleteById(int loaiPhonChieuId) {
		loaiPhongChieuRepository.deleteById(loaiPhonChieuId);
	}

}
