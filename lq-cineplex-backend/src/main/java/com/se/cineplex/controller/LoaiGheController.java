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

import com.se.cineplex.entity.LoaiGhe;
import com.se.cineplex.service.LoaiGheService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class LoaiGheController {
	
	@Autowired
	private LoaiGheService loaiGheService;
	
	@GetMapping("/dsloaighe")
	public List<LoaiGhe> findAll() {
		return loaiGheService.findAll();
	}

	@GetMapping("/dsloaighe/{id}")
	public LoaiGhe findById(@PathVariable int id) {
		return loaiGheService.findById(id);
	}

	@PostMapping("/dsloaighe")
	public LoaiGhe addLoaiGhe(@RequestBody LoaiGhe loaiGhe) {
		loaiGhe.setId(0);
		loaiGheService.saveLoaiGhe(loaiGhe);
		return loaiGhe;
	}

	@PutMapping("/dsloaighe")
	public LoaiGhe updateLoaiGhe(@RequestBody LoaiGhe loaiGhe) {
		loaiGheService.saveLoaiGhe(loaiGhe);
		return loaiGhe;
	}

	@DeleteMapping("/dsloaighe/{id}")
	public String deleteById(@PathVariable int id) {
		LoaiGhe loaiGhe = loaiGheService.findById(id);
		if (loaiGhe == null) {
			return "Loai Ghe Id not found !";
		}
		loaiGheService.deleteById(id);
		return "Deleted";

	}

}
