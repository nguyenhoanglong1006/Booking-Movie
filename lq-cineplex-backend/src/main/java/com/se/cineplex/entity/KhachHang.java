package com.se.cineplex.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "khachhang")
@AttributeOverride(name = "id", column = @Column(name = "maKhachHang"))
public class KhachHang extends NguoiDung implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ma_diachi", referencedColumnName = "id")
	private DiaChi diaChi;
	
	@OneToMany(mappedBy = "khachHang")
	@JsonIgnore
	private List<DonDat> dsDonDat;

	public KhachHang() {
		super();
	}

	public KhachHang(int id, String ten, Date ngaySinh, String gioiTinh, String dienThoai, String email, String avatar,
			DiaChi diaChi) {
		super(id, ten, ngaySinh, gioiTinh, dienThoai, email, avatar);
		this.diaChi = diaChi;
	}

	@Override
	public String toString() {
		return "KhachHang [diaChi=" + diaChi + ", dsDonDat=" + dsDonDat + "]";
	}

	public DiaChi getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(DiaChi diaChi) {
		this.diaChi = diaChi;
	}

	public List<DonDat> getDsDonDat() {
		return dsDonDat;
	}

	public void setDsDonDat(List<DonDat> dsDonDat) {
		this.dsDonDat = dsDonDat;
	}
	
	

}
