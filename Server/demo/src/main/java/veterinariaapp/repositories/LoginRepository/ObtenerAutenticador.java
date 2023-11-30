package veterinariaapp.repositories.LoginRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.LoginEntity.ObtenerAutenticadorEntity;

@Repository
public interface ObtenerAutenticador extends JpaRepository<ObtenerAutenticadorEntity, Integer> {
    // AUTENTICADOR
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_obtener_autenticador(:_id)")
    List<ObtenerAutenticadorEntity> sp_obtener_autenticador(
            @Param("_id") Integer id);
}
