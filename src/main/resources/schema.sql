CREATE SCHEMA IF NOT EXISTS examen_final;

CREATE TABLE IF NOT EXISTS examen_final.oficina (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(65) NOT NULL
);

CREATE TABLE IF NOT EXISTS examen_final.responsable (
    id INTEGER PRIMARY KEY,
    nombre VARCHAR(35) NOT NULL
);

CREATE TABLE IF NOT EXISTS examen_final.activo (
    codigo VARCHAR(15) PRIMARY KEY,
    descripcion VARCHAR(150) NOT NULL,
    oficina_id INTEGER NOT NULL REFERENCES examen_final.oficina(id),
    responsable_id INTEGER NOT NULL REFERENCES examen_final.responsable(id)
);
