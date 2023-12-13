package veterinariaapp.controllers;

import java.util.Map;
import java.util.HashMap;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import veterinariaapp.services.HistorialClinicoService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HistorialClinicoController {
    @Autowired
    HistorialClinicoService historial_clinico;

    @GetMapping("/generar_reporte")
    public ResponseEntity<byte[]> generarReporte(@RequestParam(required = false) String dni,
            @RequestParam(required = false) Integer cod_usuario,
            @RequestParam(required = false) Integer cod_tipo_estado_cita,
            @RequestParam(required = false) Integer cod_tipo_horario_cita,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") java.util.Date fecha) {
        try {
            byte[] reporte = historial_clinico.generarReporte(dni, cod_usuario, cod_tipo_estado_cita,
                    cod_tipo_horario_cita, fecha);
            // System.out.println("Reporte generado:");
            // System.out.println(Arrays.toString(reporte));
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(reporte);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
