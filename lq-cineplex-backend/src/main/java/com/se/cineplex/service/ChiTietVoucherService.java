package com.se.cineplex.service;

import java.util.List; 

import com.se.cineplex.entity.ChiTietVoucher;

public interface ChiTietVoucherService {

	public List<ChiTietVoucher> findAll();

	public void saveChiTietVoucher(ChiTietVoucher chiTietVoucher);

}
