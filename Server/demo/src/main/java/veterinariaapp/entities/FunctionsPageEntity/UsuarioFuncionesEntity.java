package veterinariaapp.entities.FunctionsPageEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UsuarioFuncionesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id;
    private Integer cod_tipo_usuario;
    private String desc_tipo_usuario;
    private Integer cod_tipo_funcion;
    private String desc_tipo_funcion;
    private String path_imagen;

    // id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // cod_tipo_usuario
    public Integer getCod_tipo_usuario() {
        return cod_tipo_usuario;
    }

    public void setCod_tipo_usuario(Integer cod_tipo_usuario) {
        this.cod_tipo_usuario = cod_tipo_usuario;
    }

    // desc_tipo_usuario
    public String getDesc_tipo_usuario() {
        return desc_tipo_usuario;
    }

    public void setDesc_tipo_usuario(String desc_tipo_usuario) {
        this.desc_tipo_usuario = desc_tipo_usuario;
    }

    // cod_tipo_funcion
    public Integer getCod_tipo_funcion() {
        return cod_tipo_funcion;
    }

    public void setCod_tipo_funcion(Integer cod_tipo_funcion) {
        this.cod_tipo_funcion = cod_tipo_funcion;
    }

    // desc_tipo_funcion
    public String getDesc_tipo_funcion() {
        return desc_tipo_funcion;
    }

    public void setDesc_tipo_funcion(String desc_tipo_funcion) {
        this.desc_tipo_funcion = desc_tipo_funcion;
    }

    // path_imagen
    public String getPath_imagen() {
        return path_imagen;
    }

    public void setPath_imagen(String path_imagen) {
        this.path_imagen = path_imagen;
    }

}
