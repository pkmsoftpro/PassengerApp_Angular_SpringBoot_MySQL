package com.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.entity.Passenger;



public interface  PassengerReposiory extends JpaRepository<Passenger, Integer> {

	@Query(value = "select a from Passenger a")
	List<Passenger> findAll();
	
	@Modifying
    @Query("delete from Passenger u where u.passengerid = ?1")
	void deleteByPassengerid(int id);
}
