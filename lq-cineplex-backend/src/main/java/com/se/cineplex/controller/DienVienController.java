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

import com.se.cineplex.entity.DienVien;
import com.se.cineplex.service.DienVienService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class DienVienController {

	@Autowired
	private DienVienService dienVienService;

	@GetMapping("/dsdienvien")
	public List<DienVien> findAll() {
		return dienVienService.findAll();
	}

	@GetMapping("/dsdienvien/{id}")
	public DienVien findById(@PathVariable int id) {
		return dienVienService.findById(id);
	}

	@PostMapping("/dsdienvien")
	public DienVien addDienVien(@RequestBody DienVien dienVien) {
		dienVien.setId(0);
		dienVienService.saveDienVien(dienVien);
		return dienVien;
	}

	@PutMapping("/dsdienvien")
	public DienVien updateDienVien(@RequestBody DienVien dienVien) {
		dienVienService.saveDienVien(dienVien);
		return dienVien;
	}

	@DeleteMapping("/dsdienvien/{id}")
	public String deleteById(@PathVariable int id) {
		DienVien dienVien = dienVienService.findById(id);
		if (dienVien == null) {
			return "Dien Vien Id not found !";
		}
		dienVienService.deleteById(id);
		return "Deleted";
	}
}
