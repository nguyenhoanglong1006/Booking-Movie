package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.Rap;
import com.se.cineplex.repository.RapRepository;
import com.se.cineplex.service.RapService;

import jakarta.transaction.Transactional;

@Service
public class RapServiceImpl implements RapService{
	
	@Autowired
	private RapRepository rapRepository;

	@Override
	@Transactional
	public List<Rap> findAll() {
		 return rapRepository.findAll();
	}

	@Override
	@Transactional
	public Rap findById(int rapId) {
		return rapRepository.findById(rapId).get();
	}

	@Override
	@Transactional
	public void saveRap(Rap rap) {
		rapRepository.save(rap);
	}

	@Override
	@Transactional
	public void deleteById(int rapId) {
		rapRepository.deleteById(rapId);
	}

	@Override
	@Transactional
	public List<Rap> getDSRapByTinhThanhPho(String tinhThanhPho) {
		return rapRepository.getDSRapByTinhThanhPho(tinhThanhPho);
	}

}
