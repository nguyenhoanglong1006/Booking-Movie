package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.KhachHang;
import com.se.cineplex.repository.KhachHangRepository;
import com.se.cineplex.service.KhachHangService;

import jakarta.transaction.Transactional;

@Service
public class KhachHangServiceImpl implements KhachHangService{
	
	@Autowired
	private KhachHangRepository khachHangRepository;
	
	@Override
	@Transactional
	public List<KhachHang> findAll() {
		return khachHangRepository.findAll();
	}

	@Override
	@Transactional
	public KhachHang findById(int khachHangId) {
		return khachHangRepository.findById(khachHangId).get();
	}

	@Override
	@Transactional
	public void saveKhachHang(KhachHang khachHang) {
		khachHangRepository.save(khachHang);
	}

	@Override
	@Transactional
	public void deleteById(int khachHangId) {
		khachHangRepository.deleteById(khachHangId);
	}

	@Override
	@Transactional
	public KhachHang getKhachHangByEmail(String email) {
		 return khachHangRepository.getKhachHangByEmail(email);
	}

}
