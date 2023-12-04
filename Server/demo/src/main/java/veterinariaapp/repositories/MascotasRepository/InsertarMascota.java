package veterinariaapp.repositories.MascotasRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.MascotasEntity.InsertarMascotaEntity;

@Repository
public interface InsertarMascota extends JpaRepository<InsertarMascotaEntity, String> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_insertar_mascotas(:_identificador_cliente, :_nombre, :_tipo, :_edad, :_sexo, :_utente_inserimento)")
    void sp_insertar_mascotas(
            @Param("_identificador_cliente") String identificadorCliente,
            @Param("_nombre") String nombre,
            @Param("_tipo") String tipo,
            @Param("_edad") Integer edad,
            @Param("_sexo") String sexo,
            @Param("_utente_inserimento") String utenteInserimento);
}
