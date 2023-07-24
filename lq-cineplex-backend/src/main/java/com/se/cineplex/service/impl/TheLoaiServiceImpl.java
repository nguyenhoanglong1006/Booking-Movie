package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.TheLoai;
import com.se.cineplex.repository.TheLoaiRepository;
import com.se.cineplex.service.TheLoaiService;

import jakarta.transaction.Transactional;

@Service
public class TheLoaiServiceImpl implements TheLoaiService{
	
	@Autowired
	private TheLoaiRepository theLoaiRepository;

	@Override
	@Transactional
	public List<TheLoai> findAll() {
		return theLoaiRepository.findAll();
	}

	@Override
	@Transactional
	public TheLoai findById(int theLoaiId) {
		return theLoaiRepository.findById(theLoaiId).get();
	}

	@Override
	@Transactional
	public void saveTheLoai(TheLoai theLoai) {
		 theLoaiRepository.save(theLoai);
	}

	@Override
	@Transactional
	public void deleteById(int theLoaiId) {
		theLoaiRepository.deleteById(theLoaiId);
	}

}
