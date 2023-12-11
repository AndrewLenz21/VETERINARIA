package veterinariaapp.services;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JRDesignDataset;
import veterinariaapp.entities.AgendarCitaEntity.BusquedaCitaEntity;
import veterinariaapp.entities.HistorialClinicoEntity.ReporteClinicoDTO;
import veterinariaapp.repositories.AgendarCitaRepository.BuscarCitas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ResourceLoader;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;

@Service
public class HistorialClinicoService {

    @Autowired
    private final BuscarCitas buscarCitas;
    @Autowired
    private final ResourceLoader resourceLoader;

    public HistorialClinicoService(BuscarCitas buscarCitas, ResourceLoader resourceLoader) {
        this.buscarCitas = buscarCitas;
        this.resourceLoader = resourceLoader;
    }

    public byte[] generarReporte(String idCliente, Integer idUsuario, Integer codEstadoCita, Integer codHorarioCita,
            Date fecha) {
        try {
            List<BusquedaCitaEntity> entidades = buscarCitas.sp_obtener_citas(idCliente, idUsuario, codEstadoCita,
                    codHorarioCita, fecha);

            List<ReporteClinicoDTO> reporteClinicoDTOList = entidades.stream()
                    .map(ReporteClinicoDTO::fromEntity)
                    .collect(Collectors.toList());
            // reporteClinicoDTOList.forEach(System.out::println);
            InputStream jasperStream = null;
            try {
                // UBICA EL ARCHIVO JRXML
                jasperStream = resourceLoader.getResource("classpath:veterinaria.jrxml").getInputStream();

            } catch (IOException e) {
                throw new RuntimeException("Error al leer el archivo JRXML", e);
            }

            // ESCOGE EL ARCHIVO DE COMPILAR
            JasperReport jasperReport = JasperCompileManager.compileReport(jasperStream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(reporteClinicoDTOList);
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("citasData", new JRBeanCollectionDataSource(reporteClinicoDTOList));

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            return JasperExportManager.exportReportToPdf(jasperPrint);

        } catch (JRException e) {
            System.err.println("Error al compilar el reporte:");
            e.printStackTrace();
            throw new RuntimeException("Error al crear el reporte", e);
        }
    }
}
