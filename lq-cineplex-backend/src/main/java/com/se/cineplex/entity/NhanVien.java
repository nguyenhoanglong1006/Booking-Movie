package com.se.cineplex.entity;

import java.io.Serializable; 
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "nhanvien")
@AttributeOverride(name = "id", column = @Column(name = "maNhanVien"))
public class NhanVien extends NguoiDung implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String trangThai;

	@ManyToOne
	@JoinColumn(name = "ma_chucvu")
	private ChucVu chucVu;

	@OneToMany(mappedBy = "nhanVien")
	@JsonIgnore
	private List<DonDat> dsDonDat;

	public NhanVien() {
		super();
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ma_diachi", referencedColumnName = "id")
	private DiaChi diaChi;

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public ChucVu getChucVu() {
		return chucVu;
	}

	public void setChucVu(ChucVu chucVu) {
		this.chucVu = chucVu;
	}

	public List<DonDat> getDsDonDat() {
		return dsDonDat;
	}

	public void setDsDonDat(List<DonDat> dsDonDat) {
		this.dsDonDat = dsDonDat;
	}

	public DiaChi getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(DiaChi diaChi) {
		this.diaChi = diaChi;
	}

	@Override
	public String toString() {
		return "NhanVien [trangThai=" + trangThai + ", chucVu=" + chucVu + ", dsDonDat=" + dsDonDat + ", diaChi="
				+ diaChi + "]";
	}

}
