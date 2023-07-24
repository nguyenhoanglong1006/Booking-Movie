package com.se.cineplex.entity;

import java.sql.Date; 
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "phim")
public class Phim {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String tenPhim;
	private int thoiLuong;
	@Column(columnDefinition = "text")
	private String moTa;
	private String quocGia;
	private String trailer;
	private String poster;
	private Date ngayKhoiChieu;
	private String trangThai;

	@ManyToMany
	@JoinTable(name = "phim_theloai", joinColumns = { @JoinColumn(name = "ma_phim") }, inverseJoinColumns = {
			@JoinColumn(name = "ma_theloai") })
	private List<TheLoai> dsTheLoai;

	@ManyToMany
	@JoinTable(name = "phim_daodien", joinColumns = { @JoinColumn(name = "ma_phim") }, inverseJoinColumns = {
			@JoinColumn(name = "ma_daodien") })
	private List<DaoDien> dsDaoDien;

	@ManyToMany
	@JoinTable(name = "phim_dienvien", joinColumns = { @JoinColumn(name = "ma_phim") }, inverseJoinColumns = {
			@JoinColumn(name = "ma_dienvien") })
	private List<DienVien> dsDienVien;

	@OneToMany(mappedBy = "phim")
	@JsonIgnore
	private List<LichChieu> dsLichChieu;

	public Phim() {
		super();
	}

	public Phim(int id, String tenPhim, int thoiLuong, String moTa, String quocGia, String trailer, String poster,
			Date ngayKhoiChieu, String trangThai) {
		super();
		this.id = id;
		this.tenPhim = tenPhim;
		this.thoiLuong = thoiLuong;
		this.moTa = moTa;
		this.quocGia = quocGia;
		this.trailer = trailer;
		this.poster = poster;
		this.ngayKhoiChieu = ngayKhoiChieu;
		this.trangThai = trangThai;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTenPhim() {
		return tenPhim;
	}

	public void setTenPhim(String tenPhim) {
		this.tenPhim = tenPhim;
	}

	public int getThoiLuong() {
		return thoiLuong;
	}

	public void setThoiLuong(int thoiLuong) {
		this.thoiLuong = thoiLuong;
	}

	public String getMoTa() {
		return moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getQuocGia() {
		return quocGia;
	}

	public void setQuocGia(String quocGia) {
		this.quocGia = quocGia;
	}

	public String getTrailer() {
		return trailer;
	}

	public void setTrailer(String trailer) {
		this.trailer = trailer;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public Date getNgayKhoiChieu() {
		return ngayKhoiChieu;
	}

	public void setNgayKhoiChieu(Date ngayKhoiChieu) {
		this.ngayKhoiChieu = ngayKhoiChieu;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public List<LichChieu> getDsLichChieu() {
		return dsLichChieu;
	}

	public void setDsLichChieu(List<LichChieu> dsLichChieu) {
		this.dsLichChieu = dsLichChieu;
	}

	public List<TheLoai> getDsTheLoai() {
		return dsTheLoai;
	}

	public void setDsTheLoai(List<TheLoai> dsTheLoai) {
		this.dsTheLoai = dsTheLoai;
	}

	public List<DaoDien> getDsDaoDien() {
		return dsDaoDien;
	}

	public void setDsDaoDien(List<DaoDien> dsDaoDien) {
		this.dsDaoDien = dsDaoDien;
	}

	public List<DienVien> getDsDienVien() {
		return dsDienVien;
	}

	public void setDsDienVien(List<DienVien> dsDienVien) {
		this.dsDienVien = dsDienVien;
	}

}
