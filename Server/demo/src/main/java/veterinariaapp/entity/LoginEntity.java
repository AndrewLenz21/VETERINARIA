package veterinariaapp.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnore;

//OBJETO PRINCIPAL
@Entity
public class LoginEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    // Clase interna UsuarioCredentials
    public static class UsuarioCredentials {
        private String email;
        private String password;

        public String getEmail() {return email;}
        public void setEmail(String email) {this.email = email;}

        public String getPassword() {return password;}
        public void setPassword(String password) {this.password = password;}
    }

    public static class FiltroUsuario {
        private Integer id;
        private String name;
        private String email;

        public Integer getId() {return id;}
        public void setId(Integer id) {this.id = id;}

        public String getName() {return name;}
        public void setName(String name) {this.name = name;}

        public String getEmail() {return email;}
        public void setEmail(String email) {this.email = email;}
    }
}