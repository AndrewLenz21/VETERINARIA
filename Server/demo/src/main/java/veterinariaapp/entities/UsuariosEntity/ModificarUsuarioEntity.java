package veterinariaapp.entities.UsuariosEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class ModificarUsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id_usuario;
    private Integer id_credenciales;
    private Integer id_especialidad;
    private String dni;
    private String nombres;
    private String apellidos;
    private Integer cod_tipo_usuario;
    private String rol_especialidad;
    private String email;
    private String password;
    private String utente_modificacion;

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_credenciales() {
        return id_credenciales;
    }

    public void setId_credenciales(Integer id_credenciales) {
        this.id_credenciales = id_credenciales;
    }

    public Integer getId_especialidad() {
        return id_especialidad;
    }

    public void setId_especialidad(Integer id_especialidad) {
        this.id_especialidad = id_especialidad;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Integer getCod_tipo_usuario() {
        return cod_tipo_usuario;
    }

    public void setCod_tipo_usuario(Integer cod_tipo_usuario) {
        this.cod_tipo_usuario = cod_tipo_usuario;
    }

    public String getRol_especialidad() {
        return rol_especialidad;
    }

    public void setRol_especialidad(String rol_especialidad) {
        this.rol_especialidad = rol_especialidad;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUtente_modificacion() {
        return utente_modificacion;
    }

    public void setUtente_modificacion(String utente_modificacion) {
        this.utente_modificacion = utente_modificacion;
    }
}
