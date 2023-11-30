package veterinariaapp.entities;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UsuarioEntity {
    @Id
    private Integer id;
    private String nombre;
    private String email;

    // Constructores, getters y setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return nombre; }
    public void setName(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
