package veterinariaapp.controllers;

import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import veterinariaapp.entities.MascotasEntity.Mascotas;
import veterinariaapp.entities.MascotasEntity.InsertarMascotaEntity;

import veterinariaapp.services.MascotasService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MascotasController {
    @Autowired
    private MascotasService mascotas_service;

    @GetMapping("/obtener_mascotas")
    public ResponseEntity<List<Mascotas>> buscar_mascotas(
            @RequestParam(required = false) String dni) {
        String identificador = "";
        if (dni != null) {
            identificador = dni;
        }
        List<Mascotas> result = mascotas_service.buscar_mascotas(identificador);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/insertar_mascota")
    public void insertar_mascota(
            @RequestBody InsertarMascotaEntity mascota_nueva) {
        mascotas_service.insertar_mascota(mascota_nueva);
    }

    @GetMapping("/eliminar_mascota")
    public void eliminar_mascota(
            @RequestParam(required = false) Integer id_mascota) {
        mascotas_service.eliminar_mascota(id_mascota);
    }

}
