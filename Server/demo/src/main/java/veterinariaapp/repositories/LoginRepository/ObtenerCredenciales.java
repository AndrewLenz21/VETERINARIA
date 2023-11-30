package veterinariaapp.repositories.LoginRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.LoginEntity.AutenticadorEntity;

@Repository
public interface ObtenerCredenciales extends JpaRepository<AutenticadorEntity, Integer> {

        // CREDENCIALES
        @Transactional
        @Query(nativeQuery = true, value = "CALL sp_obtener_credenciales(:_email)")
        List<AutenticadorEntity> sp_obtener_credenciales(
                        @Param("_email") String emailUser);

}
