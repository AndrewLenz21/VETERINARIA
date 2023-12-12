package veterinariaapp.repositories.AgendarCitaRepository;

import java.util.List;
import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.AgendarCitaEntity.AgendarNuevaCitaEntity;

public interface CancelarCitaRepository extends JpaRepository<AgendarNuevaCitaEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_cancelar_cita(:_codigo_cita)")
    void sp_cancelar_cita(
            @Param("_codigo_cita") Integer _codigo_cita);
}
