package com.example.picture

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.GetMapping

@Controller
class PictureController {

    @GetMapping("/")
    fun picture(model: Model): String {
        model["title"] = "Picture"
        return "picture"
    }
    
}