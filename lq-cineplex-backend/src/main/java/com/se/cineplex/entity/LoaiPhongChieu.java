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
@Table(name = "loaiphongchieu")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class LoaiPhongChieu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenLoaiPhongChieu;

	private String trangThai;

	@OneToMany(mappedBy = "loaiPhongChieu")
	@JsonIgnore
	private List<PhongChieu> dsPhongChieu;

	public LoaiPhongChieu() {
		super();
	}

	public LoaiPhongChieu(int id, String tenLoaiPhongChieu, String trangThai) {
		super();
		this.id = id;
		this.tenLoaiPhongChieu = tenLoaiPhongChieu;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenLoaiPhongChieu() {
		return tenLoaiPhongChieu;
	}

	public void setTenLoaiPhongChieu(String tenLoaiPhongChieu) {
		this.tenLoaiPhongChieu = tenLoaiPhongChieu;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<PhongChieu> getDsPhongChieu() {
		return dsPhongChieu;
	}

	public void setDsPhongChieu(List<PhongChieu> dsPhongChieu) {
		this.dsPhongChieu = dsPhongChieu;
	}

	@Override
	public String toString() {
		return "LoaiPhongChieu [id=" + id + ", tenLoaiPhongChieu=" + tenLoaiPhongChieu + ", trangThai=" + trangThai
				+ ", dsPhongChieu=" + dsPhongChieu + "]";
	}

}
