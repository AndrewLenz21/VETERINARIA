package veterinariaapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import veterinariaapp.entity.LoginEntity;
import veterinariaapp.entity.UsuarioEntity;
import veterinariaapp.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    @Autowired private UsuarioService usuarioService;

    //FUNCION BUSQUEDA
    @GetMapping("/ricerca1")
    public ResponseEntity<List<UsuarioEntity>> ricercaTabellaPrueba1(
        @RequestParam(required = false) Integer  id,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String email
    ) 
    {
        List<UsuarioEntity> result = usuarioService.ricerca_tabla_prueba_1(id, name, email);
        System.out.println(result);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/ricerca2")
    public ResponseEntity<List<UsuarioEntity>> ricercaTabellaPrueba2Post(@RequestBody LoginEntity.FiltroUsuario filtro) {
        List<UsuarioEntity> result = usuarioService.ricerca_tabla_prueba_2(filtro);
        return ResponseEntity.ok(result);
    }

    //FUNCION INSERIMENTO
    @GetMapping("/inserimento")
    public ResponseEntity<String> insertarPersona(
        @RequestParam(required=false, name = "nombre") String nombre,
        @RequestParam(required=false, name = "email") String email
    )   
    {
        boolean result = false;
        System.out.println("Nombre: " + nombre);
        System.out.println("Email: " + email);

        if (!nombre.isEmpty() && !email.isEmpty()) {
            result = usuarioService.insertar_persona(nombre, email);
        }

        String message = (result == true) ? "Persona registrada con exito" : "Persona no registrada";
        return ResponseEntity.ok(message);
    }

    //FUNCION DE ACTUALIZAR
    @PostMapping("/actualizar")
    public ResponseEntity<String> actualizar_persona(@RequestBody LoginEntity.FiltroUsuario filtro) {
        String result = usuarioService.actualizar_persona(filtro);
        return ResponseEntity.ok(result);
    }

    //FUNCION DE ELIMINAR
    @GetMapping("/eliminar")
    public ResponseEntity<String> eliminar_persona(@RequestParam(required=false, name = "id") Integer id) {
        String result = usuarioService.eliminar_persona(id);
        return ResponseEntity.ok(result);
    }
}
