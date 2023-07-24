package com.se.cineplex.entity;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
@Getter
@Setter
@Table(name = "rap")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Rap {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenRap;

	private String moTa;

	private String hinhAnh;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ma_diachi", referencedColumnName = "id")
	private DiaChi diaChi;

	@OneToMany(mappedBy = "rap")
	@JsonIgnore
	private List<PhongChieu> dsPhongChieu;

	private String trangThai;

	public Rap() {
		super();
	}

	public Rap(int id, String tenRap, String moTa, String hinhAnh, DiaChi diaChi, String trangThai) {
		super();
		this.id = id;
		this.tenRap = tenRap;
		this.moTa = moTa;
		this.hinhAnh = hinhAnh;
		this.diaChi = diaChi;
		this.trangThai = trangThai;
	}

	@Override
	public String toString() {
		return "Rap [id=" + id + ", tenRap=" + tenRap + ", moTa=" + moTa + ", hinhAnh=" + hinhAnh + ", diaChi=" + diaChi
				+ ", dsPhongChieu=" + dsPhongChieu + ", trangThai=" + trangThai + "]";
	}

}
