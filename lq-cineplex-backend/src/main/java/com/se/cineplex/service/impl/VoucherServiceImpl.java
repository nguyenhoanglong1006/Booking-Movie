package com.se.cineplex.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.cineplex.entity.Voucher;
import com.se.cineplex.repository.VoucherRepository;
import com.se.cineplex.service.VoucherService;

import jakarta.transaction.Transactional;

@Service
public class VoucherServiceImpl implements VoucherService {

	@Autowired
	private VoucherRepository voucherRepository;

	@Override
	@Transactional
	public List<Voucher> findAll() {
		return voucherRepository.findAll();
	}

	@Override
	@Transactional
	public Voucher findById(int voucherId) {
		return voucherRepository.findById(voucherId).get();
	}

	@Override
	@Transactional
	public void saveVoucher(Voucher voucher) {
		 voucherRepository.save(voucher);
	}

	@Override
	@Transactional
	public void deleteById(int voucherId) {
		voucherRepository.deleteById(voucherId);
	}

}
