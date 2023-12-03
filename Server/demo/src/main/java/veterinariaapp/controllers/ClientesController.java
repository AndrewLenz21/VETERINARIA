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

import veterinariaapp.entities.ClientesEntity.Clientes;
import veterinariaapp.entities.ClientesEntity.InsertarClienteEntity;
import veterinariaapp.entities.ClientesEntity.ModificarClienteEntity;

import veterinariaapp.services.ClientesService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientesController {
    @Autowired
    private ClientesService clientesService;

    @GetMapping("/obtener_clientes")
    public ResponseEntity<List<Clientes>> buscar_clientes(
            @RequestParam(required = false) String dni) {
        String identificador = "";
        if (dni != null) {
            identificador = dni;
        }
        List<Clientes> result = clientesService.buscar_clientes(identificador);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/insertar_cliente")
    public void insertar_cliente(@RequestBody InsertarClienteEntity cliente) {
        clientesService.insertar_cliente(cliente);
    }

    @PostMapping("/modificar_cliente")
    public void modificar_cliente(@RequestBody ModificarClienteEntity cliente) {
        clientesService.modificar_cliente(cliente);
    }

    @GetMapping("/eliminar_cliente")
    public void eliminar_cliente(@RequestParam(required = false) String identificativo) {
        clientesService.eliminar_cliente(identificativo);
    }
}
