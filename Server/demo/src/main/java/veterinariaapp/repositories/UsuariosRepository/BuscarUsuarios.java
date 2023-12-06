package veterinariaapp.repositories.UsuariosRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.UsuariosEntity.UsuarioRegistrado;

@Repository
public interface BuscarUsuarios extends JpaRepository<UsuarioRegistrado, Integer> {
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_obtener_usuarios(:_identificador, :_cod_tipo_usuario)")
    List<UsuarioRegistrado> sp_obtener_usuarios(
            @Param("_identificador") String dni,
            @Param("_cod_tipo_usuario") Integer tipo_usuario);
}
