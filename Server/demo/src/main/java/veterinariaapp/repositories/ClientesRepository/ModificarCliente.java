package veterinariaapp.repositories.ClientesRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.ClientesEntity.ModificarClienteEntity;

@Repository
public interface ModificarCliente extends JpaRepository<ModificarClienteEntity, Integer> {
    // INSERTAR CLIENTE
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_modificar_cliente(:_id_cliente, :_identificador_cliente, :_nombres, :_apellidos, :_celular, :_email)")
    void sp_modificar_cliente(
            @Param("_id_cliente") Integer id_cliente,
            @Param("_identificador_cliente") String identificador,
            @Param("_nombres") String nombres,
            @Param("_apellidos") String apellidos,
            @Param("_celular") String celular,
            @Param("_email") String email);

}
