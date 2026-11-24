INSERT INTO examen_final.oficina (id, nombre) VALUES (1, 'Laboratorio de Sistemas')
ON CONFLICT (id) DO NOTHING;

INSERT INTO examen_final.responsable (id, nombre) VALUES (1, 'Ana Pérez')
ON CONFLICT (id) DO NOTHING;

INSERT INTO examen_final.activo (codigo, descripcion, oficina_id, responsable_id)
VALUES ('PROY-001', 'Proyector de aula', 1, 1)
ON CONFLICT (codigo) DO NOTHING;
