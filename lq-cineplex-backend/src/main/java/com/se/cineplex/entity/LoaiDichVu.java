package com.se.cineplex.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "loaidichvu")
public class LoaiDichVu implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenLoaiDichVu;

	private String trangThai;

	@OneToMany(mappedBy = "loaiDichVu")
	@JsonIgnore
	private List<DichVu> dsDichVu;

	public LoaiDichVu() {
		super();
	}

	public LoaiDichVu(int id, String tenLoaiDichVu, String trangThai) {
		super();
		this.id = id;
		this.tenLoaiDichVu = tenLoaiDichVu;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenLoaiDichVu() {
		return tenLoaiDichVu;
	}

	public void setTenLoaiDichVu(String tenLoaiDichVu) {
		this.tenLoaiDichVu = tenLoaiDichVu;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<DichVu> getDsDichVu() {
		return dsDichVu;
	}

	public void setDsDichVu(List<DichVu> dsDichVu) {
		this.dsDichVu = dsDichVu;
	}

	@Override
	public String toString() {
		return "LoaiDichVu [id=" + id + ", tenLoaiDichVu=" + tenLoaiDichVu + ", trangThai=" + trangThai + "]";
	}

}
