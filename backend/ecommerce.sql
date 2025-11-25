-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         12.0.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ecommerce
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `ecommerce`;

-- Volcando estructura para tabla ecommerce.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `unique_user_product` (`user_id`,`product_id`),
  KEY `FK_cart_products` (`product_id`),
  CONSTRAINT `FK_cart_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cart_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.cart: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `article_amount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.categories: ~9 rows (aproximadamente)
INSERT INTO `categories` (`id`, `name`, `description`, `article_amount`) VALUES
	(101, 'Autos', 'Los mejores precios en autos 0 kilómetro, de alta y media gama.', 5),
	(102, 'Juguetes', 'Encuentra aquí los mejores precios para niños/as de cualquier edad.', 4),
	(103, 'Muebles', 'Muebles antiguos, nuevos y para ser armados por uno mismo.', 4),
	(104, 'Herramientas', 'Herramientas para cualquier tipo de trabajo.', 0),
	(105, 'Computadoras', 'Todo en cuanto a computadoras, para uso de oficina y/o juegos.', 1),
	(106, 'Vestimenta', 'Gran variedad de ropa, nueva y de segunda mano.', 0),
	(107, 'Electrodomésticos', 'Todos los electrodomésticos modernos y de bajo consumo.', 0),
	(108, 'Deporte', 'Toda la variedad de indumentaria para todo tipo de deporte.', 0),
	(109, 'Celulares', 'Celulares de todo tipo para cubrir todas las necesidades.', 0);

