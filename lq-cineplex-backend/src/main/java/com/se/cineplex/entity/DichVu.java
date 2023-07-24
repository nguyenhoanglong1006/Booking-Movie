package com.se.cineplex.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "dichvu")
public class DichVu implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenDichVu;

	private double donGia;

	private String hinhAnh;

	private String moTa;

	@OneToMany(mappedBy = "dichVu")
	@JsonIgnore
	private List<ChiTietDichVu> dsChiTietDichVu;

	@ManyToOne
	@JoinColumn(name = "ma_loaidichvu")
	private LoaiDichVu loaiDichVu;

	public DichVu() {
		super();
	}

	public DichVu(int id) {
		super();
		this.id = id;
	}

	public DichVu(int id, String tenDichVu, double donGia, String hinhAnh, String moTa) {
		super();
		this.id = id;
		this.tenDichVu = tenDichVu;
		this.donGia = donGia;
		this.hinhAnh = hinhAnh;
		this.moTa = moTa;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenDichVu() {
		return tenDichVu;
	}

	public void setTenDichVu(String tenDichVu) {
		this.tenDichVu = tenDichVu;
	}

	public double getDonGia() {
		return donGia;
	}

	public void setDonGia(double donGia) {
		this.donGia = donGia;
	}

	public String getHinhAnh() {
		return hinhAnh;
	}

	public void setHinhAnh(String hinhAnh) {
		this.hinhAnh = hinhAnh;
	}

	public String getMoTa() {
		return moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public List<ChiTietDichVu> getDsChiTietDichVu() {
		return dsChiTietDichVu;
	}

	public void setDsChiTietDichVu(List<ChiTietDichVu> dsChiTietDichVu) {
		this.dsChiTietDichVu = dsChiTietDichVu;
	}

	public LoaiDichVu getLoaiDichVu() {
		return loaiDichVu;
	}

	public void setLoaiDichVu(LoaiDichVu loaiDichVu) {
		this.loaiDichVu = loaiDichVu;
	}

	@Override
	public String toString() {
		return "DichVu [id=" + id + ", tenDichVu=" + tenDichVu + ", donGia=" + donGia + ", hinhAnh=" + hinhAnh
				+ ", moTa=" + moTa + "]";
	}

}
