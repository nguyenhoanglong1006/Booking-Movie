package com.se.cineplex.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(ChiTietDichVuPK.class)
public class ChiTietDichVu {

	@Id
	@ManyToOne
	@JoinColumn(name = "ma_dondat")
	private DonDat donDat;

	@Id
	@ManyToOne
	@JoinColumn(name = "ma_dichvu")
	private DichVu dichVu;

	private int soLuong;

	private double thanhTien;

	public ChiTietDichVu() {
		super();
	}

	public ChiTietDichVu(int soLuong, double thanhTien) {
		super();
		this.soLuong = soLuong;
		this.thanhTien = thanhTien;
	}

	public ChiTietDichVu(DonDat donDat, DichVu dichVu, int soLuong, double thanhTien) {
		super();
		this.donDat = donDat;
		this.dichVu = dichVu;
		this.soLuong = soLuong;
		this.thanhTien = thanhTien;
	}

	public int getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public double getThanhTien() {
		return thanhTien;
	}

	public void setThanhTien(double thanhTien) {
		this.thanhTien = thanhTien;
	}

	public DichVu getDichVu() {
		return dichVu;
	}

	public void setDichVu(DichVu dichVu) {
		this.dichVu = dichVu;
	}

	public DonDat getDonDat() {
		return donDat;
	}

	public void setDonDat(DonDat donDat) {
		this.donDat = donDat;
	}

	@Override
	public String toString() {
		return "ChiTietDichVu [soLuong=" + soLuong + ", thanhTien=" + thanhTien + "]";
	}

}
