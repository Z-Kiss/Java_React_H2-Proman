package com.zkiss.proman;

import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class PromanApplication {
	// TODO: Not be able to create things without fields

	public static void main(String[] args) {
		SpringApplication.run(PromanApplication.class, args);
	}

	@Bean(initMethod = "start", destroyMethod = "stop")
	public Server h2Server() throws SQLException {
		return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
	}
}
