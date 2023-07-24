package com.se.cineplex.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "daodien")
public class DaoDien {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenDaoDien;

	private String avatar;

	private Date ngaySinh;

	private String quocTich;

	@ManyToMany(mappedBy = "dsDaoDien")
	private List<Phim> dsPhim;

	public DaoDien() {
		super();
	}

	public DaoDien(int id, String tenDaoDien, String avatar, Date ngaySinh, String quocTich) {
		super();
		this.id = id;
		this.tenDaoDien = tenDaoDien;
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

	public String getTenDaoDien() {
		return tenDaoDien;
	}

	public void setTenDaoDien(String tenDaoDien) {
		this.tenDaoDien = tenDaoDien;
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

	@Override
	public String toString() {
		return "DaoDien [id=" + id + ", tenDaoDien=" + tenDaoDien + ", avatar=" + avatar + ", ngaySinh=" + ngaySinh
				+ ", quocTich=" + quocTich + "]";
	}

}
