package veterinariaapp.controllers;

import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import veterinariaapp.entities.LoginEntity.AutenticadorEntity;
import veterinariaapp.entities.LoginEntity.CredentialsEntity;
import veterinariaapp.entities.LoginEntity.ObtenerAutenticadorEntity;
import veterinariaapp.services.LoginService;

// otras importaciones
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @GetMapping("/hello")
    public String hello() {
        System.out.println("Hello World!");
        return "Hello World!";
    }

    // POST function 'login'
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsEntity credentials) {
        String message;
        boolean autenticar;
        String autenticadorDNI;

        List<AutenticadorEntity> lista_usuarios = new ArrayList<AutenticadorEntity>();
        AutenticadorEntity usuario_encontrado = new AutenticadorEntity();
        ObtenerAutenticadorEntity autenticador_usuario = new ObtenerAutenticadorEntity();

        // Buscar los usuarios
        lista_usuarios = loginService.obtener_usuarios(credentials.getEmail());
        // Verificar si hay solo un usuario
        if (lista_usuarios.size() == 1) {
            message = "Usuario encontrado correctamente";
            usuario_encontrado = lista_usuarios.get(0);
            // Comprobar credenciales con la comparacion de las contraseñas
            autenticar = loginService.autenticador(credentials.getPassword(), usuario_encontrado.getpassword());
        } else {
            message = "Usuario no encontrado correctamente";
            autenticar = false;
        }

        // Obtener autenticador
        if (autenticar == true) {
            message = "Usuario autenticado correctamente";
            autenticador_usuario = loginService.obtener_autenticador(usuario_encontrado.getid());
            autenticadorDNI = autenticador_usuario.getautenticador();
        } else {
            message = "Contraseña incorrecta";
            autenticadorDNI = "";
        }
        // mapear resultados
        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", autenticar);
        response.put("credentials", credentials);
        response.put("identifier", autenticadorDNI);
        response.put("message", message);

        return ResponseEntity.ok(response);
    }
}
