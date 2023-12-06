package veterinariaapp.repositories.UsuariosRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.UsuariosEntity.ModificarUsuarioEntity;

@Repository
public interface EliminarUsuario extends JpaRepository<ModificarUsuarioEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_borrar_usuario(:_id_usuario, :_id_credenciales, :_id_rol_especialidad)")
    void sp_borrar_usuario(
            @Param("_id_usuario") Integer id_usuario,
            @Param("_id_credenciales") Integer id_credenciales,
            @Param("_id_rol_especialidad") Integer id_rol_especialidad);
}
