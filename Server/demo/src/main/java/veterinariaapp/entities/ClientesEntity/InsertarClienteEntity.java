package veterinariaapp.entities.ClientesEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class InsertarClienteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String identificador;
    private String nombres;
    private String apellidos;
    private String celular;
    private String email;
    private String utente_inserimento;

    // identificador
    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    // nombres
    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    // apellidos
    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    // celular
    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    // email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // utente inserimento
    public String getUtente_inserimento() {
        return utente_inserimento;
    }

    public void setUtente_inserimento(String utente_inserimento) {
        this.utente_inserimento = utente_inserimento;
    }
}
