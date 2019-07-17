CREATE DATABASE
IF NOT EXISTS Events;
use Events;

CREATE TABLE
IF NOT EXISTS events
(
id INT(10) unsigned NOT NULL AUTO_INCREMENT,
name VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
location VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
date DATE NOT NULL,
capacity INT(10) unsigned NOT NULL,
audence VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
description VARCHAR(300) COLLATE utf8_unicode_ci NOT NULL,
tipo VARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
PRIMARY KEY(id),
INDEX(id),
INDEX(tipo),
INDEX(location)
)ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;
DESCRIBE events;

CREATE TABLE
IF NOT EXISTS reservations
(

id INT(10) unsigned NOT NULL AUTO_INCREMENT,
quantity INT(10) unsigned NOT NULL,
id_user INT(10) unsigned NOT NULL,
id_event INT(10) unsigned NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(id_event) REFERENCES events(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB
DEFAULT CHARACTER SET = utf8;

DESCRIBE reservations;

ALTER USER 'mysql'@'%' IDENTIFIED
WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

INSERT INTO events
    (name, location, date, capacity, audence, description, tipo)
VALUES
    ('Carrera de Obstaculos', 'Plaza central', '2019-07-03 12:00:00', 500, 'Para toda la familia', 'Carrera de obstaculos donde probaras tu destreza junto a tu familia y amigos.', 'Diversión'),
    ('Casino de media noche', 'Casino Royale', '2019-07-02 22:00:00', 200, 'Adultos', 'Casino Royale te invita a probar tu suerte, la noche de hoy tendremos bonificación del 200% para apoyar multiples fundaciones.', 'Beneficencia'),
    ('Yoga para toda la familia', 'Gimnasio', '2019-07-03 08:00:00', 1500, 'Para toda la familia', 'Disfruta de un momento de relajación, de un momento de encuentro con tu yo interior junto a tus seres queridos.', 'Relajación'),
    ('Curso de Natacion', 'Piscina principal', '2019-07-04 10:30:00', 350, 'Para toda la familia', 'Si aun no sabes nadar o quieres mejorar tu técnica, esta es la oportunidad perfecta para hacerlo, te esperamos!.', 'Acondicionamiento'),
    ('Fiesta de Bienvenida', 'Plazoleta principal', '2019-07-01 15:00:00', 3000, 'Para toda la familia', 'Todos los pasajeros estan cordialmente invitados a la Fiesta de Bienvenida donde les tenemos preparado una sopresa que jamás olvidarás.', 'Diversión'),
    ('Tarde de cometas', 'Terraza', '2019-07-05 14:00:00', 1500, 'Niños', 'Acercate a la terraza del crucero, donde estaremos volando cometas para adornar el cielo.', 'Diversión'),
    ('Crossfit para principiante', 'Gimnasio', '2019-07-04 08:00:00', 810, 'Para toda la familia', '¿Preparado para tener un cuerpo de atleta olimpíco? La decisión es tuya, te esperamos.', 'Acondicionamiento'),
    ('Noche de peliculas de terror', 'Teatro', '2019-07-05 19:00:00', 1600, 'Adultos', '¡Preparate!, esta noche no podrás dormir del miedo  con nuestra mejor selección de películas de terror.', 'Entretenimiento'),
    ('Spa romantico', 'Spa segundo piso', '2019-07-06 20:00:00', 400, 'Adultos', 'Ven con tu pareja y experimenten una noche llena de romanticismo y mucha pasión, mientras recibes la mejor atención en nuestroe spa 5 estrellas.', 'Relajación'),
    ('Opera 5ta sinfonia de Bethoven', 'Teatro', '2019-07-07 16:00:00', 2000, 'Para toda la familia', 'Para nuestra despedida hemos preparado una opera con qu reune las más selectas obras del maestro Bethoven, interpretado por nuestro coro especial junto con la orquesta sinfoníca de París.', 'Entretenimiento');
INSERT INTO reservations
    (quantity, id_user, id_event)
VALUES
    (5, 1, 1),
    (3, 2, 2),
    (4, 3, 3),
    (2, 4, 4),
    (1, 5, 5),
    (3, 6, 6),
    (4, 7, 7),
    (2, 8, 8),
    (2, 9, 9),
    (5, 10, 10),
    (4, 1, 10),
    (2, 2, 9),
    (3, 3, 8),
    (1, 4, 7),
    (2, 5, 6),
    (3, 6, 5),
    (5, 7, 4),
    (4, 8, 3),
    (2, 9, 2),
    (5, 10, 10);