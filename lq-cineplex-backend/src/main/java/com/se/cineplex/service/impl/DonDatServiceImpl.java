package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.DonDat;
import com.se.cineplex.repository.DonDatRepository;
import com.se.cineplex.service.DonDatService;

import jakarta.transaction.Transactional;

@Service
public class DonDatServiceImpl implements DonDatService{
	
	@Autowired
	private DonDatRepository donDatRepository;

	@Override
	@Transactional
	public List<DonDat> findAll() {
		return donDatRepository.findAll();
	}

	@Override
	@Transactional
	public DonDat findById(int donDatId) {
		return donDatRepository.findById(donDatId).get();
	}

	@Override
	@Transactional
	public void saveDonDat(DonDat donDat) {
		donDatRepository.save(donDat);
	}

	@Override
	@Transactional
	public void deleteById(int donDatId) {
		donDatRepository.deleteById(donDatId);
	}

}
