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
@Table(name = "ghe")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Ghe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String hang;

	private int cot;

	private String trangThai;

	@ManyToOne
	@JoinColumn(name = "ma_phongchieu")
	private PhongChieu phongChieu;

	@ManyToOne
	@JoinColumn(name = "ma_loaighe")
	private LoaiGhe loaiGhe;

	@OneToMany(mappedBy = "ghe")
	@JsonIgnore
	private List<Ve> dsVe;

	public Ghe() {
		super();
	}

	public Ghe(int id, String hang, int cot, String trangThai) {
		super();
		this.id = id;
		this.hang = hang;
		this.cot = cot;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getHang() {
		return hang;
	}

	public void setHang(String hang) {
		this.hang = hang;
	}

	public int getCot() {
		return cot;
	}

	public void setCot(int cot) {
		this.cot = cot;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public PhongChieu getPhongChieu() {
		return phongChieu;
	}

	public void setPhongChieu(PhongChieu phongChieu) {
		this.phongChieu = phongChieu;
	}

	public LoaiGhe getLoaiGhe() {
		return loaiGhe;
	}

	public void setLoaiGhe(LoaiGhe loaiGhe) {
		this.loaiGhe = loaiGhe;
	}

	public List<Ve> getDsVe() {
		return dsVe;
	}

	public void setDsVe(List<Ve> dsVe) {
		this.dsVe = dsVe;
	}

	@Override
	public String toString() {
		return "Ghe [id=" + id + ", hang=" + hang + ", cot=" + cot + ", trangThai=" + trangThai + ", phongChieu="
				+ phongChieu + ", loaiGhe=" + loaiGhe + "]";
	}

}
