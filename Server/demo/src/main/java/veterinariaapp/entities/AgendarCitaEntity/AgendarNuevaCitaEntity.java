package veterinariaapp.entities.AgendarCitaEntity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class AgendarNuevaCitaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_usuario;
    private Integer id_cliente;
    private Integer id_mascota;
    private java.sql.Date fecha_cita;
    private Integer cod_tipo_horario_cita;
    private String usuario_insercion;
    private String motivo_cita;
    private String observaciones_cliente;

    // Getters y Setters

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Integer id_cliente) {
        this.id_cliente = id_cliente;
    }

    public Integer getId_mascota() {
        return id_mascota;
    }

    public void setId_mascota(Integer id_mascota) {
        this.id_mascota = id_mascota;
    }

    public java.sql.Date getFecha_cita() {
        return fecha_cita;
    }

    public void setFecha_cita(java.sql.Date fecha_cita) {
        this.fecha_cita = fecha_cita;
    }

    public Integer getCod_tipo_horario_cita() {
        return cod_tipo_horario_cita;
    }

    public void setCod_tipo_horario_cita(Integer cod_tipo_horario_cita) {
        this.cod_tipo_horario_cita = cod_tipo_horario_cita;
    }

    public String getUsuario_insercion() {
        return usuario_insercion;
    }

    public void setUsuario_insercion(String usuario_insercion) {
        this.usuario_insercion = usuario_insercion;
    }

    public String getMotivo_cita() {
        return motivo_cita;
    }

    public void setMotivo_cita(String motivo_cita) {
        this.motivo_cita = motivo_cita;
    }

    public String getObservaciones_cliente() {
        return observaciones_cliente;
    }

    public void setObservaciones_cliente(String observaciones_cliente) {
        this.observaciones_cliente = observaciones_cliente;
    }
}
