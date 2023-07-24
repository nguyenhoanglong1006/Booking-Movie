package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.ChiTietVoucher;
import com.se.cineplex.repository.ChiTietVoucherRepository;
import com.se.cineplex.service.ChiTietVoucherService;

import jakarta.transaction.Transactional;

@Service
public class ChiTietVoucherServiceImpl implements ChiTietVoucherService{
	
	@Autowired
	private ChiTietVoucherRepository chiTietVoucherRepository;

	@Override
	@Transactional
	public List<ChiTietVoucher> findAll() {
		return chiTietVoucherRepository.findAll();
	}

	@Override
	@Transactional
	public void saveChiTietVoucher(ChiTietVoucher chiTietVoucher) {
		chiTietVoucherRepository.save(chiTietVoucher);
	}

}
