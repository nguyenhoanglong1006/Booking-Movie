package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.DichVu;
import com.se.cineplex.repository.DichVuRepository;
import com.se.cineplex.service.DichVuService;

import jakarta.transaction.Transactional;

@Service
public class DichVuServiceImpl implements DichVuService {

	@Autowired
	private DichVuRepository dichVuRepository;

	@Override
	@Transactional
	public List<DichVu> findAll() {
		return dichVuRepository.findAll();
	}

	@Override
	@Transactional
	public DichVu findById(int dichVuId) {
		return dichVuRepository.findById(dichVuId).get();
	}

	@Override
	@Transactional
	public void saveDichVu(DichVu dichVu) {
		dichVuRepository.save(dichVu);
	}

	@Override
	@Transactional
	public void deleteById(int dichVuId) {
		dichVuRepository.deleteById(dichVuId);
	}

}
