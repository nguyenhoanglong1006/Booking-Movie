package com.se.cineplex.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.cineplex.entity.Phim;
import com.se.cineplex.service.PhimService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class PhimController {

	@Autowired
	private PhimService phimService;

	@GetMapping("/dsphim")
//	@PreAuthorize("hasRole('ADMIN')")
	public List<Phim> findAll() {
		return phimService.findAll();
	}
	
	@GetMapping("/dsphim/marap/{maRap}")
	public List<Phim> getDSPhimByMaRap(@PathVariable int maRap) {
		return phimService.getDSPhimByMaRap(maRap);
	}
	
	@GetMapping("/dsphim/dangsapchieu")
	public List<Phim> getDSPhimDangSapChieu() {
		return phimService.getDsPhimDangSapChieu();
	}

	@GetMapping("/dsphim/{id}")
	public Phim findById(@PathVariable int id) {
		return phimService.findById(id);
	}

	@PostMapping("/dsphim")
	public Phim addPhim(@RequestBody Phim phim) {
		phim.setId(0);
		phimService.savePhim(phim);
		return phim;
	}

	@PutMapping("/dsphim")
	public Phim updatePhim(@RequestBody Phim phim) {
		phimService.savePhim(phim);
		return phim;
	}

	@DeleteMapping("/dsphim/{id}")
	public String deleteById(@PathVariable int id) {
		Phim phim = phimService.findById(id);
		if (phim == null) {
			return "Phim Id not found !";
		}
		phimService.deleteById(id);
		return "Deleted";
	}

}
