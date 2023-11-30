package veterinariaapp.entities.LoginEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnore;

//OBJETO PRINCIPAL
@Entity
public class AutenticadorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id;
    private String nombres;
    private String apellidos;
    private String email;
    private String password;

    public Integer getid() {return id;}
    public void seid(Integer id) {this.id = id;}

    public String getnombres() {return nombres;}
    public void setnombres(String nombres) {this.nombres = nombres;}

    public String getapellidos() {return apellidos;}
    public void setapellidos(String apellidos) {this.apellidos = apellidos;}

    public String getemail() {return email;}
    public void setemail(String email) {this.email = email;}

    public String getpassword() {return password;}
    public void setpassword(String password) {this.password = password;}
}