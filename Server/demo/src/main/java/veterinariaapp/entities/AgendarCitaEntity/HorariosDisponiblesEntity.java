package veterinariaapp.entities.AgendarCitaEntity;

import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class HorariosDisponiblesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cod_horario;
    private String descripcion_horario;

    // id_cliente
    public Integer getCod_horario() {
        return cod_horario;
    }

    public void setCod_horario(Integer cod_horario) {
        this.cod_horario = cod_horario;
    }

    // identificador
    public String getDescripcion_horario() {
        return descripcion_horario;
    }

    public void setDescripcion_horario(String descripcion_horario) {
        this.descripcion_horario = descripcion_horario;
    }
}
