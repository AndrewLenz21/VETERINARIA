package veterinariaapp.entities.NavBarEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class InformacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id;
    private Integer cod_tipo_usuario;
    private String nombres;
    private String apellidos;
    private String autenticador;
    private String desc_tipo_usuario;
    private String email;

    // ID
    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    // COD_TIPO_USUARIO
    public Integer getcod_tipo_usuario() {
        return cod_tipo_usuario;
    }

    public void setcod_tipo_usuario(Integer cod_tipo_usuario) {
        this.cod_tipo_usuario = cod_tipo_usuario;
    }

    // NOMBRES
    public String getnombres() {
        return nombres;
    }

    public void setnombres(String nombres) {
        this.nombres = nombres;
    }

    // APELLIDOS
    public String getapellidos() {
        return apellidos;
    }

    public void setapellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    // APELLIDOS
    public String getautenticador() {
        return autenticador;
    }

    public void setautenticador(String autenticador) {
        this.autenticador = autenticador;
    }

    // DESC_TIPO_USUARIO
    public String getdesc_tipo_usuario() {
        return desc_tipo_usuario;
    }

    public void setdesc_tipo_usuario(String desc_tipo_usuario) {
        this.desc_tipo_usuario = desc_tipo_usuario;
    }

    // EMAIL
    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }
}
