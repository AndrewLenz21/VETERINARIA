package veterinariaapp.repositories.ClientesRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.ClientesEntity.Clientes;

@Repository
public interface BuscarClientes extends JpaRepository<Clientes, Integer> {
    // OBTENER CLIENTES
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_buqueda_cliente(:_dni)")
    List<Clientes> sp_buqueda_cliente(
            @Param("_dni") String dni);
}
