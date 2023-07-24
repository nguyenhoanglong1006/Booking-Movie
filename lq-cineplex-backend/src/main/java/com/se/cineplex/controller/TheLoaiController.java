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

import com.se.cineplex.entity.TheLoai;
import com.se.cineplex.service.TheLoaiService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TheLoaiController {
	
	@Autowired
	private TheLoaiService theLoaiService;

	
	@GetMapping("/dstheloai")
	public List<TheLoai> findAll() {
		return theLoaiService.findAll();
	}
	
	@GetMapping("/dstheloai/{id}")
	public TheLoai findById(@PathVariable int id) {
		return theLoaiService.findById(id);
	}
	
	@PostMapping("/dstheloai")
	public TheLoai addTheLoai(@RequestBody TheLoai theLoai) {
		theLoai.setId(0);
		theLoaiService.saveTheLoai(theLoai);
		return theLoai;
	}
	
	@PutMapping("/dstheloai")
	public TheLoai updateTheLoai(@RequestBody TheLoai theLoai) {
		theLoaiService.saveTheLoai(theLoai);
		return theLoai;
	}
	
	@DeleteMapping("/dstheloai/{id}")
	public String deleteById(@PathVariable int id) {
		TheLoai theLoai = theLoaiService.findById(id);
		if (theLoai == null) {
			return "The Loai Id not found !";
		}
		theLoaiService.deleteById(id);
		return "Deleted";
	}

}
