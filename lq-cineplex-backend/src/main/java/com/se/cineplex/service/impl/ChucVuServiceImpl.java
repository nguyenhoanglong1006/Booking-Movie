package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.ChucVu;
import com.se.cineplex.repository.ChucVuRepository;
import com.se.cineplex.service.ChucVuService;

import jakarta.transaction.Transactional;

@Service
public class ChucVuServiceImpl implements ChucVuService{
	
	@Autowired
	private ChucVuRepository chucVuRepository;
	
	@Override
	@Transactional
	public List<ChucVu> findAll() {
		return chucVuRepository.findAll();
	}

	@Override
	@Transactional
	public ChucVu findById(int chucVuId) {
		return chucVuRepository.findById(chucVuId).get();
	}

	@Override
	@Transactional
	public void saveChucVu(ChucVu chucVu) {
		chucVuRepository.save(chucVu);
	}

	@Override
	@Transactional
	public void deleteById(int chucVuId) {
		chucVuRepository.deleteById(chucVuId);
	}

}
