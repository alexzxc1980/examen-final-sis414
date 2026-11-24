package bo.edu.uatf.activos;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Activos fijos")
public class AsignacionController {
    private final JdbcClient jdbc;

    public AsignacionController(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/api/activos/{codigo}/asignacion")
    @Operation(summary = "Consultar la oficina y el responsable de un activo")
    public ResponseEntity<Asignacion> consultar(@Parameter(example = "PROY-001") @PathVariable String codigo) {
        var asignacion = jdbc.sql("""
                SELECT a.codigo, a.descripcion, o.nombre AS oficina, r.nombre AS responsable
                FROM examen_final.activo a
                JOIN examen_final.oficina o ON o.id = a.oficina_id
                JOIN examen_final.responsable r ON r.id = a.responsable_id
                WHERE a.codigo = :codigo
                """)
                .param("codigo", codigo)
                .query(Asignacion.class)
                .optional();
        return ResponseEntity.of(asignacion);
    }
}
