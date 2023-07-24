package com.se.cineplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "loaighe")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class LoaiGhe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenLoaiGhe;

	private String trangThai;

	@OneToMany(mappedBy = "loaiGhe")
	@JsonIgnore
	private List<Ghe> dsGhe;

	public LoaiGhe() {
		super();
	}

	public LoaiGhe(int id, String tenLoaiGhe, String trangThai) {
		super();
		this.id = id;
		this.tenLoaiGhe = tenLoaiGhe;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenLoaiGhe() {
		return tenLoaiGhe;
	}

	public void setTenLoaiGhe(String tenLoaiGhe) {
		this.tenLoaiGhe = tenLoaiGhe;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<Ghe> getDsGhe() {
		return dsGhe;
	}

	public void setDsGhe(List<Ghe> dsGhe) {
		this.dsGhe = dsGhe;
	}

	@Override
	public String toString() {
		return "LoaiGhe [id=" + id + ", tenLoaiGhe=" + tenLoaiGhe + ", trangThai=" + trangThai + ", dsGhe=" + dsGhe
				+ "]";
	}

}
