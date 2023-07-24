package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.ChiTietDichVu;
import com.se.cineplex.repository.ChiTietDichVuRepository;
import com.se.cineplex.service.ChiTietDichVuService;

import jakarta.transaction.Transactional;

@Service
public class ChiTietDichVuServiceImpl implements ChiTietDichVuService{
	
	@Autowired
	private ChiTietDichVuRepository chiTietDichVuRepository;

	@Override
	@Transactional
	public List<ChiTietDichVu> findAll() {
		return chiTietDichVuRepository.findAll();
	}

	@Override
	@Transactional
	public void saveChiTietDichVu(ChiTietDichVu chiTietDichVu) {
		chiTietDichVuRepository.save(chiTietDichVu);
	}

	@Override
	@Transactional
	public void saveDsChiTietDichVu(List<ChiTietDichVu> dsChiTietDichVu) {
		 chiTietDichVuRepository.saveAll(dsChiTietDichVu);
	}

}
