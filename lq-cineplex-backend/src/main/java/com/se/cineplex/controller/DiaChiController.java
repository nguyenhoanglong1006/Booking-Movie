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

import com.se.cineplex.entity.DiaChi;
import com.se.cineplex.service.DiaChiService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class DiaChiController {
	
	@Autowired
	private DiaChiService diaChiService;
	
	@GetMapping("/dsdiachi")
	public List<DiaChi> findAll() {
		return diaChiService.findAll();
		
	}
	
	@GetMapping("/dsdiachi/{id}")
	public DiaChi findById(@PathVariable int id) {
		return diaChiService.findById(id);
	}

	@PostMapping("/dsdiachi")
	public DiaChi addDiaChi(@RequestBody DiaChi diaChi) {
		diaChi.setId(0);
		diaChiService.saveDiaChi(diaChi);
		return diaChi;
	}

	@PutMapping("/dsdiachi")
	public DiaChi updatePhim(@RequestBody DiaChi diaChi) {
		diaChiService.saveDiaChi(diaChi);
		return diaChi;
	}

	@DeleteMapping("/dsdiachi/{id}")
	public String deleteById(@PathVariable int id) {
		DiaChi diaChi = diaChiService.findById(id);
		if (diaChi == null) {
			return "Dia Chi Id not found !";
		}
		diaChiService.deleteById(id);
		return "Deleted";
	}

}
