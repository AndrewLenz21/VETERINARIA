package veterinariaapp.repositories.AgendarCitaRepository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.AgendarCitaEntity.BusquedaCitaEntity;

public interface BuscarCitas extends JpaRepository<BusquedaCitaEntity, Integer> {

    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_obtener_citas(:_identificador_cliente, :_cod_usuario, :_cod_tipo_estado_cita, :_cod_tipo_horario_cita)")
    List<BusquedaCitaEntity> sp_obtener_citas(
            @Param("_identificador_cliente") String id_cliente,
            @Param("_cod_usuario") Integer id_usuario,
            @Param("_cod_tipo_estado_cita") Integer cod_estado_cita,
            @Param("_cod_tipo_horario_cita") Integer cod_horario_cita);
}
