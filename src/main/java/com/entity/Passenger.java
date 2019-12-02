package com.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="passengers")
public class Passenger {

	@Id
	@Column(name = "Passengerid", unique = true, nullable = false)
	private int passengerid;
	
	@Column(name="Pclass")
	private int pClass;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Sex")
	private String sex;
	
	@Column(name="Age")
	private double age;
	
	@Column(name="Sibsp")
	private int sibsp;
	
	@Column(name="Parch")
	private int parch;
	
	@Column(name="Ticket")
	private String ticket;
	
	@Column(name="Fare")
	private double fare;
	
	@Column(name="Cabin")
	private String cabin;
	
	@Column(name="Embarked")
	private String embarked;

	public int getpClass() {
		return pClass;
	}

	public void setpClass(int pClass) {
		this.pClass = pClass;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public double getAge() {
		return age;
	}

	public void setAge(double age) {
		this.age = age;
	}

	public int getPassengerid() {
		return passengerid;
	}

	public void setPassengerid(int passengerid) {
		this.passengerid = passengerid;
	}

	public int getSibsp() {
		return sibsp;
	}

	public void setSibsp(int sibsp) {
		this.sibsp = sibsp;
	}

	public int getParch() {
		return parch;
	}

	public void setParch(int parch) {
		this.parch = parch;
	}

	public String getTicket() {
		return ticket;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}

	public double getFare() {
		return fare;
	}

	public void setFare(double fare) {
		this.fare = fare;
	}

	public String getCabin() {
		return cabin;
	}

	public void setCabin(String cabin) {
		this.cabin = cabin;
	}

	public String getEmbarked() {
		return embarked;
	}

	public void setEmbarked(String embarked) {
		this.embarked = embarked;
	}

}
