package veterinariaapp.repositories.NavBarRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.NavBarEntity.InformacionEntity;

@Repository
public interface ObtenerInformacion extends JpaRepository<InformacionEntity, Integer> {
    // CREDENCIALES
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_obtener_info_usuario(:_identificador)")
    List<InformacionEntity> sp_obtener_info_usuario(
            @Param("_identificador") String identificador);

}