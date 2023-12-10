package veterinariaapp.entities.AgendarCitaEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class BusquedaCitaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo_cita;
    private Integer cod_estado_cita;
    private String descripcion_estado_cita;
    private Integer id_usuario;
    private Integer id_cliente;
    private Integer id_mascota;
    private String nombre_mascota;
    private String cliente_apellidos;
    private String cliente_nombres;
    private Date fecha_cita;
    private Integer cod_horario_cita;
    private String descripcion_horario_cita;

    // Getters y Setters para los campos agregados

    public Integer getCodigo_cita() {
        return codigo_cita;
    }

    public void setCodigo_cita(Integer codigo_cita) {
        this.codigo_cita = codigo_cita;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getCod_estado_cita() {
        return cod_estado_cita;
    }

    public void setCod_estado_cita(Integer cod_estado_cita) {
        this.cod_estado_cita = cod_estado_cita;
    }

    public String getDescripcion_estado_cita() {
        return descripcion_estado_cita;
    }

    public void setDescripcion_estado_cita(String descripcion_estado_cita) {
        this.descripcion_estado_cita = descripcion_estado_cita;
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

    public String getNombre_mascota() {
        return nombre_mascota;
    }

    public void setNombre_mascota(String nombre_mascota) {
        this.nombre_mascota = nombre_mascota;
    }

    public String getCliente_apellidos() {
        return cliente_apellidos;
    }

    public void setCliente_apellidos(String cliente_apellidos) {
        this.cliente_apellidos = cliente_apellidos;
    }

    public String getCliente_nombres() {
        return cliente_nombres;
    }

    public void setCliente_nombres(String cliente_nombres) {
        this.cliente_nombres = cliente_nombres;
    }

    public Date getFecha_cita() {
        return fecha_cita;
    }

    public void setFecha_cita(Date fecha_cita) {
        this.fecha_cita = fecha_cita;
    }

    public Integer getCod_horario_cita() {
        return cod_horario_cita;
    }

    public void setCod_horario_cita(Integer cod_horario_cita) {
        this.cod_horario_cita = cod_horario_cita;
    }

    public String getDescripcion_horario_cita() {
        return descripcion_horario_cita;
    }

    public void setDescripcion_horario_cita(String descripcion_horario_cita) {
        this.descripcion_horario_cita = descripcion_horario_cita;
    }
}
