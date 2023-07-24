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

import com.se.cineplex.entity.Ve;
import com.se.cineplex.service.VeService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class VeController {
	
	@Autowired
	private VeService veService;
	
	@GetMapping("/dsve")
	public List<Ve> findAll() {
		return veService.findAll();
	}
	
	@GetMapping("/dsve/dondat/{maDonDat}")
	public List<Ve> getDsVeMaDonDat(@PathVariable int maDonDat) {
		return veService.getDsVeMaDonDat(maDonDat);
	}
	
	@GetMapping("/dsve/{id}")
	public Ve findById(@PathVariable int id) {
		return veService.findById(id);
	}
	
	@PostMapping("/dsve")
	public Ve addVe(@RequestBody Ve ve) {
		ve.setId(0);
		veService.saveVe(ve);
		return ve;
	}
	
	@PostMapping("/dsve/list")
	public List<Ve> addVe(@RequestBody List<Ve> dsVe) {
		for (Ve ve : dsVe) {
			ve.setId(0);
		}
		veService.saveAllVe(dsVe);
		return dsVe;
	}
	
	@PutMapping("/dsve")
	public Ve updateVe(@RequestBody Ve ve) {
		veService.saveVe(ve);
		return ve;
	}
	
	@DeleteMapping("/dsve/{id}")
	public String deleteById(@PathVariable int id) {
		Ve ve = veService.findById(id);
		if (ve == null) {
			return "Ve Id not found !";
		}
		veService.deleteById(id);
		return "Deleted";
	}


}
