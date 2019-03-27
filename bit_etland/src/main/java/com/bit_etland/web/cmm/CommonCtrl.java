package com.bit_etland.web.cmm;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonCtrl {
	
	private static final Logger logger = LoggerFactory.getLogger(CommonCtrl.class);

	@GetMapping("/")
	public String home(Locale locale, Model model) {
		logger.info("=========CommonCtrl 진입===========");
		return "index";
	}

}
