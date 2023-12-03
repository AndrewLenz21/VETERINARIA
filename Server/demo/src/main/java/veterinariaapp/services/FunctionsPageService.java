package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import veterinariaapp.entities.FunctionsPageEntity.UsuarioFuncionesEntity;
import veterinariaapp.repositories.FunctionsPageRepository.ObtenerFunciones;

@Service
@Transactional
public class FunctionsPageService {
    @Autowired
    ObtenerFunciones funciones_por_usuario;

    public List<UsuarioFuncionesEntity> obtener_funciones_usuario(Integer id) {
        List<UsuarioFuncionesEntity> funciones = new ArrayList<>();
        try {
            funciones = funciones_por_usuario.sp_obtener_funciones_usuario(id);
        } catch (Exception ex) {
            throw ex;
        }
        return funciones;
    }

}
