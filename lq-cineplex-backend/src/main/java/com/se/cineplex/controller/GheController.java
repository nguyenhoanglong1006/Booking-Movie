package com.se.cineplex.controller;

import java.util.ArrayList;
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

import com.se.cineplex.entity.Ghe;
import com.se.cineplex.entity.LoaiGhe;
import com.se.cineplex.entity.PhongChieu;
import com.se.cineplex.service.GheService;
import com.se.cineplex.service.LoaiGheService;
import com.se.cineplex.service.PhongChieuService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class GheController {
	
	@Autowired
	private GheService gheService;
	
	@Autowired
	private LoaiGheService loaiGheService;
	
	@Autowired
	private PhongChieuService phongChieuService;
	
	@GetMapping("/dsghe")
	public List<Ghe> findAll() {
		return gheService.findAll();
	}
	
	@GetMapping("/dsghe/maphongchieu/{maPhongChieu}")
	public List<Ghe> findAllByMaPhongChieu(@PathVariable int maPhongChieu) {
		return gheService.findAllByMaPhongChieu(maPhongChieu);
	}
	
	@GetMapping("/dsghe/malichchieu/{maLichChieu}")
	public List<Ghe> getDsGheDaBanLichChieu(@PathVariable int maLichChieu){
		return gheService.getDsGheDaBanLichChieu(maLichChieu);
	}

	@GetMapping("/dsghe/{id}")
	public Ghe findById(@PathVariable int id) {
		return gheService.findById(id);
	}

	@PostMapping("/dsghe")
	public Ghe addGhe(@RequestBody Ghe ghe) {
		ghe.setId(0);
		gheService.saveGhe(ghe);
		return ghe;
	}
	
	@PostMapping("/dsghe/loaighe/{maloaighe}/phongchieu/{maphongchieu}")
	public List<Ghe> addAllGhe(@PathVariable int maloaighe, @PathVariable int maphongchieu) {
		LoaiGhe loaiGhe = loaiGheService.findById(maloaighe);
		PhongChieu phongChieu = phongChieuService.findById(maphongchieu);
		List<Ghe> dsGhe = new ArrayList<Ghe>();
		String[] hangs = {"A", "B", "C", "D", "E", "F", "G", "H"};
		int[] cots = {1,2,3,4,5,6,7,8};
		for(int i = 0; i <= hangs.length-1; i ++) {
			for(int j = 0; j <= cots.length-1; j++) {
				Ghe ghe = new Ghe();
				ghe.setHang(hangs[i]);
				ghe.setCot(cots[j]);
				ghe.setLoaiGhe(loaiGhe);
				ghe.setPhongChieu(phongChieu);
				ghe.setTrangThai("trong");
				dsGhe.add(ghe);
			}
		}
		gheService.saveAllGhe(dsGhe);
		return dsGhe;
	}

	@PutMapping("/dsghe")
	public Ghe updateGhe(@RequestBody Ghe ghe) {
		gheService.saveGhe(ghe);
		return ghe;
	}

	@DeleteMapping("/dsghe/{id}")
	public String deleteById(@PathVariable int id) {
		Ghe ghe = gheService.findById(id);
		if (ghe == null) {
			return "Ghe Id not found !";
		}
		gheService.deleteById(id);
		return "Deleted";

	}

}
