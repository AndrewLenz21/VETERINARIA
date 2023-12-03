USE freedb_VeterinariaAPP;
-- Define usuario master con cuenta admin con todas las funciones
CREATE TABLE TIPO_USUARIO(
    COD_TIPO_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
    DESCRIPCION_TIPO_USUARIO VARCHAR(100),
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);
-- UTENTE INSERCION ES 71248074 (DNI YENIFER)
SELECT * FROM TIPO_USUARIO;
INSERT INTO TIPO_USUARIO (DESCRIPCION_TIPO_USUARIO, UTENTE_INSERCION)
VALUES
    ('Admin', '71248074'),
    ('Veterinario', '71248074'),
    ('Secretario', '71248074')
;
-- Creacion de la tabla de usuarios
USE freedb_VeterinariaAPP;
-- Define usuario master con cuenta admin con todas las funciones
CREATE TABLE USUARIOS(
    ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
    IDENTIFICADOR VARCHAR(8),
    NOMBRES VARCHAR(200),
    APELLIDOS VARCHAR(200),
    COD_TIPO_USUARIO INT,
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);

SELECT * FROM USUARIOS U
LEFT JOIN TIPO_USUARIO TIP ON TIP.COD_TIPO_USUARIO = U.COD_TIPO_USUARIO;
SELECT * FROM USUARIO_CREDENCIALES;

INSERT INTO USUARIOS (IDENTIFICADOR, NOMBRES, APELLIDOS, COD_TIPO_USUARIO, UTENTE_INSERCION)
VALUES
    ('71248074','Yenifer', 'Escobar',1, '71248074')
;


USE freedb_VeterinariaAPP;
-- Define usuario master con cuenta admin con todas las funciones
CREATE TABLE USUARIO_CREDENCIALES(
    ID_CREDENCIALES INT AUTO_INCREMENT PRIMARY KEY,
    ID_USUARIO INT,
    EMAIL VARCHAR(200),
    PASSWORD VARCHAR(200),
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);
SELECT * FROM USUARIO_CREDENCIALES;

INSERT INTO USUARIO_CREDENCIALES (ID_USUARIO, EMAIL, PASSWORD, UTENTE_INSERCION)
VALUES
    (1,'yenifer_admin@master.com', 'adminpassword', '71248074')
;

-- Credenciales procedure 
DELIMITER //
CREATE PROCEDURE sp_obtener_credenciales(IN _email VARCHAR(200))
BEGIN
    SELECT 
        U.ID_USUARIO AS id,
        U.NOMBRES AS nombres,
        U.APELLIDOS AS apellidos,
        AUTH.EMAIL AS email,
        AUTH.PASSWORD AS password
    FROM USUARIOS U
    LEFT JOIN USUARIO_CREDENCIALES AUTH ON U.ID_USUARIO = AUTH.ID_USUARIO
    WHERE (_email IS NULL OR AUTH.EMAIL = CONCAT(_email));
END //
-- DROP PROCEDURE IF EXISTS sp_autenticador;
CALL sp_autenticador('yenifer_admin@master.com')

-- Autenticador procedure 
DELIMITER //
CREATE PROCEDURE sp_obtener_autenticador(IN _id INT)
BEGIN
    SELECT 
        U.ID_USUARIO AS id,
        U.IDENTIFICADOR AS autenticador,
        U.COD_TIPO_USUARIO AS cod_tipo_usuario,
        TIP.DESCRIPCION_TIPO_USUARIO AS desc_tipo_usuario
    FROM USUARIOS U
    LEFT JOIN TIPO_USUARIO TIP ON TIP.COD_TIPO_USUARIO = U.COD_TIPO_USUARIO
    WHERE (_id IS NULL OR U.ID_USUARIO = _id);
END //

-- Obtener Nombres
DELIMITER //
CREATE PROCEDURE sp_obtener_info_usuario(IN _identificador VARCHAR(60))
BEGIN
    SELECT 
        U.ID_USUARIO AS id,
        U.COD_TIPO_USUARIO AS cod_tipo_usuario,
        U.NOMBRES AS nombres,
        U.APELLIDOS AS apellidos,
        U.IDENTIFICADOR AS autenticador,
        TIP.DESCRIPCION_TIPO_USUARIO AS desc_tipo_usuario,
        AUTH.EMAIL AS email
    FROM USUARIOS U
    LEFT JOIN TIPO_USUARIO TIP ON TIP.COD_TIPO_USUARIO = U.COD_TIPO_USUARIO
    LEFT JOIN USUARIO_CREDENCIALES AUTH ON U.ID_USUARIO = AUTH.ID_USUARIO
    WHERE (_identificador IS NULL OR U.IDENTIFICADOR = _identificador);
