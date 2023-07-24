package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.Ve;
import com.se.cineplex.repository.VeRepository;
import com.se.cineplex.service.VeService;

import jakarta.transaction.Transactional;

@Service
public class VeServiceImpl implements VeService{
	
	@Autowired
	private VeRepository veRepository;
	
	@Override
	@Transactional
	public List<Ve> findAll() {
		return veRepository.findAll();
	}

	@Override
	@Transactional
	public Ve findById(int veId) {
		return veRepository.findById(veId).get();
	}

	@Override
	@Transactional
	public void saveVe(Ve ve) {
		veRepository.save(ve);
	}

	@Override
	@Transactional
	public void deleteById(int veId) {
		veRepository.deleteById(veId);
	}

	@Override
	@Transactional
	public void saveAllVe(List<Ve> dsVe) {
		 veRepository.saveAll(dsVe);
	}

	@Override
	@Transactional
	public List<Ve> getDsVeMaDonDat(int maDonDat) {
		 return veRepository.getDsVeMaDonDat(maDonDat);
	}

}
