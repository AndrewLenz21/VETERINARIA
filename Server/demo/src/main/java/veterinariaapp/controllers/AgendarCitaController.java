package veterinariaapp.controllers;

import java.util.Map;
import java.util.HashMap;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import veterinariaapp.entities.AgendarCitaEntity.AgendarNuevaCitaEntity;
import veterinariaapp.entities.AgendarCitaEntity.BusquedaCitaEntity;
import veterinariaapp.entities.AgendarCitaEntity.HorariosDisponiblesEntity;
import veterinariaapp.services.AgendarCitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AgendarCitaController {
    @Autowired
    AgendarCitaService agendar_cita;

    @GetMapping("/horarios_disponibles")
    public ResponseEntity<List<HorariosDisponiblesEntity>> getMethodName(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") java.util.Date fecha,
            @RequestParam(required = false) Integer cod_usuario) {
        List<HorariosDisponiblesEntity> result = agendar_cita.horarios_disponibles(fecha, cod_usuario);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/agendar_cita")
    public void agendar_cita(@RequestBody AgendarNuevaCitaEntity cita) {
        agendar_cita.agendar_cita(cita);
    }

    @GetMapping("/buscar_citas")
    public ResponseEntity<List<BusquedaCitaEntity>> buscar_citas(@RequestParam(required = false) String dni,
            @RequestParam(required = false) Integer cod_usuario,
            @RequestParam(required = false) Integer cod_tipo_estado_cita,
            @RequestParam(required = false) Integer cod_tipo_horario_cita,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") java.util.Date fecha) {
        List<BusquedaCitaEntity> result = agendar_cita.buscar_citas(dni, cod_usuario, cod_tipo_estado_cita,
                cod_tipo_horario_cita, fecha);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/generar_diagnostico")
    public void generar_diagnostico(@RequestParam(required = false) Integer cod_cita,
            @RequestParam(required = false) String diagnostico,
            @RequestParam(required = false) String receta) {
        agendar_cita.generar_diagnostico(cod_cita, diagnostico, receta);
    }

}