END //
 -- DROP PROCEDURE IF EXISTS sp_obtener_info_usuario;
CALL sp_obtener_info_usuario('71248074');
-- TABLA PARA DEFINR FUNCIONES
CREATE TABLE TIPO_FUNCION(
    COD_TIPO_FUNCION INT AUTO_INCREMENT PRIMARY KEY,
    DESC_TIPO_FUNCION VARCHAR(200),
    PATH_IMAGEN VARCHAR(200),
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);

SELECT * FROM TIPO_FUNCION;
INSERT INTO TIPO_FUNCION (DESC_TIPO_FUNCION, UTENTE_INSERCION)
VALUES
    ('Historial Clinico', '71248074')
;

SELECT * FROM TIPO_FUNCION;

UPDATE TIPO_FUNCION
SET PATH_IMAGEN = 'HISTORIALCLINICO'
WHERE COD_TIPO_FUNCION = 7
-- DEFINIR QUIEN TIENE ACCESO A NUESTRAS FUNCIONES
CREATE TABLE FUNCIONES_POR_TIPO_USUARIO(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    COD_TIPO_USUARIO INT,
    COD_TIPO_FUNCION INT,
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);
SELECT * FROM TIPO_FUNCION
SELECT * FROM FUNCIONES_POR_TIPO_USUARIO
-- ESTAMOS DEFINIENDO QUE EL TIPO USUARIO 'admin' POSEE TODAS LAS FUNCIONALIDADES
INSERT INTO FUNCIONES_POR_TIPO_USUARIO (COD_TIPO_USUARIO, COD_TIPO_FUNCION, UTENTE_INSERCION)
VALUES
    (1, 7, '71248074');
    
-- DEFINIR STORE PROCEDURE
-- Obtener Funciones por cod_tipo_usuario
DELIMITER //
CREATE PROCEDURE sp_obtener_funciones_usuario(IN _cod_tipo_usuario INT)
BEGIN
    SELECT 
		FUNC.ID as id,
        FUNC.COD_TIPO_USUARIO AS cod_tipo_usuario,
        TIP.DESCRIPCION_TIPO_USUARIO AS desc_tipo_usuario,
        FUNC.COD_TIPO_FUNCION AS cod_tipo_funcion,
        TIP_FUNC.DESC_TIPO_FUNCION AS desc_tipo_funcion,
        TIP_FUNC.PATH_IMAGEN AS path_imagen
    FROM FUNCIONES_POR_TIPO_USUARIO FUNC
    LEFT JOIN TIPO_USUARIO TIP ON TIP.COD_TIPO_USUARIO = FUNC.COD_TIPO_USUARIO
    LEFT JOIN TIPO_FUNCION TIP_FUNC ON TIP_FUNC.COD_TIPO_FUNCION = FUNC.COD_TIPO_FUNCION
    WHERE (_cod_tipo_usuario IS NULL OR FUNC.COD_TIPO_USUARIO = _cod_tipo_usuario)
    AND FUNC.ID NOT IN (1);
END //
 -- DROP PROCEDURE IF EXISTS sp_obtener_funciones_usuario;
 CALL sp_obtener_funciones_usuario(null);
 SELECT * FROM TIPO_FUNCION
 DELETE FROM TIPO_FUNCION
 WHERE COD_TIPO_FUNCION = 8
-- MAPEO DE LOS OWNERS Y MASCOTAS
CREATE TABLE CLIENTES(
	ID_CLIENTE INT AUTO_INCREMENT PRIMARY KEY,
    IDENTIFICADOR_CLIENTE VARCHAR(8), -- LO USAREMOS PARA LA TABLA MASCOTAS
    NOMBRES VARCHAR(200),
    APELLIDOS VARCHAR(200),
    CELULAR VARCHAR(15),
    EMAIL VARCHAR(200),
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);

SELECT * FROM FUNCIONES_POR_TIPO_USUARIO
DELETE FROM FUNCIONES_POR_TIPO_USUARIO
WHERE ID = 7

SELECT * FROM TIPO_USUARIO

CREATE TABLE MASCOTAS(
	ID_MASCOTA INT AUTO_INCREMENT PRIMARY KEY,
    IDENTIFICADOR_CLIENTE VARCHAR(8),
    NOMBRE_MASCOTA VARCHAR(200),
    TIPO_MASCOTA VARCHAR(200),
    EDAD INT,
    SEXO VARCHAR(1), -- M o F
    FECHA_INSERCION DATETIME DEFAULT CURRENT_TIMESTAMP, -- fecha por default
    UTENTE_INSERCION VARCHAR(8)
);
SELECT * FROM CLIENTES
-- INSERTO DATOS FICTICIOS
INSERT INTO CLIENTES (IDENTIFICADOR_CLIENTE, NOMBRES, APELLIDOS, CELULAR, EMAIL, UTENTE_INSERCION)
VALUES
    ('77788885', 'Leonardo Alberto', 'Perez', '123456789', 'leoalberto@email.com', '71248074'),
    ('76355454', 'Yamileth Maria', 'Alcacer Alvarez', '987654321', 'yami_alcacer@email.com', '71248074');
