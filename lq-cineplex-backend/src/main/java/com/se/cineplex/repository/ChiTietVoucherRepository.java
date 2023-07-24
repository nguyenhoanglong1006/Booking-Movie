package com.se.cineplex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.se.cineplex.entity.ChiTietVoucher;

@Repository
public interface ChiTietVoucherRepository extends JpaRepository<ChiTietVoucher, Integer>{

}
