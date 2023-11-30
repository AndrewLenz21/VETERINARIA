package veterinariaapp.entities.LoginEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnore;

//OBJETO PRINCIPAL
@Entity
public class ObtenerAutenticadorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id;
    private String autenticador;
    private Integer cod_tipo_usuario;
    private String desc_tipo_usuario;

    public Integer getid() {return id;}
    public void seid(Integer id) {this.id = id;}

    public String getautenticador() {return autenticador;}
    public void setautenticados(String autenticador) {this.autenticador = autenticador;}

    public Integer getcod_tipo_usuario() {return cod_tipo_usuario;}
    public void setcod_tipo_usuario(Integer cod_tipo_usuario) {this.cod_tipo_usuario = cod_tipo_usuario;}

    public String getdesc_tipo_usuario() {return desc_tipo_usuario;}
    public void setdesc_tipo_usuario(String desc_tipo_usuario) {this.desc_tipo_usuario = desc_tipo_usuario;}
}