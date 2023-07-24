package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.DiaChi;
import com.se.cineplex.repository.DiaChiRepository;
import com.se.cineplex.service.DiaChiService;

import jakarta.transaction.Transactional;

@Service
public class DiaChiServiceImpl implements DiaChiService{
	
	@Autowired
	private DiaChiRepository diaChiRepository;

	@Override
	@Transactional
	public List<DiaChi> findAll() {
		 return diaChiRepository.findAll();
	}

	@Override
	@Transactional
	public DiaChi findById(int diaChiId) {
		return diaChiRepository.findById(diaChiId).get();
	}

	@Override
	@Transactional
	public void saveDiaChi(DiaChi diaChi) {
		 diaChiRepository.save(diaChi);
	}

	@Override
	@Transactional
	public void deleteById(int diaChiId) {
		diaChiRepository.deleteById(diaChiId);
	}
	

}
