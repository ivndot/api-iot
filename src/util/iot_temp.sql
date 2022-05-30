DROP DATABASE IF EXISTS iot_temp;

CREATE DATABASE iot_temp;
USE iot_temp;

/*
     ==============================================================
     *                       CRATE TABLES                         *         
     ==============================================================
*/

CREATE TABLE led(
    id_led INT NOT NULL,
    name_led VARCHAR(10),
    status_led BOOLEAN, /* 1 -> ON 0 -> OFF*/

    PRIMARY KEY(id_led)
);

CREATE TABLE fan(
    id_fan INT NOT NULL,
    mode_fan CHAR(1), /* a -> auto m -> manual */
    status_fan BOOLEAN, /* 1 -> ON 0 -> OFF*/
    speed_fan CHAR(1), /* l -> slow f -> fast */

    PRIMARY KEY (id_fan)
);

CREATE TABLE sensor_temp(
    id_sensor INT NOT NULL,
    value_sensor DOUBLE,

    PRIMARY KEY (id_sensor)
);

/*
     ==============================================================
     *                       INSERT DATA                          *         
     ==============================================================
*/

INSERT INTO led VALUES (1, "green", 0);
INSERT INTO led VALUES (2, "yellow", 0);

INSERT INTO fan VALUES (1,"a", 0, "l");

INSERT INTO sensor_temp VALUES (1, 0);
