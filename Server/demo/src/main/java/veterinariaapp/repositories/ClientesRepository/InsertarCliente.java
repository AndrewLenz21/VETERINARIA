package veterinariaapp.repositories.ClientesRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.ClientesEntity.InsertarClienteEntity;

@Repository
public interface InsertarCliente extends JpaRepository<InsertarClienteEntity, String> {
    // INSERTAR CLIENTE
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_insertar_cliente(:_identificador_cliente, :_nombres, :_apellidos, :_celular, :_email, :_utente_inserimento)")
    void sp_insertar_cliente(
            @Param("_identificador_cliente") String identificador,
            @Param("_nombres") String nombres,
            @Param("_apellidos") String apellidos,
            @Param("_celular") String celular,
            @Param("_email") String email,
            @Param("_utente_inserimento") String utenteInserimento);
}
