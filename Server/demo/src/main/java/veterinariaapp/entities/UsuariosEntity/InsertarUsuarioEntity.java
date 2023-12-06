package veterinariaapp.entities.UsuariosEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class InsertarUsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id_usuario;

    // primera tabla USUARIOS
    private String identificador;
    private String nombres;
    private String apellidos;
    private Integer cod_tipo_usuario;
    // segunda tabla USUARIO_CREDENCIALES
    private String email;
    private String password;
    // tercera tabla USUARIO_ROL_ESPECIALIDAD
    private String rol_especialidad;
    private String utente_inserimento;

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
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

    public String getUtente_inserimento() {
        return utente_inserimento;
    }

    public void setUtente_inserimento(String utente_inserimento) {
        this.utente_inserimento = utente_inserimento;
    }

    public String getRol_especialidad() {
        return rol_especialidad;
    }

    public void setRol_especialidad(String rol_especialidad) {
        this.rol_especialidad = rol_especialidad;
    }
}