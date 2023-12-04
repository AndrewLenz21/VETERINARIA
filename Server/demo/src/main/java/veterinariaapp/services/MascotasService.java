package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import veterinariaapp.entities.MascotasEntity.Mascotas;
import veterinariaapp.entities.MascotasEntity.InsertarMascotaEntity;

import veterinariaapp.repositories.MascotasRepository.BuscarMascotas;
import veterinariaapp.repositories.MascotasRepository.InsertarMascota;
import veterinariaapp.repositories.MascotasRepository.EliminarMascota;

@Service
@Transactional
public class MascotasService {
    @Autowired
    BuscarMascotas buscar_mascotas;

    public List<Mascotas> buscar_mascotas(String dni) {
        List<Mascotas> mascotas = new ArrayList<>();
        try {
            mascotas = buscar_mascotas.sp_buscar_mascotas(dni);
        } catch (Exception ex) {
            throw ex;
        }
        return mascotas;
    }

    @Autowired
    InsertarMascota insertar_mascota;

    public void insertar_mascota(InsertarMascotaEntity mascota) {
        System.out.println("Identificador: " + mascota.getIdentificador());
        System.out.println("Nombre: " + mascota.getNombre());
        System.out.println("Tipo: " + mascota.getTipo());
        System.out.println("Edad: " + mascota.getEdad());
        System.out.println("Sexo: " + mascota.getSexo());
        System.out.println("Utente Inserimento: " + mascota.getUtente_inserimento());
        try {
            insertar_mascota.sp_insertar_mascotas(
                    mascota.getIdentificador(),
                    mascota.getNombre(),
                    mascota.getTipo(),
                    mascota.getEdad(),
                    mascota.getSexo(),
                    mascota.getUtente_inserimento());
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    EliminarMascota eliminar_mascota;

    public void eliminar_mascota(Integer id_mascota) {
        System.out.println("Identificador: " + id_mascota);
        try {
            eliminar_mascota.sp_eliminar_mascota(id_mascota);
        } catch (Exception ex) {
            throw ex;
        }
    }

}
