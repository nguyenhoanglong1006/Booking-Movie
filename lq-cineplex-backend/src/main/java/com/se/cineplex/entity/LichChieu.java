package com.se.cineplex.entity;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
 
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "lichchieu")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class LichChieu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	 
	private Time gioBatDau;
	
	private Time gioKetThuc;

	private Date ngayChieu;

	@ManyToOne
	@JoinColumn(name = "ma_phim")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Phim phim;

	@ManyToOne
	@JoinColumn(name = "ma_phongchieu")
	private PhongChieu phongChieu;

	@OneToMany(mappedBy = "lichChieu")
	@JsonIgnore
	private List<Ve> dsVe;

	private String trangThai;

	public LichChieu() {
		super();
	}

	public LichChieu(int id, Time gioBatDau, Time gioKetThuc, Date ngayChieu, Phim phim, PhongChieu phongChieu,
			String trangThai) {
		super();
		this.id = id;
		this.gioBatDau = gioBatDau;
		this.gioKetThuc = gioKetThuc;
		this.ngayChieu = ngayChieu;
		this.phim = phim;
		this.phongChieu = phongChieu;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Time getGioBatDau() {
		return gioBatDau;
	}

	public void setGioBatDau(Time gioBatDau) {
		this.gioBatDau = gioBatDau;
	}

	public Time getGioKetThuc() {
		return gioKetThuc;
	}

	public void setGioKetThuc(Time gioKetThuc) {
		this.gioKetThuc = gioKetThuc;
	}

	public Date getNgayChieu() {
		return ngayChieu;
	}

	public void setNgayChieu(Date ngayChieu) {
		this.ngayChieu = ngayChieu;
	}

	public Phim getPhim() {
		return phim;
	}

	public void setPhim(Phim phim) {
		this.phim = phim;
	}

	public PhongChieu getPhongChieu() {
		return phongChieu;
	}

	public void setPhongChieu(PhongChieu phongChieu) {
		this.phongChieu = phongChieu;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<Ve> getDsVe() {
		return dsVe;
	}

	public void setDsVe(List<Ve> dsVe) {
		this.dsVe = dsVe;
	}

	@Override
	public String toString() {
		return "LichChieu [id=" + id + ", gioBatDau=" + gioBatDau + ", gioKetThuc=" + gioKetThuc + ", ngayChieu="
				+ ngayChieu + ", phim=" + phim + ", phongChieu=" + phongChieu + ", dsVe=" + dsVe + ", trangThai="
				+ trangThai + "]";
	}

}
