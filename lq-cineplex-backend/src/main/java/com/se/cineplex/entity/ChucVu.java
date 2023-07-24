package com.se.cineplex.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "chucvu")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class ChucVu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenChucVu;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "chucVu")
	@JsonIgnore
	private List<NhanVien> dsNhanVien;

	public ChucVu() {
		super();
	}

	public ChucVu(int id, String tenChucVu) {
		super();
		this.id = id;
		this.tenChucVu = tenChucVu;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenChucVu() {
		return tenChucVu;
	}

	public void setTenChucVu(String tenChucVu) {
		this.tenChucVu = tenChucVu;
	}
	

	public List<NhanVien> getDsNhanVien() {
		return dsNhanVien;
	}

	public void setDsNhanVien(List<NhanVien> dsNhanVien) {
		this.dsNhanVien = dsNhanVien;
	}

	@Override
	public String toString() {
		return "ChucVu [id=" + id + ", tenChucVu=" + tenChucVu + "]";
	}

}
