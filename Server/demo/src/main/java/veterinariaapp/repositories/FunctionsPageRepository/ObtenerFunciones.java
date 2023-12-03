package veterinariaapp.repositories.FunctionsPageRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.FunctionsPageEntity.UsuarioFuncionesEntity;

@Repository
public interface ObtenerFunciones extends JpaRepository<UsuarioFuncionesEntity, Integer> {
    // OBTENER FUNCIONES
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_obtener_funciones_usuario(:_id)")
    List<UsuarioFuncionesEntity> sp_obtener_funciones_usuario(
            @Param("_id") Integer id);
}
