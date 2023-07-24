package com.se.cineplex.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "voucher")
public class Voucher {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String tenVoucher;

	private Date ngayBatDau;

	private Date ngayKetThuc;

	private int soLuong;

	private double giaTri;

	private String trangThai;

	private String maVoucher;

	@OneToMany(mappedBy = "voucher")
	private List<ChiTietVoucher> dsChiTietVoucher;

	public Voucher() {
		super();
	}

	public Voucher(int id, String tenVoucher, Date ngayBatDau, Date ngayKetThuc, int soLuong, double giaTri,
			String trangThai, String maVoucher, List<ChiTietVoucher> dsChiTietVoucher) {
		super();
		this.id = id;
		this.tenVoucher = tenVoucher;
		this.ngayBatDau = ngayBatDau;
		this.ngayKetThuc = ngayKetThuc;
		this.soLuong = soLuong;
		this.giaTri = giaTri;
		this.trangThai = trangThai;
		this.maVoucher = maVoucher;
		this.dsChiTietVoucher = dsChiTietVoucher;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenVoucher() {
		return tenVoucher;
	}

	public void setTenVoucher(String tenVoucher) {
		this.tenVoucher = tenVoucher;
	}

	public Date getNgayBatDau() {
		return ngayBatDau;
	}

	public void setNgayBatDau(Date ngayBatDau) {
		this.ngayBatDau = ngayBatDau;
	}

	public Date getNgayKetThuc() {
		return ngayKetThuc;
	}

	public void setNgayKetThuc(Date ngayKetThuc) {
		this.ngayKetThuc = ngayKetThuc;
	}

	public int getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(int soLuong) {
		this.soLuong = soLuong;
	}

	public double getGiaTri() {
		return giaTri;
	}

	public void setGiaTri(double giaTri) {
		this.giaTri = giaTri;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public String getMaVoucher() {
		return maVoucher;
	}

	public void setMaVoucher(String maVoucher) {
		this.maVoucher = maVoucher;
	}

	public List<ChiTietVoucher> getDsChiTietVoucher() {
		return dsChiTietVoucher;
	}

	public void setDsChiTietVoucher(List<ChiTietVoucher> dsChiTietVoucher) {
		this.dsChiTietVoucher = dsChiTietVoucher;
	}

	@Override
	public String toString() {
		return "Voucher [id=" + id + ", tenVoucher=" + tenVoucher + ", ngayBatDau=" + ngayBatDau + ", ngayKetThuc="
				+ ngayKetThuc + ", soLuong=" + soLuong + ", giaTri=" + giaTri + ", trangThai=" + trangThai
				+ ", maVoucher=" + maVoucher + ", dsChiTietVoucher=" + dsChiTietVoucher + "]";
	}

}
