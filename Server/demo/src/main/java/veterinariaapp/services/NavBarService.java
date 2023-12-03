package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;
import veterinariaapp.entities.UsuarioEntity;
import veterinariaapp.entities.NavBarEntity.InformacionEntity;
import veterinariaapp.entities.LoginEntity.ObtenerAutenticadorEntity;
import veterinariaapp.repositories.NavBarRepository.ObtenerInformacion;

@Service
@Transactional
public class NavBarService {
    @Autowired
    ObtenerInformacion informacion_usuario;

    public InformacionEntity obtener_informacion_usuario(String identificador) {
        List<InformacionEntity> result = new ArrayList<>();
        InformacionEntity informacion = new InformacionEntity();
        try {
            result = informacion_usuario.sp_obtener_info_usuario(identificador);
            informacion = result.get(0);
        } catch (Exception ex) {
            throw ex;
        }
        return informacion;
    }
}
