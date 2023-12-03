package veterinariaapp.repositories.ClientesRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.ClientesEntity.ModificarClienteEntity;

@Repository
public interface EliminarCliente extends JpaRepository<ModificarClienteEntity, Integer> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "CALL sp_eliminar_cliente(:_identificador_cliente)")
    void sp_eliminar_cliente(
            @Param("_identificador_cliente") String identificador);
}
