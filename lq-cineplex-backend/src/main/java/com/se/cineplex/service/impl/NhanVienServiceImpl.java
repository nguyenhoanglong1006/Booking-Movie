package com.se.cineplex.service.impl;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.NhanVien;
import com.se.cineplex.repository.NhanVienRepository;
import com.se.cineplex.service.NhanVienService;

import jakarta.transaction.Transactional;

@Service
public class NhanVienServiceImpl implements NhanVienService{
	
	@Autowired
	private NhanVienRepository nhanVienRepository;
	
	@Override
	@Transactional
	public List<NhanVien> findAll() {
		return nhanVienRepository.findAll();
	}

	@Override
	@Transactional
	public NhanVien findById(int nhanVienId) {
		return nhanVienRepository.findById(nhanVienId).get();
	}

	@Override
	@Transactional
	public void saveNhanVien(NhanVien nhanVien) {
		nhanVienRepository.save(nhanVien);
	}

	@Override
	@Transactional
	public void deleteById(int nhanVienId) {
		nhanVienRepository.deleteById(nhanVienId);
	}

	@Override
	@Transactional
	public NhanVien getNhanVienByEmail(String email) {
		return nhanVienRepository.getNhanVienByEmail(email);
	}

}
