package com.se.cineplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "theloai")
public class TheLoai {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenTheLoai;

	@ManyToMany(mappedBy = "dsTheLoai")
	@JsonIgnore
	private List<Phim> dsPhim;

	public TheLoai() {
		super();
	}

	public TheLoai(int id, String tenTheLoai) {
		super();
		this.id = id;
		this.tenTheLoai = tenTheLoai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenTheLoai() {
		return tenTheLoai;
	}

	public void setTenTheLoai(String tenTheLoai) {
		this.tenTheLoai = tenTheLoai;
	}

	public List<Phim> getDsPhim() {
		return dsPhim;
	}

	public void setDsPhim(List<Phim> dsPhim) {
		this.dsPhim = dsPhim;
	}

}
