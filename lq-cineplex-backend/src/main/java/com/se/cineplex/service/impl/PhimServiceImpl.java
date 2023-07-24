package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.Phim;
import com.se.cineplex.repository.PhimRepository;
import com.se.cineplex.service.PhimService;

import jakarta.transaction.Transactional;

@Service
public class PhimServiceImpl implements PhimService{
	
	@Autowired
	private PhimRepository phimRepository;

	@Override
	@Transactional
	public List<Phim> findAll() {
		 return phimRepository.findAll();
	}

	@Override
	@Transactional
	public Phim findById(int phimId) {
		return phimRepository.findById(phimId).get();
	}

	@Override
	@Transactional
	public void savePhim(Phim phim) {
		 phimRepository.save(phim);
	}

	@Override
	@Transactional
	public void deleteById(int phimId) {
		phimRepository.deleteById(phimId);
	}

	@Override
	@Transactional
	public List<Phim> getDSPhimByMaRap(int maRap) {
		 return phimRepository.getDSPhimByMaRap(maRap);
	}

	@Override
	@Transactional
	public List<Phim> getDsPhimDangSapChieu() {
		return phimRepository.getDSPhimDangSapChieu();
	}

}
