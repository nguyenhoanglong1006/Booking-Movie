package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.LoaiGhe;
import com.se.cineplex.repository.LoaiGheRepository;
import com.se.cineplex.service.LoaiGheService;

import jakarta.transaction.Transactional;

@Service
public class LoaiGheServiceImpl implements LoaiGheService{
	
	@Autowired
	private LoaiGheRepository loaiGheRepository;

	@Override
	@Transactional
	public List<LoaiGhe> findAll() {
		return loaiGheRepository.findAll();
	}

	@Override
	@Transactional
	public LoaiGhe findById(int loaiGheId) {
		return loaiGheRepository.findById(loaiGheId).get();
	}

	@Override
	@Transactional
	public void saveLoaiGhe(LoaiGhe loaiGhe) {
		loaiGheRepository.save(loaiGhe);
	}

	@Override
	@Transactional
	public void deleteById(int loaiGheId) {
		loaiGheRepository.deleteById(loaiGheId);
	}

}
