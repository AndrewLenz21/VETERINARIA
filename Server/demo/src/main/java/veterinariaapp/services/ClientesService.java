package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import veterinariaapp.entities.ClientesEntity.Clientes;
import veterinariaapp.entities.ClientesEntity.InsertarClienteEntity;
import veterinariaapp.entities.ClientesEntity.ModificarClienteEntity;

import veterinariaapp.repositories.ClientesRepository.BuscarClientes;
import veterinariaapp.repositories.ClientesRepository.InsertarCliente;
import veterinariaapp.repositories.ClientesRepository.ModificarCliente;
import veterinariaapp.repositories.ClientesRepository.EliminarCliente;

@Service
@Transactional
public class ClientesService {
    @Autowired
    BuscarClientes buscar_clientes;

    public List<Clientes> buscar_clientes(String dni) {
        List<Clientes> clientes = new ArrayList<>();
        try {
            clientes = buscar_clientes.sp_buqueda_cliente(dni);
        } catch (Exception ex) {
            throw ex;
        }
        return clientes;
    }

    @Autowired
    InsertarCliente insertar_cliente;

    public void insertar_cliente(InsertarClienteEntity nuevoCliente) {
        try {
            insertar_cliente.sp_insertar_cliente(
                    nuevoCliente.getIdentificador(),
                    nuevoCliente.getNombres(),
                    nuevoCliente.getApellidos(),
                    nuevoCliente.getCelular(),
                    nuevoCliente.getEmail(),
                    nuevoCliente.getUtente_inserimento());
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    ModificarCliente modificar_cliente;

    public void modificar_cliente(ModificarClienteEntity modificaCliente) {
        try {
            modificar_cliente.sp_modificar_cliente(
                    modificaCliente.getIdCliente(),
                    modificaCliente.getIdentificador(),
                    modificaCliente.getNombres(),
                    modificaCliente.getApellidos(),
                    modificaCliente.getCelular(),
                    modificaCliente.getEmail());
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    EliminarCliente eliminar_cliente;

    public void eliminar_cliente(String identificador) {
        try {
            eliminar_cliente.sp_eliminar_cliente(identificador);
        } catch (Exception ex) {
            throw ex;
        }
    }
}
