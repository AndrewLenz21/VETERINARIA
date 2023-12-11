package veterinariaapp.entities.HistorialClinicoEntity;

import java.util.Date;
import java.lang.String;

import veterinariaapp.entities.AgendarCitaEntity.BusquedaCitaEntity;

public class ReporteClinicoDTO {

    private Date fechaCita;
    private String horarioCita;
    private String veterinario;
    private String cliente;
    private String mascota;
    private String estadoCita;
    private String diagnostico;
    private String recetaDetalle;

    // Constructor vacío
    public ReporteClinicoDTO() {
    }

    // Getters y setters
    public Date getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(Date fechaCita) {
        this.fechaCita = fechaCita;
    }

    public String getHorarioCita() {
        return horarioCita;
    }

    public void setHorarioCita(String horarioCita) {
        this.horarioCita = horarioCita;
    }

    public String getVeterinario() {
        return veterinario;
    }

    public void setVeterinario(String veterinario) {
        this.veterinario = veterinario;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getMascota() {
        return mascota;
    }

    public void setMascota(String mascota) {
        this.mascota = mascota;
    }

    public String getEstadoCita() {
        return estadoCita;
    }

    public void setEstadoCita(String estadoCita) {
        this.estadoCita = estadoCita;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getRecetaDetalle() {
        return recetaDetalle;
    }

    public void setRecetaDetalle(String recetaDetalle) {
        this.recetaDetalle = recetaDetalle;
    }

    // Método para convertir una entidad a DTO
    public static ReporteClinicoDTO fromEntity(BusquedaCitaEntity entity) {
        ReporteClinicoDTO dto = new ReporteClinicoDTO();
        dto.setFechaCita(entity.getFecha_cita());
        dto.setHorarioCita(entity.getDescripcion_horario_cita()); // Asumiendo que este es el horario
        dto.setVeterinario(entity.getUsuario_apellidos() + " " + entity.getUsuario_nombres());
        dto.setCliente(entity.getCliente_nombres() + " " + entity.getCliente_apellidos());
        dto.setMascota(entity.getNombre_mascota());
        dto.setEstadoCita(entity.getDescripcion_estado_cita());
        dto.setDiagnostico(entity.getDiagnostico());
        dto.setRecetaDetalle(entity.getReceta_detalle());
        return dto;
    }
}
