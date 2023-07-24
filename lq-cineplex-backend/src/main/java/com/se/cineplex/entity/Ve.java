package com.se.cineplex.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ve")
public class Ve {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private double giaVe;

	@ManyToOne
	@JoinColumn(name = "ma_ghe")
	private Ghe ghe;

	@ManyToOne
	@JoinColumn(name = "ma_lichchieu")
	private LichChieu lichChieu;

	@ManyToOne
	@JoinColumn(name = "ma_dondat")
	private DonDat donDat;

	public Ve() {
		super();
	}

	public Ve(int id, double giaVe, Ghe ghe, LichChieu lichChieu, DonDat donDat) {
		super();
		this.id = id;
		this.giaVe = giaVe;
		this.ghe = ghe;
		this.lichChieu = lichChieu;
		this.donDat = donDat;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getGiaVe() {
		return giaVe;
	}

	public void setGiaVe(double giaVe) {
		this.giaVe = giaVe;
	}

	public Ghe getGhe() {
		return ghe;
	}

	public void setGhe(Ghe ghe) {
		this.ghe = ghe;
	}

	public LichChieu getLichChieu() {
		return lichChieu;
	}

	public void setLichChieu(LichChieu lichChieu) {
		this.lichChieu = lichChieu;
	}

	public DonDat getDonDat() {
		return donDat;
	}

	public void setDonDat(DonDat donDat) {
		this.donDat = donDat;
	}

	@Override
	public String toString() {
		return "Ve [id=" + id + ", giaVe=" + giaVe + ", ghe=" + ghe + ", lichChieu=" + lichChieu + ", donDat=" + donDat
				+ "]";
	}

}
