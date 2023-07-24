package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.DaoDien;
import com.se.cineplex.repository.DaoDienRepository;
import com.se.cineplex.service.DaoDienService;

import jakarta.transaction.Transactional;

@Service
public class DaoDienServiceImpl implements DaoDienService {

	@Autowired
	private DaoDienRepository daoDienRepository;

	@Override
	@Transactional
	public List<DaoDien> findAll() {
		return daoDienRepository.findAll();
	}

	@Override
	@Transactional
	public DaoDien findById(int daoDienId) {
		return daoDienRepository.findById(daoDienId).get();
	}

	@Override
	@Transactional
	public void saveDaoDien(DaoDien daoDien) {
		daoDienRepository.save(daoDien);
	}

	@Override
	@Transactional
	public void deleteById(int daoDienId) {
		 daoDienRepository.deleteById(daoDienId);
	}

}
