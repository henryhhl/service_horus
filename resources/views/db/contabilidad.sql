
CREATE DATABASE contabilidad;
USE contabilidad;

CREATE TABLE tipotransaccion (
    idtipotransaccion INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idtipotransaccion )
);

CREATE TABLE tipopago (
    idtipopago INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idtipopago )
);

CREATE TABLE comprobantetipo (
    idcomprobantetipo INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcomprobantetipo )
);

CREATE TABLE cuentaplantipo (
    idcuentaplantipo INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcuentaplantipo )
);

CREATE TABLE centrocostotipo (
    idcentrocostotipo INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcentrocostotipo )
);

CREATE TABLE centrocosto (
    idcentrocosto INT IDENTITY(1, 1) NOT NULL,
    fkidcentrocostotipo INT NOT NULL,
    codigo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcentrocosto ),
    FOREIGN KEY ( fkidcentrocostotipo ) REFERENCES centrocostotipo( idcentrocostotipo )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE moneda (
    idmoneda INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    breve TEXT NOT NULL,
    predeterminado CHAR (1) NOT NULL DEFAULT 'N',
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idmoneda )
);

CREATE TABLE tipocambio (
    idtipocambio INT IDENTITY(1, 1) NOT NULL,
    fkidmonedabase INT NOT NULL,
    fkidmonedacambio INT NOT NULL,
    valor DECIMAL(24, 8) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idtipocambio ),
    FOREIGN KEY ( fkidmonedabase ) REFERENCES moneda ( idmoneda ),
    FOREIGN KEY ( fkidmonedacambio ) REFERENCES moneda ( idmoneda )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE banco (
    idbanco INT IDENTITY(1, 1) NOT NULL,
    nombre TEXT NOT NULL,
    nrocuenta TEXT NOT NULL,
    MONTO DECIMAL( 24, 8 ) NOT NULL,
    tc DECIMAL( 24, 8 ) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idbanco )
);

CREATE TABLE usuario (
    idusuario INT IDENTITY(1, 1) NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    foto TEXT NULL,
    fechanacimiento DATE NULL,
    genero CHAR (1) NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idusuario )
);

CREATE TABLE empresa (
    idempresa INT IDENTITY(1, 1) NOT NULL,
    fkidusuario INT NOT NULL,
    razonsocial TEXT NOT NULL,
    nit TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefonocelular TEXT NOT NULL,
    lugar TEXT NOT NULL,
    actividad TEXT NOT NULL,
    ci TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idempresa ),
    FOREIGN KEY ( fkidusuario ) REFERENCES usuario( idusuario )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE gestioncontable (
    idgestioncontable INT IDENTITY(1, 1) NOT NULL,
    descripcion TEXT NOT NULL,
    fechainicio DATE NOT NULL,
    fechafinal DATE NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idgestioncontable )
);

CREATE TABLE periodocontable (
    idperiodocontable INT IDENTITY(1, 1) NOT NULL,
    fkidgestioncontable INT NOT NULL,
    descripcion TEXT NOT NULL,
    fechainicio DATE NOT NULL,
    fechafinal DATE NOT NULL,
    horainicio TIME NOT NULL,
    horafinal TIME NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idperiodocontable ),
    FOREIGN KEY ( fkidgestioncontable ) REFERENCES gestioncontable( idgestioncontable )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE comprobante (
    idcomprobante INT IDENTITY(1, 1) NOT NULL,
    fkidtipotransaccion INT NOT NULL,
    fkidbanco INT NOT NULL,
    fkidmoneda INT NOT NULL,
    fkidtipopago INT NOT NULL,
    fkidcomprobantetipo INT NOT NULL,
    fkidusuario INT NOT NULL,
    fkidperiodocontable INT NOT NULL,
    codigo TEXT NOT NULL,
    referidoa TEXT NOT NULL,
    nrodocumento TEXT NOT NULL,
    glosa TEXT NOT NULL,
    fecha DATE NOT NULL,
    tc DECIMAL( 24, 8 ) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcomprobante ),
    FOREIGN KEY ( fkidtipotransaccion ) REFERENCES tipotransaccion( idtipotransaccion ),
    FOREIGN KEY ( fkidbanco ) REFERENCES banco( idbanco ),
    FOREIGN KEY ( fkidmoneda ) REFERENCES moneda( idmoneda ),
    FOREIGN KEY ( fkidtipopago ) REFERENCES tipopago( idtipopago ),
    FOREIGN KEY ( fkidcomprobantetipo ) REFERENCES comprobantetipo( idcomprobantetipo ),
    FOREIGN KEY ( fkidusuario ) REFERENCES usuario( idusuario ),
    FOREIGN KEY ( fkidperiodocontable ) REFERENCES periodocontable( idperiodocontable )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE cuentaplan (
    idcuentaplan INT IDENTITY(1, 1) NOT NULL,
    fkidcuentaplanpadre INT NOT NULL,
    codigo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcuentaplan )
);

CREATE TABLE comprobantecuentaplandetalle (
    idcomprobantecuentaplandetalle INT IDENTITY(1, 1) NOT NULL,
    fkidcuentaplan INT NOT NULL,
    fkidcomprobante INT NOT NULL,
    fkidcentrocosto INT NOT NULL,
    glosa TEXT NOT NULL,
    debe DECIMAL( 24, 8 ) NOT NULL,
    haber DECIMAL( 24, 8 ) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idcomprobantecuentaplandetalle ),
    FOREIGN KEY ( fkidcuentaplan ) REFERENCES cuentaplan( idcuentaplan ),
    FOREIGN KEY ( fkidcomprobante ) REFERENCES comprobante( idcomprobante ),
    FOREIGN KEY ( fkidcentrocosto ) REFERENCES centrocosto( idcentrocosto )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE balance (
    idbalance INT IDENTITY(1, 1) NOT NULL,
    fkidgestioncontable INT NOT NULL,
    codigo TEXT NOT NULL,
    tipo TEXT NOT NULL,
    fecha DATE NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idbalance ),
    FOREIGN KEY ( fkidgestioncontable ) REFERENCES gestioncontable( idgestioncontable )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE estadoresultado (
    idestadoresultado INT IDENTITY(1, 1) NOT NULL,
    fkidcuentaplan INT NOT NULL,
    codigoaccion TEXT NOT NULL,
    operacion TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    formula TEXT NOT NULL,
    valor DECIMAL( 24, 8 ) NOT NULL,
    estado CHAR(1) NOT NULL DEFAULT 'A',
    created_at DATETIME NULL,
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY ( idestadoresultado ),
    FOREIGN KEY ( fkidcuentaplan ) REFERENCES cuentaplan( idcuentaplan )
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
