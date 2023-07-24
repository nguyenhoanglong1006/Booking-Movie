package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.DienVien;
import com.se.cineplex.repository.DienVienRepository;
import com.se.cineplex.service.DienVienService;

import jakarta.transaction.Transactional;

@Service
public class DienVienServiceImpl implements DienVienService{
	
	@Autowired
	private DienVienRepository dienVienRepository;

	@Override
	@Transactional
	public List<DienVien> findAll() {
		 return dienVienRepository.findAll();
	}

	@Override
	@Transactional
	public DienVien findById(int dienVienId) {
		return dienVienRepository.findById(dienVienId).get();
	}

	@Override
	@Transactional
	public void saveDienVien(DienVien dienVien) {
		dienVienRepository.save(dienVien);
	}

	@Override
	@Transactional
	public void deleteById(int dienVienId) {
		 dienVienRepository.deleteById(dienVienId);
	}

}
