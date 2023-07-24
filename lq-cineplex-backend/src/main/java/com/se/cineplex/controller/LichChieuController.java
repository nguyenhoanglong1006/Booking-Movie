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

import com.se.cineplex.entity.LichChieu;
import com.se.cineplex.service.LichChieuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class LichChieuController {

	@Autowired
	private LichChieuService lichChieuService;

	@GetMapping("/dslichchieu")
	public List<LichChieu> findAll() {
		return lichChieuService.findAll();
	}

	@GetMapping("/dslichchieu/maPhim/{maPhim}/maRap/{maRap}")
	public List<LichChieu> getDsLichChieuByPhimRap(@PathVariable int maPhim, @PathVariable int maRap) {
		return lichChieuService.getDsLichChieuByPhimRap(maPhim, maRap);
	}
	
	@GetMapping("/dslichchieu/maPhim/maRap/ngayChieu")
	public List<LichChieu> getDsLichChieuByPhimRapNgayChieu(@RequestParam int maPhim, @RequestParam int maRap, @RequestParam  String ngayChieu) {
		return lichChieuService.getDsLichChieuByPhimRapNgayChieu(maPhim, maRap, ngayChieu);
	}

	@GetMapping("/dslichchieu/{id}")
	public LichChieu findById(@PathVariable int id) {
		return lichChieuService.findById(id);
	}

	@PostMapping("/dslichchieu")
	public LichChieu addLichChieu(@RequestBody LichChieu lichChieu) {
		lichChieu.setId(0);
		lichChieuService.saveLichChieu(lichChieu);
		return lichChieu;
	}

	@PutMapping("/dslichchieu")
	public LichChieu updateLichChieu(@RequestBody LichChieu lichChieu) {
		lichChieuService.saveLichChieu(lichChieu);
		return lichChieu;
	}

	@DeleteMapping("/dsichchieu/{id}")
	public String deleteById(@PathVariable int id) {
		LichChieu lichChieu = lichChieuService.findById(id);
		if (lichChieu == null) {
			return "Lich Chieu Id not found !";
		}
		lichChieuService.deleteById(id);
		return "Deleted";
	}

}
