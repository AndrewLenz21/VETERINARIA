package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;
import veterinariaapp.entities.UsuarioEntity;
import veterinariaapp.entities.LoginEntity.AutenticadorEntity;
import veterinariaapp.entities.LoginEntity.ObtenerAutenticadorEntity;

import veterinariaapp.repositories.LoginRepository.ObtenerCredenciales;
import veterinariaapp.repositories.LoginRepository.ObtenerAutenticador;

@Service
@Transactional
public class LoginService {
    @Autowired
    ObtenerCredenciales credenciales;
    @Autowired
    ObtenerAutenticador autenticador;

    public List<AutenticadorEntity> obtener_usuarios(String email) {
        List<AutenticadorEntity> result = new ArrayList<>();
        try {
            result = credenciales.sp_obtener_credenciales(email);

        } catch (Exception ex) {
            throw ex;
        }
        return result;
    }

    public boolean autenticador(String password_de_evaluar, String password_verdadera) {
        boolean result = false;
        result = password_de_evaluar.equals(password_verdadera);
        return result;
    }

    public ObtenerAutenticadorEntity obtener_autenticador(Integer id) {
        List<ObtenerAutenticadorEntity> list_result = new ArrayList<>();
        ObtenerAutenticadorEntity result = new ObtenerAutenticadorEntity();
        try {
            // Por fuerza obtiene solo un valor porque es la primary key
            list_result = autenticador.sp_obtener_autenticador(id);
            result = list_result.get(0);
        } catch (Exception ex) {
            throw ex;
        }
        return result;
    }
}
