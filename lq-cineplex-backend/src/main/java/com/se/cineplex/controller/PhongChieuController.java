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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.se.cineplex.entity.PhongChieu;
import com.se.cineplex.service.PhongChieuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class PhongChieuController {

	@Autowired
	private PhongChieuService phongChieuService;

	@GetMapping("/dsphongchieu")
	public List<PhongChieu> findAll() {
		return phongChieuService.findAll();
	}

	@GetMapping("/dsphongchieu/dsphongtrong")
	public List<PhongChieu> getDsPhongChieuTrong(@RequestParam int maRap,
			@RequestParam String ngayChieu, @RequestParam String gioBatDau,
			@RequestParam String gioKetThuc) {
		return phongChieuService.getDsPhongTrong(maRap, ngayChieu, gioBatDau, gioKetThuc);

	}

	@GetMapping("/dsphongchieu/{id}")
	public PhongChieu findById(@PathVariable int id) {
		return phongChieuService.findById(id);
	}

	@PostMapping("/dsphongchieu")
	public PhongChieu addPhongChieu(@RequestBody PhongChieu phongChieu) {
		phongChieu.setId(0);
		phongChieuService.savePhongChieu(phongChieu);
		return phongChieu;
	}

	@PutMapping("/dsphongchieu")
	public PhongChieu updatePhongChieu(@RequestBody PhongChieu phongChieu) {
		phongChieuService.savePhongChieu(phongChieu);
		return phongChieu;
	}

	@DeleteMapping("/dsphongchieu/{id}")
	public String deleteById(@PathVariable int id) {
		PhongChieu phongChieu = phongChieuService.findById(id);
		if (phongChieu == null) {
			return "Phong Chieu Id not found !";
		}
		phongChieuService.deleteById(id);
		return "Deleted";
	}
}
