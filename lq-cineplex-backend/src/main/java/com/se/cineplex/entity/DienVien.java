package com.se.cineplex.entity;

import java.io.Serializable; 
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "dienvien")
public class DienVien implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "ten_dien_vien")
	private String tenDienVien;

	@Column(name = "avatar")
	private String avatar;

	@Column(name = "ngay_sinh")
	private Date ngaySinh;

	@Column(name = "quoc_tich")
	private String quocTich;

	@ManyToMany(mappedBy = "dsDienVien")
	private List<Phim> dsPhim;

	public DienVien() {
		super();
	}

	public DienVien(int id, String tenDienVien, String avatar, Date ngaySinh, String quocTich) {
		super();
		this.id = id;
		this.tenDienVien = tenDienVien;
		this.avatar = avatar;
		this.ngaySinh = ngaySinh;
		this.quocTich = quocTich;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenDienVien() {
		return tenDienVien;
	}

	public void setTenDienVien(String tenDienVien) {
		this.tenDienVien = tenDienVien;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Date getNgaySinh() {
		return ngaySinh;
	}

	public void setNgaySinh(Date ngaySinh) {
		this.ngaySinh = ngaySinh;
	}

	public String getQuocTich() {
		return quocTich;
	}

	public void setQuocTich(String quocTich) {
		this.quocTich = quocTich;
	}

//	public List<ChiTietDienVien> getDsChiTietDienVien() {
//		return dsChiTietDienVien;
//	}
//
//	public void setDsChiTietDienVien(List<ChiTietDienVien> dsChiTietDienVien) {
//		this.dsChiTietDienVien = dsChiTietDienVien;
//	}

	@Override
	public String toString() {
		return "DienVien [id=" + id + ", tenDienVien=" + tenDienVien + ", avatar=" + avatar + ", ngaySinh=" + ngaySinh
				+ ", quocTich=" + quocTich + "]";
	}

}
