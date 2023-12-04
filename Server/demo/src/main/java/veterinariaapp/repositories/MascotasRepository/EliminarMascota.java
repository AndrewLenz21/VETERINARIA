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
public interface EliminarMascota extends JpaRepository<InsertarMascotaEntity, String> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_eliminar_mascota(:_id_mascota)")
    void sp_eliminar_mascota(
            @Param("_id_mascota") Integer idMascota);
}
