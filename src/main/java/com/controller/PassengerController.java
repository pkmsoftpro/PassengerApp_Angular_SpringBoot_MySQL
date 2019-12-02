package com.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Passenger;
import com.service.PassengerService;


@RestController
@RequestMapping(value = "userendpoint")
@CrossOrigin(origins = "http://localhost:4200", 
	methods = {RequestMethod.DELETE, 
			   RequestMethod.POST,
			   RequestMethod.GET,
			   RequestMethod.PUT}, allowedHeaders = "*")
public class PassengerController {
	
	@Autowired
	PassengerService passengerService;

	@RequestMapping(value = "addPassenger", method = RequestMethod.POST)
	public @ResponseBody Passenger addNewPassenger(@RequestBody Passenger passenger) throws Exception {
		System.out.println("done");
		Passenger created = passengerService.save(passenger);
		return created;
	}
	
	@RequestMapping(value = "getPassengers", method = RequestMethod.GET)
	public List<Passenger> getPassengers() {
		List<Passenger> passengers = passengerService.getAllPassengers();
		return passengers;
	}
	
	@RequestMapping(value = "deletePassenger/{id}", method = RequestMethod.DELETE)
	public String deleteById(@PathVariable int id) {
		passengerService.deleteByPassengerid(id);
		return "Passenger Deleted. Id: " + id;
	}
	
/*	TODO: for testing in Postman
 * {
	"passengerid": 15, 
	"name": "test",
	"pClass": 0, 
	"sex": "male",
	"age": 24,
    "sibsp": 8, 
    "parch": 9, 
    "ticket": "U756 T", 
    "fare": 45, 
    "cabin": "Q97",
    "embarked": "T"
   }
 */
	@RequestMapping(value = "updatePassenger/{id}", method = RequestMethod.PUT)
	public String updatePassenger(@RequestBody Passenger passenger, @PathVariable int id) {
		Optional<Passenger> passengerOptional = passengerService.findById(id);
		if (!passengerOptional.isPresent())
			return "Invalid Passenger";
		passenger.setPassengerid(id);
		passengerService.save(passenger);
		return "Passenger Updated. Id:" + id;
	}
}
