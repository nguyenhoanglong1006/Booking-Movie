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

import com.se.cineplex.entity.LoaiPhongChieu;
import com.se.cineplex.service.LoaiPhongChieuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class LoaiPhongChieuController {

	@Autowired
	private LoaiPhongChieuService loaiPhongChieuService;

	@GetMapping("/dsloaiphongchieu")
	public List<LoaiPhongChieu> findAll() {
		return loaiPhongChieuService.findAll();
	}

	@GetMapping("/dsloaiphongchieu/{id}")
	public LoaiPhongChieu findById(@PathVariable int id) {
		return loaiPhongChieuService.findById(id);
	}

	@PostMapping("/dsloaiphongchieu")
	public LoaiPhongChieu addLoaiPhongChieu(@RequestBody LoaiPhongChieu loaiPhongChieu) {
		loaiPhongChieu.setId(0);
		loaiPhongChieuService.saveLoaiPhongChieu(loaiPhongChieu);
		return loaiPhongChieu;
	}

	@PutMapping("/dsloaiphongchieu")
	public LoaiPhongChieu updateLoaiPhongChieu(@RequestBody LoaiPhongChieu loaiPhongChieu) {
		loaiPhongChieuService.saveLoaiPhongChieu(loaiPhongChieu);
		return loaiPhongChieu;
	}

	@DeleteMapping("/dsloaiphongchieu/{id}")
	public String deleteById(@PathVariable int id) {
		LoaiPhongChieu loaiPhongChieu = loaiPhongChieuService.findById(id);
		if (loaiPhongChieu == null) {
			return "Loai Phong Chieu Id not found !";
		}
		loaiPhongChieuService.deleteById(id);
		return "Deleted";
	}

}
