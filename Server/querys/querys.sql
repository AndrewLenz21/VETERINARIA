USE freedb_VeterinariaAPP;

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



SELECT * FROM TABLA_PRUEBA;

CALL sp_insertar_persona('Cristian', 'cristian@outlook.com');
-- DROP PROCEDURE IF EXISTS sp_ricerca_tabla_prueba;

DELIMITER //
CREATE PROCEDURE sp_ricerca_tabla_prueba(
    IN _id INT, 
    IN _name VARCHAR(60), 
    IN _email VARCHAR(60) -- Agrega este nuevo parámetro para el filtro de email
)
BEGIN
    SELECT 
        id,
        nombre,
        email
    FROM TABLA_PRUEBA
    WHERE (_id IS NULL OR id = _id)
    AND (_name IS NULL OR nombre LIKE CONCAT('%', _name, '%'))
    AND (_email IS NULL OR email LIKE CONCAT('%', _email, '%')); -- Incluye la condición del email aquí
END //
DELIMITER ;
