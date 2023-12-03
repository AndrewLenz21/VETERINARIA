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

import veterinariaapp.entities.UsuarioEntity;
import veterinariaapp.entities.NavBarEntity.InformacionEntity;
import veterinariaapp.services.UsuarioService;
import veterinariaapp.services.NavBarService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NavBarController {
    @Autowired
    private NavBarService navbarService;

    @GetMapping("/informacion")
    public ResponseEntity<InformacionEntity> ricercaTabellaPrueba1(
            @RequestParam(required = false) String identificador) {
        if (identificador == null || identificador.isEmpty()) {
            return ResponseEntity.ok(null);
        }

        InformacionEntity result = navbarService.obtener_informacion_usuario(identificador);
        return ResponseEntity.ok(result);
    }
}
