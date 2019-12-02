package com.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Passenger;
import com.repository.PassengerReposiory;

@Service
@Transactional
public class PassengerService {

	@Autowired
    PassengerReposiory passengerRepository;

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }
    
    public Passenger save(Passenger passenger) {
    	return passengerRepository.save(passenger);
    }
    
    public void deleteByPassengerid(int id) {
    	passengerRepository.deleteByPassengerid(id);
    }
    
    public Optional<Passenger> findById(int id) {
    	return passengerRepository.findById(id);
    }
}
