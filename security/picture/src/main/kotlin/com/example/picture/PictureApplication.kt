package com.example.picture

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PictureApplication

fun main(args: Array<String>) {
	runApplication<PictureApplication>(*args)
}
