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

import com.se.cineplex.entity.Rap;
import com.se.cineplex.service.RapService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RapController {
	
	@Autowired
	private RapService rapService;
	
	@GetMapping("/dsrap")
	public List<Rap> findAll(@RequestParam(required = false) String tinhThanhPho) {
	
			if(tinhThanhPho == null) {
				return rapService.findAll();
			} else {
				return rapService.getDSRapByTinhThanhPho(tinhThanhPho);
			}
		 
	}
	
	@GetMapping("/dsrap/{id}")
	public Rap findById(@PathVariable int id) {
		return rapService.findById(id);
	}
	
	@PostMapping("/dsrap")
	public Rap addRap(@RequestBody Rap rap) {
		rap.setId(0);
		rapService.saveRap(rap);
		return rap;
	}
	
	@PutMapping("/dsrap")
	public Rap updateRap(@RequestBody Rap rap) {
		rapService.saveRap(rap);
		return rap;
	}
	
	@DeleteMapping("/dsrap/{id}")
	public String deleteById(@PathVariable int id) {
		Rap rap = rapService.findById(id);
		if (rap == null) {
			return "Rap Id not found !";
		}
		rapService.deleteById(id);
		return "Deleted";
	}

}
