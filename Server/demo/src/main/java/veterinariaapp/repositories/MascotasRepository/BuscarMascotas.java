package veterinariaapp.repositories.MascotasRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import veterinariaapp.entities.MascotasEntity.Mascotas;

@Repository
public interface BuscarMascotas extends JpaRepository<Mascotas, Integer> {
    @Transactional
    @Query(nativeQuery = true, value = "CALL sp_buscar_mascotas(:_dni)")
    List<Mascotas> sp_buscar_mascotas(
            @Param("_dni") String dni);
}
