package veterinariaapp.repositories.UsuariosRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.UsuariosEntity.InsertarUsuarioEntity;

@Repository
public interface InsertarUsuario extends JpaRepository<InsertarUsuarioEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_registrar_usuario(:_identificador, :_nombres, :_apellidos, :_cod_tipo_usuario, :_rol_especialidad, :_email, :_password, :_utente_inserimento)")
    void sp_registrar_usuario(
            @Param("_identificador") String identificador,
            @Param("_nombres") String nombres,
            @Param("_apellidos") String apellidos,
            @Param("_cod_tipo_usuario") Integer cod_tipo_usuario,
            @Param("_rol_especialidad") String rol_especialidad,
            @Param("_email") String email,
            @Param("_password") String password,
            @Param("_utente_inserimento") String utente_inserimento);
}
