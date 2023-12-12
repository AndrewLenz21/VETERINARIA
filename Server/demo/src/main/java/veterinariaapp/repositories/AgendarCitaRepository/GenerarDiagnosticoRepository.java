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

@Repository
public interface GenerarDiagnosticoRepository extends JpaRepository<AgendarNuevaCitaEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_generar_diagnostico_cita(:_codigo_cita, :_diagnostico, :_receta_detalle)")
    void registrarReporteCita(
            @Param("_codigo_cita") Integer _codigo_cita,
            @Param("_diagnostico") String _diagnostico,
            @Param("_receta_detalle") String _receta_detalle);
}
