package com.se.cineplex.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ChiTietVoucherPK implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int donDat;

	private int voucher;

	public ChiTietVoucherPK() {
		super();
	}

	@Override
	public String toString() {
		return "ChiTietVoucherPK [donDat=" + donDat + ", voucher=" + voucher + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(donDat, voucher);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChiTietVoucherPK other = (ChiTietVoucherPK) obj;
		return donDat == other.donDat && voucher == other.voucher;
	}

}
