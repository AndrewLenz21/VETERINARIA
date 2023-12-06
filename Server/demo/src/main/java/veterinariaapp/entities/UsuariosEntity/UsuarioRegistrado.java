package veterinariaapp.entities.UsuariosEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class UsuarioRegistrado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer cod_tipo_usuario;
    private String nombres;
    private String apellidos;
    private String autenticador;
    private String desc_tipo_usuario;
    private Integer id_rol_especialidad;
    private String rol_especialidad;
    private Integer id_credenciales;
    private String email;
    private String password;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCod_tipo_usuario() {
        return cod_tipo_usuario;
    }

    public void setCod_tipo_usuario(Integer cod_tipo_usuario) {
        this.cod_tipo_usuario = cod_tipo_usuario;
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

    public String getAutenticador() {
        return autenticador;
    }

    public void setAutenticador(String autenticador) {
        this.autenticador = autenticador;
    }

    public String getDesc_tipo_usuario() {
        return desc_tipo_usuario;
    }

    public void setDesc_tipo_usuario(String desc_tipo_usuario) {
        this.desc_tipo_usuario = desc_tipo_usuario;
    }

    public Integer getId_rol_especialidad() {
        return id_rol_especialidad;
    }

    public void setId_rol_especialidad(Integer id_rol_especialidad) {
        this.id_rol_especialidad = id_rol_especialidad;
    }

    public String getRol_especialidad() {
        return rol_especialidad;
    }

    public void setRol_especialidad(String rol_especialidad) {
        this.rol_especialidad = rol_especialidad;
    }

    public Integer getId_credenciales() {
        return id_credenciales;
    }

    public void setId_credenciales(Integer id_credenciales) {
        this.id_credenciales = id_credenciales;
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
}
