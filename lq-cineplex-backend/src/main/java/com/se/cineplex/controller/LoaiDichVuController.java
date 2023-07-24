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

import com.se.cineplex.entity.LoaiDichVu;
import com.se.cineplex.service.LoaiDichVuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class LoaiDichVuController {
	
	@Autowired
	private LoaiDichVuService loaiDichVuService;
	
	@GetMapping("/dsloaidichvu")
	public List<LoaiDichVu> findAll() {
		return loaiDichVuService.findAll();
	}
	
	@GetMapping("/dsloaidichvu/{id}")
	public LoaiDichVu findById(@PathVariable int id) {
		return loaiDichVuService.findById(id);
	}
	
	@PostMapping("/dsloaidichvu")
	public LoaiDichVu addLoaiDichVu(@RequestBody LoaiDichVu loaiDichVu) {
		loaiDichVu.setId(0);
		loaiDichVuService.saveLoaiDichVu(loaiDichVu);
		return loaiDichVu;
	}
	
	@PutMapping("/dsloaidichvu")
	public LoaiDichVu updateLoaiDichVu(@RequestBody LoaiDichVu loaiDichVu) {
		loaiDichVuService.saveLoaiDichVu(loaiDichVu);
		return loaiDichVu;
	}
	
	@DeleteMapping("/dsloaidichvu/{id}")
	public String deleteById(@PathVariable int id) {
		LoaiDichVu loaiDichVu = loaiDichVuService.findById(id);
		if (loaiDichVu == null) {
			return "Loai Dich Vu Id not found !";
		}
		loaiDichVuService.deleteById(id);
		return "Deleted";
	}


}