-- Volcando estructura para tabla ecommerce.categories_images
CREATE TABLE IF NOT EXISTS `categories_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.categories_images: ~9 rows (aproximadamente)
INSERT INTO `categories_images` (`id`, `category_id`, `image_url`) VALUES
	(1, 101, 'img/cat101_1.jpg'),
	(2, 102, 'img/cat102_1.jpg'),
	(3, 103, 'img/cat103_1.jpg'),
	(4, 104, 'img/cat104_1.jpg'),
	(5, 105, 'img/cat105_1.jpg'),
	(6, 106, 'img/cat106_1.jpg'),
	(7, 107, 'img/cat107_1.jpg'),
	(8, 108, 'img/cat108_1.jpg'),
	(9, 109, 'img/cat109_1.jpg');

-- Volcando estructura para tabla ecommerce.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `sold_count` int(11) DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_categoryid` (`category_id`),
  CONSTRAINT `fk_categoryid` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.products: ~14 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `description`, `cost`, `currency`, `sold_count`, `category_id`) VALUES
	(40281, 'Computadora de escritorio', 'Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo', 2599.00, 'USD', 11, 105),
	(50741, 'Oso de peluche', 'Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán', 2400.00, 'UYU', 97, 102),
	(50742, 'Pelota de básquetbol', 'Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA', 2999.00, 'UYU', 11, 102),
	(50743, 'PlayStation 5', 'Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.', 59999.00, 'UYU', 16, 102),
	(50744, 'Bicicleta', '¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.', 10999.00, 'UYU', 8, 102),
	(50921, 'Chevrolet Onix Joy', 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.', 13500.00, 'USD', 14, 101),
	(50922, 'Fiat Way', 'La versión de Fiat que brinda confort y a un precio accesible.', 14500.00, 'USD', 52, 101),
	(50923, 'Suzuki Celerio', 'Un auto que se ha ganado la buena fama por su economía con el combustible.', 12500.00, 'USD', 25, 101),
	(50924, 'Peugeot 208', 'El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.', 15200.00, 'USD', 17, 101),
	(50925, 'Bugatti Chiron', 'El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.', 3500000.00, 'USD', 0, 101),
	(60801, 'Juego de comedor', 'Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino', 4000.00, 'UYU', 88, 103),
	(60802, 'Sofá', 'Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas', 24000.00, 'UYU', 12, 103),
	(60803, 'Armario', 'Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa', 8000.00, 'UYU', 24, 103),
	(60804, 'Mesa de centro', 'Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.', 10000.00, 'UYU', 37, 103);

-- Volcando estructura para tabla ecommerce.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.product_images: ~56 rows (aproximadamente)
INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
	(113, 40281, 'img/prod40281_1.jpg'),
	(114, 40281, 'img/prod40281_2.jpg'),
	(115, 40281, 'img/prod40281_3.jpg'),
	(116, 40281, 'img/prod40281_4.jpg'),
	(117, 50741, 'img/prod50741_1.jpg'),
	(118, 50741, 'img/prod50741_2.jpg'),
	(119, 50741, 'img/prod50741_3.jpg'),
	(120, 50741, 'img/prod50741_4.jpg'),
	(121, 50742, 'img/prod50742_1.jpg'),
	(122, 50742, 'img/prod50742_2.jpg'),
	(123, 50742, 'img/prod50742_3.jpg'),
	(124, 50742, 'img/prod50742_4.jpg'),
	(125, 50743, 'img/prod50743_1.jpg'),
	(126, 50743, 'img/prod50743_2.jpg'),
	(127, 50743, 'img/prod50743_3.jpg'),
	(128, 50743, 'img/prod50743_4.jpg'),
	(129, 50744, 'img/prod50744_1.jpg'),
	(130, 50744, 'img/prod50744_2.jpg'),
	(131, 50744, 'img/prod50744_3.jpg'),
	(132, 50744, 'img/prod50744_4.jpg'),
	(133, 50921, 'img/prod50921_1.jpg'),
	(134, 50921, 'img/prod50921_2.jpg'),
	(135, 50921, 'img/prod50921_3.jpg'),
	(136, 50921, 'img/prod50921_4.jpg'),
	(137, 50922, 'img/prod50922_1.jpg'),
	(138, 50922, 'img/prod50922_2.jpg'),
	(139, 50922, 'img/prod50922_3.jpg'),
	(140, 50922, 'img/prod50922_4.jpg'),
	(141, 50923, 'img/prod50923_1.jpg'),
	(142, 50923, 'img/prod50923_2.jpg'),
	(143, 50923, 'img/prod50923_3.jpg'),
	(144, 50923, 'img/prod50923_4.jpg'),
	(145, 50924, 'img/prod50924_1.jpg'),
	(146, 50924, 'img/prod50924_2.jpg'),
	(147, 50924, 'img/prod50924_3.jpg'),
	(148, 50924, 'img/prod50924_4.jpg'),
	(149, 50925, 'img/prod50925_1.jpg'),
	(150, 50925, 'img/prod50925_2.jpg'),
	(151, 50925, 'img/prod50925_3.jpg'),
	(152, 50925, 'img/prod50925_4.jpg'),
	(153, 60801, 'img/prod60801_1.jpg'),
	(154, 60801, 'img/prod60801_2.jpg'),
	(155, 60801, 'img/prod60801_3.jpg'),
	(156, 60801, 'img/prod60801_4.jpg'),
	(157, 60802, 'img/prod60802_1.jpg'),
	(158, 60802, 'img/prod60802_2.jpg'),
	(159, 60802, 'img/prod60802_3.jpg'),
	(160, 60802, 'img/prod60802_4.jpg'),
	(161, 60803, 'img/prod60803_1.jpg'),
	(162, 60803, 'img/prod60803_2.jpg'),
	(163, 60803, 'img/prod60803_3.jpg'),
	(164, 60803, 'img/prod60803_4.jpg'),
	(165, 60804, 'img/prod60804_1.jpg'),
	(166, 60804, 'img/prod60804_2.jpg'),
	(167, 60804, 'img/prod60804_3.jpg'),
	(168, 60804, 'img/prod60804_4.jpg');

-- Volcando estructura para tabla ecommerce.related_products
CREATE TABLE IF NOT EXISTS `related_products` (
  `product_id` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`related_id`),
  KEY `related_id` (`related_id`),
  CONSTRAINT `related_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `related_products_ibfk_2` FOREIGN KEY (`related_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.related_products: ~28 rows (aproximadamente)
INSERT INTO `related_products` (`product_id`, `related_id`) VALUES
	(40281, 50743),
	(40281, 50744),
	(50741, 50742),
	(50741, 50744),
	(50742, 50741),
	(50742, 50743),
	(50743, 50742),
	(50743, 50744),
	(50744, 50741),
	(50744, 50743),
	(50921, 50922),
	(50921, 50924),
	(50922, 50921),
	(50922, 50923),
	(50923, 50922),
	(50923, 50924),
	(50924, 50921),
	(50924, 50923),
	(50925, 50921),
	(50925, 50924),
	(60801, 60802),
	(60801, 60804),
	(60802, 60801),
	(60802, 60803),
	(60803, 60802),
	(60803, 60804),
	(60804, 60801),
	(60804, 60803);

-- Volcando estructura para tabla ecommerce.scores
CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 0,
  `comment` text NOT NULL DEFAULT 'Sin comentario.',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_product_id` (`product_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.scores: ~31 rows (aproximadamente)
INSERT INTO `scores` (`id`, `username`, `product_id`, `rating`, `comment`, `timestamp`) VALUES
	(1, 'silvia_fagundez', 50741, 5, 'Precioso, a mi nena le encantó', '2021-02-20 17:00:42'),
	(2, 'majo_sanchez', 50741, 4, 'Esperaba que fuera más grande, pero es muy lindo.', '2021-01-11 19:26:10'),
	(3, 'raul_añez', 50741, 5, 'Hermoso el oso. Quedamos encantados, lo recomiendo.', '2020-12-16 22:55:19'),
	(4, 'flynn_rider', 50741, 1, 'Se lo regalé a mi novia para que me perdone, pero no funcionó', '2020-02-15 02:19:09'),
	(5, 'karen_gonzalez', 50742, 5, 'Perfecta. La que me recomendó el entrenador', '2022-05-22 02:10:41'),
	(6, 'luis_salgueiro', 50742, 4, 'Es lo que esperaba. Ahora a entrenar mucho!', '2021-10-30 09:33:53'),
	(7, 'carlos_diaz', 50742, 5, 'Muy buena calidad.', '2020-11-02 12:28:45'),
	(8, 'scottie_pippen', 50742, 5, 'Excelente. Para rememorar viejos tiempos y volver a sentirse un campeón.', '2019-11-10 00:15:29'),
	(9, 'saul_dominguez', 50743, 5, 'Un lujo. Se la compré a mis hijos, pero creo que me la quedo yo.', '2022-04-18 16:20:56'),
	(10, 'lucia_ralek', 50743, 5, 'Increibles los gráficos que tiene.', '2022-04-05 14:20:09'),
	(11, 'mateo_diestre', 50743, 5, 'IM PRE SIO NAN TE.', '2022-03-22 01:38:39'),
	(12, 'ralph_baer', 50743, 5, 'Me cuesta creer lo que han avanzado las consolas', '2022-01-04 14:16:48'),
	(13, 'ignacio_paremon', 50744, 5, 'Compra de último momento para la navidad. A mi nieto le gustó.', '2021-12-25 02:59:59'),
	(14, 'mia_barboza', 50744, 2, 'Les pedí azul y me mandaron verde. La bicicleta es buena', '2021-09-15 04:27:19'),
	(15, 'julian_surech', 50744, 3, 'Es buena, pero le faltaron las rueditas.', '2021-03-24 23:11:19'),
	(16, 'mariana_pajon', 50744, 4, 'Perfecta para que mis hijos vayan empezando a practicar.', '2021-01-18 08:22:50'),
	(17, 'juan_pedro', 50921, 3, 'Ya llevo un año con este auto y la verdad que tiene sus ventajas y desventajas', '2020-02-25 21:03:52'),
	(18, 'maria_sanchez', 50921, 5, 'Es un auto muy cómodo y en relación precio/calidad vale la pena!', '2020-01-17 16:42:18'),
	(19, 'paola_perez', 50921, 4, 'Casi todo bien!, excepto por algún detalle de gusto personal', '2020-03-14 12:05:13'),
	(20, 'gustavo_trelles', 50921, 5, 'Un espectáculo el auto!', '2020-02-21 18:05:22'),
	(21, 'ema_perez', 50922, 3, 'Es un buen auto, pero el precio me pareció algo elevado', '2022-04-05 18:29:40'),
	(22, 'javier_santoalla', 50922, 5, 'Muy buen auto, vale cada centavo', '2021-11-15 22:32:10'),
	(23, 'gonza_rodriguez', 50922, 5, 'Me gusta como se comporta en tierra y pista', '2020-02-21 18:05:22'),
	(24, 'alfredo_bioy', 50923, 5, 'Gran opción. Bueno, bonito y barato', '2022-02-15 23:19:20'),
	(25, 'pablo_cibeles', 50923, 4, 'No había el color que yo quería, pero lo demás está perfecto.', '2021-05-24 22:25:43'),
	(26, 'santiago_urrutia', 50923, 5, 'Lo que busco cuando no compito', '2020-12-03 17:15:33'),
	(27, 'maite_caceres', 50924, 5, 'Espectacular. Sport con potencia y confort.', '2022-06-24 23:19:20'),
	(28, 'jaime_gil', 60801, 3, 'Es algo chico, pero está bien para una familia pequeña.', '2021-12-02 14:23:32'),
	(29, 'ximena_fagundez', 60802, 4, 'Muy cómodo. Ideal para las siestas', '2022-03-29 12:15:01'),
	(30, 'marcelo_sosa', 60802, 5, 'Lo compré para ver los partidos con mis amigos. Valió la pena.', '2021-08-10 01:05:12'),
	(31, 'bruno_diaz', 60803, 5, 'Es grande. Entra más de lo que parece', '2022-11-21 06:33:41');

-- Volcando estructura para tabla ecommerce.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `lastname`, `username`, `email`, `phone`, `profile_img`) VALUES
	(1, 'Facundo', 'Magnin', 'facu', 'facu@example.com', '099000000', '../img/user-icon/user.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
