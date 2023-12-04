package veterinariaapp.entities.MascotasEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class InsertarMascotaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String identificador;
    private String nombre;
    private String tipo;
    private Integer edad;
    private String sexo;
    private String utente_inserimento;

    // Getter para identificador
    public String getIdentificador() {
        return identificador;
    }

    // Setter para identificador
    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    // Getter para nombre
    public String getNombre() {
        return nombre;
    }

    // Setter para nombre
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter para tipo
    public String getTipo() {
        return tipo;
    }

    // Setter para tipo
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    // Getter para edad
    public Integer getEdad() {
        return edad;
    }

    // Setter para edad
    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    // Getter para sexo
    public String getSexo() {
        return sexo;
    }

    // Setter para sexo
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    // Getter para utente_inserimento
    public String getUtente_inserimento() {
        return utente_inserimento;
    }

    // Setter para utente_inserimento
    public void setUtente_inserimento(String utente_inserimento) {
        this.utente_inserimento = utente_inserimento;
    }
}
