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

import veterinariaapp.entities.FunctionsPageEntity.UsuarioFuncionesEntity;
import veterinariaapp.services.FunctionsPageService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FunctionsPageController {
    @Autowired
    private FunctionsPageService functionsPageService;

    @GetMapping("/funciones_usuario")
    public ResponseEntity<List<UsuarioFuncionesEntity>> funciones_usuario(
            @RequestParam(required = false) Integer id) {
        if (id == null) {
            return ResponseEntity.ok(null);
        }

        List<UsuarioFuncionesEntity> result = functionsPageService.obtener_funciones_usuario(id);
        return ResponseEntity.ok(result);
    }
}
