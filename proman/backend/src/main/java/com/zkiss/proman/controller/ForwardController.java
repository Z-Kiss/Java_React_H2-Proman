package com.zkiss.proman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class ForwardController {

    @GetMapping("/about")
    public String forwardTaAbout() {
        return "forward:/";
    }
}
