package com.se.cineplex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "diachi")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class DiaChi {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String phuongXa;

	private String quanHuyen;

	private String tinhThanhPho;

	@OneToOne(mappedBy = "diaChi")
	@JsonIgnore
	private Rap rap;
	 
	@OneToOne(mappedBy = "diaChi")
	@JsonIgnore
	private KhachHang khachHang;
	
	@OneToOne(mappedBy = "diaChi")
	@JsonIgnore
	private NhanVien nhanVien;

	public DiaChi() {
		super();
	}

	public DiaChi(int id, String phuongXa, String quanHuyen, String tinhThanhPho) {
		super();
		this.id = id;
		this.phuongXa = phuongXa;
		this.quanHuyen = quanHuyen;
		this.tinhThanhPho = tinhThanhPho;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPhuongXa() {
		return phuongXa;
	}

	public void setPhuongXa(String phuongXa) {
		this.phuongXa = phuongXa;
	}

	public String getQuanHuyen() {
		return quanHuyen;
	}

	public void setQuanHuyen(String quanHuyen) {
		this.quanHuyen = quanHuyen;
	}

	public String getTinhThanhPho() {
		return tinhThanhPho;
	}

	public void setTinhThanhPho(String tinhThanhPho) {
		this.tinhThanhPho = tinhThanhPho;
	}

	public Rap getRap() {
		return rap;
	}

	public void setRap(Rap rap) {
		this.rap = rap;
	}

	public KhachHang getKhachHang() {
		return khachHang;
	}

	public void setKhachHang(KhachHang khachHang) {
		this.khachHang = khachHang;
	}

	@Override
	public String toString() {
		return "DiaChi [id=" + id + ", phuongXa=" + phuongXa + ", quanHuyen=" + quanHuyen + ", tinhThanhPho="
				+ tinhThanhPho + "]";
	}

}
