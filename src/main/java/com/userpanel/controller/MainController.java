package com.userpanel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class MainController {
	
	@RequestMapping("/home")
	public String admin() {
		return "home";
	}

	@RequestMapping("/inplay")
	public String inplay() {
		return "inplay";
	}

	@RequestMapping("/multimarket")
	public String multimarket() {
		return "multimarket";
	}

	@RequestMapping("/cricket")
	public String cricket(Model model) {
		model.addAttribute("title", "Cricket - Sky Exchange");
		model.addAttribute("js", "cricket.js");
		return "cricket";
	}

	@RequestMapping("/soccer")
	public String soccer(Model model) {
		model.addAttribute("title", "Soccer - Sky Exchange");
		model.addAttribute("js", "soccer.js");
		return "soccer";
	}

	@RequestMapping("/tennis")
	public String tennis(Model model) {
		model.addAttribute("title", "Tennis - Sky Exchange");
		model.addAttribute("js", "tennis.js");
		return "tennis";
	}

	@RequestMapping("/iplwinner")
	public String iplwinner() {
		return "iplwinner";
	}

	@RequestMapping("/result")
	public String result() {
		return "result";
	}

	@RequestMapping("/binary")
	public String binary() {
		return "binary";
	}
	
	@RequestMapping("/matchodds/{sportsId}/{eventId}")
	public String matchodds(Model model, @PathVariable String sportsId, @PathVariable String eventId) {
		model.addAttribute("title", "Match Odd - Sky Exchange");
		model.addAttribute("js", "matchodds.js");
		return "matchodds";
	}

}
