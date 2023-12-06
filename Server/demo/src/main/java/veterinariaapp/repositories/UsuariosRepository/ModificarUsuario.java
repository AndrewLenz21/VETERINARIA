package veterinariaapp.repositories.UsuariosRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.UsuariosEntity.ModificarUsuarioEntity;

@Repository
public interface ModificarUsuario extends JpaRepository<ModificarUsuarioEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_actualizar_usuario(:_id_usuario, :_id_credenciales, :_id_especialidad, :_dni, :_nombres, :_apellidos, :_cod_tipo_usuario, :_rol_especialidad, :_email, :_password, :_utente_modificacion)")
    void sp_actualizar_usuario(
            @Param("_id_usuario") Integer id_usuario,
            @Param("_id_credenciales") Integer id_credenciales,
            @Param("_id_especialidad") Integer id_especialidad,
            @Param("_dni") String dni,
            @Param("_nombres") String nombres,
            @Param("_apellidos") String apellidos,
            @Param("_cod_tipo_usuario") Integer cod_tipo_usuario,
            @Param("_rol_especialidad") String rol_especialidad,
            @Param("_email") String email,
            @Param("_password") String password,
            @Param("_utente_modificacion") String utente_modificacion);
}
