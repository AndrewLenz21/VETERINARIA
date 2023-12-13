package veterinariaapp.repositories.AgendarCitaRepository;

import java.util.List;
import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.AgendarCitaEntity.AgendarNuevaCitaEntity;

@Repository
public interface AgendarNuevaCita extends JpaRepository<AgendarNuevaCitaEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_agendar_cita(:_id_usuario, :_id_cliente, :_id_mascota, :_fecha_cita, :_cod_tipo_horario_cita, :_usuario_insercion, :_motivo_cita, :_observaciones_cliente)")
    void agendarCita(
            @Param("_id_usuario") Integer _id_usuario,
            @Param("_id_cliente") Integer _id_cliente,
            @Param("_id_mascota") Integer _id_mascota,
            @Param("_fecha_cita") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") java.util.Date _fecha_cita,
            @Param("_cod_tipo_horario_cita") Integer _cod_tipo_horario_cita,
            @Param("_usuario_insercion") String _usuario_insercion,
            @Param("_motivo_cita") String _motivo_cita,
            @Param("_observaciones_cliente") String _observaciones_cliente);
}
