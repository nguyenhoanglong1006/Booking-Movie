package com.se.cineplex.service;

import java.util.List;

import com.se.cineplex.entity.Voucher;

public interface VoucherService {
	
	public List<Voucher> findAll();

	public Voucher findById(int voucherId);

	public void saveVoucher(Voucher voucher);

	public void deleteById(int voucherId);


}
