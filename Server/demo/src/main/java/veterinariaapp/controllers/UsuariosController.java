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

import veterinariaapp.entities.ClientesEntity.InsertarClienteEntity;
import veterinariaapp.entities.ClientesEntity.ModificarClienteEntity;
import veterinariaapp.entities.UsuariosEntity.InsertarUsuarioEntity;
import veterinariaapp.entities.UsuariosEntity.ModificarUsuarioEntity;
import veterinariaapp.entities.UsuariosEntity.UsuarioRegistrado;
import veterinariaapp.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UsuariosController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/obtener_usuarios")
    public ResponseEntity<List<UsuarioRegistrado>> buscar_usuarios(
            @RequestParam(required = false) String dni,
            @RequestParam(required = false) Integer cod_tipo_usuario) {
        String identificador = "";
        if (dni != null) {
            identificador = dni;
        }
        List<UsuarioRegistrado> usuarios = usuarioService.buscar_usuarios(identificador, cod_tipo_usuario);
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/insertar_usuario")
    public void insertar_usuario(@RequestBody InsertarUsuarioEntity cliente) {
        usuarioService.insertar_usuario(cliente);
    }

    @PostMapping("/modificar_usuario")
    public void modificar_usuario(@RequestBody ModificarUsuarioEntity cliente) {
        usuarioService.modificar_usuario(cliente);
    }

    @GetMapping("/eliminar_usuario")
    public void eliminar_usuario(
            @RequestParam(required = false) Integer id_usuario,
            @RequestParam(required = false) Integer id_credenciales,
            @RequestParam(required = false) Integer id_rol_especialidad) {

        usuarioService.eliminar_usuario(id_usuario, id_credenciales, id_rol_especialidad);
    }

}