-- INSERTAR MASCOTAS
-- Insertar 3 mascotas para el primer cliente y 1 mascota para el segundo cliente
-- Cliente 1
INSERT INTO MASCOTAS (IDENTIFICADOR_CLIENTE, NOMBRE_MASCOTA, TIPO_MASCOTA, EDAD, SEXO, UTENTE_INSERCION)
VALUES
    ('77788885', 'Shagui', 'Perro', 2, 'M', '71248074'),
    ('77788885', 'Tigre', 'Gato', 1, 'F', '71248074'),
    ('77788885', 'Coco', 'Loro', 1, 'M', '71248074');

-- Cliente 2
INSERT INTO MASCOTAS (IDENTIFICADOR_CLIENTE, NOMBRE_MASCOTA, TIPO_MASCOTA, EDAD, SEXO, UTENTE_INSERCION)
VALUES
    ('76355454', 'Rex', 'perro', 2, 'M', '71248074');
CALL sp_buqueda_cliente('721')
SELECT * FROM CLIENTES
SELECT * FROM TIPO_FUNCION
CALL sp_obtener_funciones_usuario(1)
CALL sp_obtener_info_usuario ('71248074')
 -- DROP PROCEDURE IF EXISTS sp_buqueda_cliente;
-- buscar clientes
DELIMITER //
CREATE PROCEDURE sp_buqueda_cliente(IN _dni VARCHAR(8))
BEGIN
    SELECT
        ID_CLIENTE AS id_cliente,
        IDENTIFICADOR_CLIENTE AS identificador,
        NOMBRES AS nombres,
        APELLIDOS AS apellidos,
        CELULAR AS celular,
        EMAIL AS email
    FROM CLIENTES
    WHERE IDENTIFICADOR_CLIENTE LIKE CONCAT('%', _dni, '%')
    LIMIT 10;
END//

DELIMITER ;
CALL sp_buqueda_cliente('7')
SELECT * FROM CLIENTES
DROP PROCEDURE IF EXISTS sp_insertar_cliente
-- SP para insertar clientes
DELIMITER //
CREATE PROCEDURE sp_insertar_cliente(
  IN _identificador_cliente VARCHAR(8),
  IN _nombres VARCHAR(200),
  IN _apellidos VARCHAR(200),
  IN _celular VARCHAR(15),
  IN _email VARCHAR(200),
  IN _utente_inserimento VARCHAR(8)
)
BEGIN
  INSERT INTO CLIENTES (
    IDENTIFICADOR_CLIENTE,
    NOMBRES,
    APELLIDOS,
    CELULAR,
    EMAIL,
    UTENTE_INSERCION
  ) VALUES (
    _identificador_cliente,
    _nombres,
    _apellidos,
    _celular,
    _email,
    _utente_inserimento
  );
END//
DELIMITER ;

CALL sp_insertar_cliente('72177785', 'John', 'Doe', '1234567890', 'john@example.com', '71248074');

-- SP PARA MODIFICAR CLIENTE
DELIMITER //
CREATE PROCEDURE sp_modificar_cliente(
    IN _id_cliente INT,
    IN _identificador_cliente VARCHAR(8),
    IN _nombres VARCHAR(200),
    IN _apellidos VARCHAR(200),
    IN _celular VARCHAR(15),
    IN _email VARCHAR(200)
)
BEGIN
    UPDATE CLIENTES
    SET
        IDENTIFICADOR_CLIENTE = _identificador_cliente,
        NOMBRES = _nombres,
        APELLIDOS = _apellidos,
        CELULAR = _celular,
        EMAIL = _email
    WHERE ID_CLIENTE = _id_cliente;
END//
DELIMITER ;

-- SP PARA ELIMINAR CLIENTES

DELIMITER //
CREATE PROCEDURE sp_eliminar_cliente(
    IN _identificador_cliente VARCHAR(8)
)
BEGIN
    -- Primero eliminamos las mascotas del cliente
    DELETE FROM MASCOTAS WHERE IDENTIFICADOR_CLIENTE = CONCAT(_identificador_cliente);
    
    -- Luego eliminamos al cliente
    DELETE FROM CLIENTES WHERE IDENTIFICADOR_CLIENTE = CONCAT(_identificador_cliente);
END//
DELIMITER ;
SELECT * FROM CLIENTES;

DELETE FROM CLIENTES
WHERE CELULAR = '3425765783'