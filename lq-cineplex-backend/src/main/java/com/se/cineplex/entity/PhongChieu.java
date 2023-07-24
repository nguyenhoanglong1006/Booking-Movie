package com.se.cineplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "phongchieu")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class PhongChieu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenPhongChieu;

	private String trangThai;

	@ManyToOne
	@JoinColumn(name = "ma_loaiphongchieu")
	private LoaiPhongChieu loaiPhongChieu;

	@ManyToOne
	@JoinColumn(name = "ma_rap")
	private Rap rap;

	@OneToMany(mappedBy = "phongChieu")
	@JsonIgnore
	private List<Ghe> dsGhe;

	@OneToMany(mappedBy = "phongChieu")
	@JsonIgnore
	private List<LichChieu> dsLichChieu;

	public PhongChieu() {
		super();
	}

	public PhongChieu(int id, String tenPhongChieu, String trangThai) {
		super();
		this.id = id;
		this.tenPhongChieu = tenPhongChieu;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenPhongChieu() {
		return tenPhongChieu;
	}

	public void setTenPhongChieu(String tenPhongChieu) {
		this.tenPhongChieu = tenPhongChieu;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public Rap getRap() {
		return rap;
	}

	public void setRap(Rap rap) {
		this.rap = rap;
	}

	public LoaiPhongChieu getLoaiPhongChieu() {
		return loaiPhongChieu;
	}

	public void setLoaiPhongChieu(LoaiPhongChieu loaiPhongChieu) {
		this.loaiPhongChieu = loaiPhongChieu;
	}

	public List<Ghe> getDsGhe() {
		return dsGhe;
	}

	public void setDsGhe(List<Ghe> dsGhe) {
		this.dsGhe = dsGhe;
	}

	public List<LichChieu> getDsLichChieu() {
		return dsLichChieu;
	}

	public void setDsLichChieu(List<LichChieu> dsLichChieu) {
		this.dsLichChieu = dsLichChieu;
	}

	@Override
	public String toString() {
		return "PhongChieu [id=" + id + ", tenPhongChieu=" + tenPhongChieu + ", trangThai=" + trangThai
				+ ", loaiPhongChieu=" + loaiPhongChieu + ", rap=" + rap + ", dsGhe=" + dsGhe + ", dsLichChieu="
				+ dsLichChieu + "]";
	}

}
