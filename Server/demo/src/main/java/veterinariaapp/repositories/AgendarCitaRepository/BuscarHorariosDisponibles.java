package veterinariaapp.repositories.AgendarCitaRepository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.AgendarCitaEntity.HorariosDisponiblesEntity;

@Repository
public interface BuscarHorariosDisponibles extends JpaRepository<HorariosDisponiblesEntity, Integer> {
    // OBTENER HORARIOS DISPONIBLES
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_verificar_disponibilidad(:_fecha_cita, :_veterinario)")
    List<HorariosDisponiblesEntity> sp_verificar_disponibilidad(
            @Param("_fecha_cita") Date fecha,
            @Param("_veterinario") Integer veterinario);
}
