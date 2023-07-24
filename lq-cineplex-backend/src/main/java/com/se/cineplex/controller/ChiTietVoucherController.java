package com.se.cineplex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.cineplex.entity.ChiTietVoucher;
import com.se.cineplex.service.ChiTietVoucherService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ChiTietVoucherController {
	
	@Autowired
	private ChiTietVoucherService chiTietVoucherService;
	
	
	@GetMapping("/dschitietvoucher")
	public List<ChiTietVoucher> findAll() {
		return chiTietVoucherService.findAll();
	}
	
	@PostMapping("/dschitietvoucher")
	public ChiTietVoucher addChiTietVoucher(@RequestBody ChiTietVoucher chiTietVoucher) {
		chiTietVoucherService.saveChiTietVoucher(chiTietVoucher);
		return chiTietVoucher;
	}

}
