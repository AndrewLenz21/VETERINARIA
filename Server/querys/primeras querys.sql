USE freedb_VeterinariaAPP;
INSERT INTO TABLA_PRUEBA (nombre, email)
    VALUES ("Alan Garcia", "alan_g@gmail.com");

USE freedb_VeterinariaAPP;
SELECT 
        id,
        nombre,
        email
    FROM TABLA_PRUEBA_2;

USE freedb_VeterinariaAPP;
UPDATE TABLA_PRUEBA_2 
SET nombre = "Angel", email = "angel_sss@gmail.com";

CREATE TABLE TABLA_PRUEBA_2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60),
    email VARCHAR(60)
);


USE freedb_VeterinariaAPP;
CALL sp_ricerca_tabla_prueba(null, "Alan Garcia", null);

USE freedb_VeterinariaAPP;
CALL sp_actualizar_persona(3, "Luis Miguel", "luismi@otlook.com");

INSERT INTO TABLA_PRUEBA_2 (nombre, email)
VALUES
    ('Andrew', 'angel@hotmail.com'),
    ('Jhosselyn', 'jhossy@gmail.com'),
    ('Luis', 'luis@outlook.com'),
    ('Angel', 'angel@gmail.com'),
    ('Grecia', 'grecia@hotmail.com');
    

--PRIMERA STORED PROCEDURE
DELIMITER //
CREATE PROCEDURE sp_ricerca_tabla_prueba(IN _id INT, IN _name VARCHAR(40))
BEGIN
    SELECT 
        id,
        nombre,
        email
    FROM TABLA_PRUEBA
    WHERE (_id IS NULL OR id = _id)
    AND (_name IS NULL OR nombre LIKE CONCAT('%', _name, '%'));
END //


-- DROP PROCEDURE IF EXISTS sp_ricerca_tabla_prueba;
USE freedb_VeterinariaAPP;
DELIMITER //
CREATE PROCEDURE sp_busqueda_tabla_prueba(
    IN _id INT, 
    IN _nombre VARCHAR(60), 
    IN _email VARCHAR(60) -- Agrega este nuevo parámetro para el filtro de email
)
BEGIN
    SELECT 
        id,
        nombre,
        email
    FROM TABLA_PRUEBA
    WHERE (_id IS NULL OR id = _id)
    AND (_nombre IS NULL OR nombre LIKE CONCAT('%', _nombre, '%'))
    AND (_email IS NULL OR email LIKE CONCAT('%', _email, '%')); -- Incluye la condición del email aquí
END //
DELIMITER ;

CALL sp_ricerca_tabla_prueba(3, null, null);

DELIMITER ;

--STORED PROCEDURE INSERT
DELIMITER //
CREATE PROCEDURE sp_insertar_persona
(
    IN nombre VARCHAR(60),
    IN email VARCHAR(60)
)
BEGIN
    INSERT INTO TABLA_PRUEBA (nombre, email)
    VALUES (nombre, email);
END;
//
DELIMITER ;

--STORED PROCEDURE UPDATE

DELIMITER //
CREATE PROCEDURE sp_actualizar_persona
(
    IN _id INT,                  -- Parámetro para el ID (usado en la cláusula WHERE)
    IN _nombre VARCHAR(60),      -- Parámetro para el nuevo nombre
    IN _email VARCHAR(60)        -- Parámetro para el nuevo email
)
BEGIN
    UPDATE TABLA_PRUEBA
    SET nombre = _nombre, email = _email
    WHERE id = _id;              -- La actualización se aplica donde el id coincide con el parámetro _id
END;
//
DELIMITER ;

CALL sp_actualizar_persona(3,"Luis Miguel","luismi@outlook.com")

--STORED PROCEDURE DELETE

DELIMITER //
CREATE PROCEDURE sp_eliminar_persona
(
    IN _id INT  -- Parámetro para el ID (usado en la cláusula WHERE para identificar la fila a eliminar)
)
BEGIN
    DELETE FROM TABLA_PRUEBA
    WHERE id = _id;  -- Elimina la fila donde el id coincide con el parámetro _id
END;
//
DELIMITER ;

SELECT * FROM CITAS_AGENDADAS;