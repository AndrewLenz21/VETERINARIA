package veterinariaapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import net.bytebuddy.implementation.bytecode.Throw;
import veterinariaapp.entities.AgendarCitaEntity.AgendarNuevaCitaEntity;
import veterinariaapp.entities.AgendarCitaEntity.BusquedaCitaEntity;
import veterinariaapp.entities.AgendarCitaEntity.HorariosDisponiblesEntity;
import veterinariaapp.repositories.AgendarCitaRepository.AgendarNuevaCita;
import veterinariaapp.repositories.AgendarCitaRepository.BuscarCitas;
import veterinariaapp.repositories.AgendarCitaRepository.BuscarHorariosDisponibles;
import veterinariaapp.repositories.AgendarCitaRepository.GenerarDiagnosticoRepository;
import veterinariaapp.repositories.AgendarCitaRepository.CancelarCitaRepository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

@Service
@Transactional
public class AgendarCitaService {
    @Autowired
    BuscarHorariosDisponibles buscar_horarios;

    public List<HorariosDisponiblesEntity> horarios_disponibles(java.util.Date fecha, Integer veterinario) {
        List<HorariosDisponiblesEntity> horarios = new ArrayList<>();
        try {
            horarios = buscar_horarios.sp_verificar_disponibilidad(fecha, veterinario);
        } catch (Exception ex) {
            throw ex;
        }
        return horarios;
    }

    @Autowired
    AgendarNuevaCita agendar_cita;

    public void agendar_cita(AgendarNuevaCitaEntity cita) {
        System.out.println("Id Usuario: " + cita.getId_usuario());
        System.out.println("Id Cliente: " + cita.getId_cliente());
        System.out.println("Id Mascota: " + cita.getId_mascota());
        System.out.println("Fecha Cita: " + cita.getFecha_cita());
        System.out.println("Cod Tipo Horario Cita: " + cita.getCod_tipo_horario_cita());
        System.out.println("Usuario Inserción: " + cita.getUsuario_insercion());
        System.out.println("Motivo Cita: " + cita.getMotivo_cita());
        System.out.println("Observaciones Cliente: " + cita.getObservaciones_cliente());

        agendar_cita.agendarCita(
                cita.getId_usuario(),
                cita.getId_cliente(),
                cita.getId_mascota(),
                cita.getFecha_cita(),
                cita.getCod_tipo_horario_cita(),
                cita.getUsuario_insercion(),
                cita.getMotivo_cita(),
                cita.getObservaciones_cliente());
    }

    @Autowired
    BuscarCitas buscar_citas;

    public List<BusquedaCitaEntity> buscar_citas(String dni, Integer cod_usuario, Integer cod_tipo_estado_cita,
            Integer cod_tipo_horario_cita, java.util.Date fecha) {
        List<BusquedaCitaEntity> result = new ArrayList<BusquedaCitaEntity>();
        try {
            result = buscar_citas.sp_obtener_citas(dni, cod_usuario, cod_tipo_estado_cita,
                    cod_tipo_horario_cita, fecha);
        } catch (Exception ex) {
            throw ex;
        }
        return result;
    }

    @Autowired
    GenerarDiagnosticoRepository generar_diagnostico;

    public void generar_diagnostico(Integer cod_cita, String diagnostico, String receta_detalle) {
        try {
            generar_diagnostico.registrarReporteCita(cod_cita, diagnostico, receta_detalle);
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Autowired
    CancelarCitaRepository cancelar_cita;

    public void cancelar_cita(Integer cod_cita) {
        try {
            cancelar_cita.sp_cancelar_cita(cod_cita);
        } catch (Exception ex) {
            throw ex;
        }
    }

}
