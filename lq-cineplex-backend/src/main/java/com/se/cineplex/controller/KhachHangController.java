package com.se.cineplex.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.cineplex.entity.KhachHang;
import com.se.cineplex.service.KhachHangService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class KhachHangController {
	
	@Autowired
	private KhachHangService khachHangService;
	
	@GetMapping("/dskhachhang")
	public List<KhachHang> findAll() {
		return khachHangService.findAll();
	}

	@GetMapping("/dskhachhang/{id}")
	public KhachHang findById(@PathVariable int id) {
		return khachHangService.findById(id);
	}
	
	@GetMapping("/dskhachhang/email/{email}")
	public KhachHang getNhanVienByEmail(@PathVariable String email) {
		return khachHangService.getKhachHangByEmail(email);
	}

	@PostMapping("/dskhachhang")
	public KhachHang addKhachHang(@RequestBody KhachHang khachHang) {
		khachHang.setId(0);
		khachHangService.saveKhachHang(khachHang);
		return khachHang;
	}

	@PutMapping("/dskhachhang")
	public KhachHang updateKhachHang(@RequestBody KhachHang khachHang) {
		khachHangService.saveKhachHang(khachHang);
		return khachHang;
	}

	@DeleteMapping("/dskhachhang/{id}")
	public String deleteById(@PathVariable int id) {
		KhachHang khachHang = khachHangService.findById(id);
		if (khachHang == null) {
			return "Khach Hang Id not found !";
		}
		khachHangService.deleteById(id);
		return "Deleted";

	}

}
