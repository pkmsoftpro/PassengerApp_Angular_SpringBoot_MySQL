package com.utility;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class PopulateData {

	public static void main(String[] args) throws Exception {
		String myUrl = "jdbc:mysql://localhost/test1";
		Connection conn = DriverManager.getConnection(myUrl, "root", "pass1");

		String query = " insert into passengers (Passengerid,Pclass,Name,Sex,Age,Sibsp,Parch,Ticket,Fare,Cabin,Embarked)"
				+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		PreparedStatement preparedStmt = conn.prepareStatement(query);
		// preparedStmt.execute();

		FileReader fr = new FileReader("C:\\Users\\prashant\\Downloads\\trainCopy3.csv");

		BufferedReader br = new BufferedReader(fr);
		String line = br.readLine();
		while (line != null) {
			System.out.println(line);

			String[] arr = line.split(",");
			// [1, 0, 3, "Braund, Mr. Owen Harris", male, 22, 1, 0, A/5 21171, 7.25, , S]
			preparedStmt.setInt(1, Integer.parseInt(arr[0]));
			preparedStmt.setInt(2, Integer.parseInt(arr[2]));
			preparedStmt.setString(3, arr[4] + " " + arr[3]);
			preparedStmt.setString(4, arr[5]);
			preparedStmt.setDouble(5, arr[6].length() > 0 ? Double.parseDouble(arr[6]) : 10);
			preparedStmt.setInt(6, arr[7].length() > 0 ? Integer.parseInt(arr[7]) : 10);
			preparedStmt.setInt(7, arr[8].length() > 0 ? Integer.parseInt(arr[8]) : 10);
			preparedStmt.setString(8, arr[9]);
			preparedStmt.setDouble(9, arr[10].length() > 0 ? Double.parseDouble(arr[10]) : 10.5);
			preparedStmt.setString(10, arr[11]);
			preparedStmt.setString(11, arr[12]);
			preparedStmt.execute();
			line = br.readLine();
		}
		System.out.println("done");
		br.close();
		conn.close();
	}
}
