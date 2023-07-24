package com.se.cineplex.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(ChiTietVoucherPK.class)
public class ChiTietVoucher implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "ma_dondat")
	private DonDat donDat;

	@Id
	@ManyToOne
	@JoinColumn(name = "ma_voucher")
	private Voucher voucher;

	public ChiTietVoucher() {
		super();
	}

}
