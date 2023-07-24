package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.Ghe;
import com.se.cineplex.repository.GheRepository;
import com.se.cineplex.service.GheService;

import jakarta.transaction.Transactional;

@Service
public class GheServiceImpl implements GheService {

	@Autowired
	private GheRepository gheRepository;

	@Override
	@Transactional
	public List<Ghe> findAll() {
		return gheRepository.findAll();
	}

	@Override
	@Transactional
	public Ghe findById(int gheId) {
		return gheRepository.findById(gheId).get();
	}

	@Override
	@Transactional
	public void saveGhe(Ghe ghe) {
		gheRepository.save(ghe);
	}

	@Override
	@Transactional
	public void deleteById(int gheId) {
		gheRepository.deleteById(gheId);
	}

	@Override
	@Transactional
	public void saveAllGhe(List<Ghe> dsGhe) {
		gheRepository.saveAll(dsGhe);
	}

	@Override
	@Transactional
	public List<Ghe> findAllByMaPhongChieu(int maPhongChieu) {
		return gheRepository.getAllGheByMaPhongChieu(maPhongChieu);
	}

	@Override
	@Transactional
	public List<Ghe> getDsGheDaBanLichChieu(int maLichChieu) {
		return gheRepository.getDsGheDaBanLichChieu(maLichChieu);
	}

}
