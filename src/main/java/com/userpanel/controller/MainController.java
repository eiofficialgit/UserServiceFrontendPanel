package com.userpanel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	@RequestMapping("/u-home")
	public String admin() {
		return "home";
	}

	@RequestMapping("/u-inplay")
	public String inplay() {
		return "inplay";
	}

	@RequestMapping("/u-multimarket")
	public String multimarket() {
		return "multimarket";
	}

	@RequestMapping("/u-cricket")
	public String cricket(Model model) {
		model.addAttribute("title", "Cricket - Sky Exchange");
		model.addAttribute("js", "cricket.js");
		return "cricket";
	}

	@RequestMapping("/u-soccer")
	public String soccer(Model model) {
		model.addAttribute("title", "Soccer - Sky Exchange");
		model.addAttribute("js", "soccer.js");
		return "soccer";
	}

	@RequestMapping("/u-tennis")
	public String tennis(Model model) {
		model.addAttribute("title", "Tennis - Sky Exchange");
		model.addAttribute("js", "tennis.js");
		return "tennis";
	}

	@RequestMapping("/u-iplwinner")
	public String iplwinner() {
		return "iplwinner";
	}

	@RequestMapping("/u-result")
	public String result() {
		return "result";
	}

	@RequestMapping("/u-binary")
	public String binary() {
		return "binary";
	}
	

}
