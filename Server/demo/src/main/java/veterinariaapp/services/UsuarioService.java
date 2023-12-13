package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import veterinariaapp.repositories.UsuariosRepository.BuscarUsuarios;
import veterinariaapp.repositories.UsuariosRepository.EliminarUsuario;
import veterinariaapp.repositories.UsuariosRepository.InsertarUsuario;
import veterinariaapp.repositories.UsuariosRepository.ModificarUsuario;
import veterinariaapp.entities.UsuariosEntity.InsertarUsuarioEntity;
import veterinariaapp.entities.UsuariosEntity.ModificarUsuarioEntity;
import veterinariaapp.entities.UsuariosEntity.UsuarioRegistrado;

@Service
@Transactional
public class UsuarioService {
    @Autowired
    BuscarUsuarios buscar_usuarios;

    public List<UsuarioRegistrado> buscar_usuarios(String dni, Integer tipo_usuario) {
        List<UsuarioRegistrado> usuarios = new ArrayList<>();
        try {
            usuarios = buscar_usuarios.sp_obtener_usuarios(dni, tipo_usuario);
        } catch (Exception ex) {
            throw ex;
        }
        return usuarios;
    }

    @Autowired
    InsertarUsuario insertar_usuario;

    public void insertar_usuario(InsertarUsuarioEntity usuario) {
        try {
            insertar_usuario.sp_registrar_usuario(
                    usuario.getIdentificador(),
                    usuario.getNombres(),
                    usuario.getApellidos(),
                    usuario.getCod_tipo_usuario(),
                    usuario.getRol_especialidad(),
                    usuario.getEmail(),
                    usuario.getPassword(),
                    usuario.getUtente_inserimento());
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    ModificarUsuario modificar_usuario;

    public void modificar_usuario(ModificarUsuarioEntity usuario) {
        System.out.println("Id_usuario: " + usuario.getId_usuario());
        System.out.println("Id_credenciales: " + usuario.getId_credenciales());
        System.out.println("Id_especialidad: " + usuario.getId_especialidad());
        System.out.println("Dni: " + usuario.getDni());
        System.out.println("Nombres: " + usuario.getNombres());
        System.out.println("Apellidos: " + usuario.getApellidos());
        System.out.println("Cod_tipo_usuario: " + usuario.getCod_tipo_usuario());
        System.out.println("Rol_especialidad: " + usuario.getRol_especialidad());
        System.out.println("Email: " + usuario.getEmail());
        System.out.println("Password: " + usuario.getPassword());
        System.out.println("Utente_modificacion: " + usuario.getUtente_modificacion());

        try {
            modificar_usuario.sp_actualizar_usuario(
                    usuario.getId_usuario(),
                    usuario.getId_credenciales(),
                    usuario.getId_especialidad(),
                    usuario.getDni(),
                    usuario.getNombres(),
                    usuario.getApellidos(),
                    usuario.getCod_tipo_usuario(),
                    usuario.getRol_especialidad(),
                    usuario.getEmail(),
                    usuario.getPassword(),
                    usuario.getUtente_modificacion());
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    EliminarUsuario eliminar_usuario;

    public void eliminar_usuario(Integer id_usuario, Integer id_credenciales, Integer id_rol_especialidad) {
        try {
            eliminar_usuario.sp_borrar_usuario(id_usuario, id_credenciales, id_rol_especialidad);
        } catch (Exception ex) {
            throw ex;
        }
    }
}
