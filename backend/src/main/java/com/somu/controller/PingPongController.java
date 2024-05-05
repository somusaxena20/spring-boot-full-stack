package com.somu.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ping-pong")
public class PingPongController {

    record PingPong(String result){}

    @GetMapping("/{val}")
    public PingPong getPingPong(@RequestParam String val)
    {
        return new PingPong(val);
    }
}
