package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.LoaiDichVu;
import com.se.cineplex.repository.LoaiDichVuRepository;
import com.se.cineplex.service.LoaiDichVuService;

import jakarta.transaction.Transactional;

@Service
public class LoaiDichVuServiceImpl implements LoaiDichVuService{
	
	@Autowired
	private LoaiDichVuRepository loaiDichVuRepository;
	

	@Override
	@Transactional
	public List<LoaiDichVu> findAll() {
		return loaiDichVuRepository.findAll();
	}

	@Override
	@Transactional
	public LoaiDichVu findById(int loaiDichVuId) {
		return loaiDichVuRepository.findById(loaiDichVuId).get();
	}

	@Override
	@Transactional
	public void saveLoaiDichVu(LoaiDichVu loaiDichVu) {
		loaiDichVuRepository.save(loaiDichVu);
	}

	@Override
	@Transactional
	public void deleteById(int loaiDichVuId) {
		loaiDichVuRepository.deleteById(loaiDichVuId);
	}

}
