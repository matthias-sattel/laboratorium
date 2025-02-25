package de.matthiassattel.lab

import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType

@Path("/poes")
class PoesResource {

    data class Poes(
        val id: Long,
        val name: String,
        val description: String
    )

    private val allPoes = listOf(
        Poes(1, "Blacky", "Our black little cuty"),
        Poes(2, "Harry", "Oldie but Goldie")
    )

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getPoes(): List<Poes> {
        return allPoes
    }
}