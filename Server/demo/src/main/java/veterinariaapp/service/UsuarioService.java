package veterinariaapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import veterinariaapp.repository.UsuarioRepository;
import veterinariaapp.entity.LoginEntity;
import veterinariaapp.entity.UsuarioEntity;

@Service
@Transactional
public class UsuarioService {
    @Autowired UsuarioRepository usuarioRepository;

    public List<UsuarioEntity> ricerca_tabla_prueba_1(Integer id, String name, String email){
        List<UsuarioEntity> result = new ArrayList<>();
        result = usuarioRepository.sp_ricerca_tabla_prueba(id,name, email);
        return result;
    }

    public List<UsuarioEntity> ricerca_tabla_prueba_2(LoginEntity.FiltroUsuario filtro){
        List<UsuarioEntity> result = new ArrayList<>();
        //int id = filtro.getId();
        //String name = filtro.getName();
        result = usuarioRepository.sp_ricerca_tabla_prueba(filtro.getId(), filtro.getName(), filtro.getEmail());
        return result;
    }

    //FUNCION INSERIMENTO
    public boolean insertar_persona(String nombre, String email){
        try {
            System.out.println("We are here on Service!!");
            usuarioRepository.sp_insertar_persona(nombre, email);
            return true; // Inserción exitosa
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("Inserción fatal error");
            return false; // Inserción fallida
        }
    }

    public String actualizar_persona(LoginEntity.FiltroUsuario filtro){
        String message = "";
        try {
            usuarioRepository.sp_actualizar_persona(filtro.getId(), filtro.getName(), filtro.getEmail());
            message = "Persona actualizada con exito";
        } catch (Exception e) {
            message = "Error actualizando persona: " + e.getMessage();
        }
        return message;
    }

    public String eliminar_persona(Integer id){
        String message = "";
        try {
            usuarioRepository.sp_eliminar_persona(id);
            message = "Persona eliminada con exito";
        } catch (Exception e) {
            message = "Error eliminando persona: " + e.getMessage();
        }
        return message;
    }

}