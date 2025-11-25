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
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.product_images: ~56 rows (aproximadamente)
INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
	(169, 40281, 'img/prod40281_1.jpg'),
	(170, 40281, 'img/prod40281_2.jpg'),
	(171, 40281, 'img/prod40281_3.jpg'),
	(172, 40281, 'img/prod40281_4.jpg'),
	(173, 50741, 'img/prod50741_1.jpg'),
	(174, 50741, 'img/prod50741_2.jpg'),
	(175, 50741, 'img/prod50741_3.jpg'),
	(176, 50741, 'img/prod50741_4.jpg'),
	(177, 50742, 'img/prod50742_1.jpg'),
	(178, 50742, 'img/prod50742_2.jpg'),
	(179, 50742, 'img/prod50742_3.jpg'),
	(180, 50742, 'img/prod50742_4.jpg'),
	(181, 50743, 'img/prod50743_1.jpg'),
	(182, 50743, 'img/prod50743_2.jpg'),
	(183, 50743, 'img/prod50743_3.jpg'),
	(184, 50743, 'img/prod50743_4.jpg'),
	(185, 50744, 'img/prod50744_1.jpg'),
	(186, 50744, 'img/prod50744_2.jpg'),
	(187, 50744, 'img/prod50744_3.jpg'),
	(188, 50744, 'img/prod50744_4.jpg'),
	(189, 50921, 'img/prod50921_1.jpg'),
	(190, 50921, 'img/prod50921_2.jpg'),
	(191, 50921, 'img/prod50921_3.jpg'),
	(192, 50921, 'img/prod50921_4.jpg'),
	(193, 50922, 'img/prod50922_1.jpg'),
	(194, 50922, 'img/prod50922_2.jpg'),
	(195, 50922, 'img/prod50922_3.jpg'),
	(196, 50922, 'img/prod50922_4.jpg'),
	(197, 50923, 'img/prod50923_1.jpg'),
	(198, 50923, 'img/prod50923_2.jpg'),
	(199, 50923, 'img/prod50923_3.jpg'),
	(200, 50923, 'img/prod50923_4.jpg'),
	(201, 50924, 'img/prod50924_1.jpg'),
	(202, 50924, 'img/prod50924_2.jpg'),
	(203, 50924, 'img/prod50924_3.jpg'),
	(204, 50924, 'img/prod50924_4.jpg'),
	(205, 50925, 'img/prod50925_1.jpg'),
	(206, 50925, 'img/prod50925_2.jpg'),
	(207, 50925, 'img/prod50925_3.jpg'),
	(208, 50925, 'img/prod50925_4.jpg'),
	(209, 60801, 'img/prod60801_1.jpg'),
	(210, 60801, 'img/prod60801_2.jpg'),
	(211, 60801, 'img/prod60801_3.jpg'),
	(212, 60801, 'img/prod60801_4.jpg'),
	(213, 60802, 'img/prod60802_1.jpg'),
	(214, 60802, 'img/prod60802_2.jpg'),
	(215, 60802, 'img/prod60802_3.jpg'),
	(216, 60802, 'img/prod60802_4.jpg'),
	(217, 60803, 'img/prod60803_1.jpg'),
	(218, 60803, 'img/prod60803_2.jpg'),
	(219, 60803, 'img/prod60803_3.jpg'),
	(220, 60803, 'img/prod60803_4.jpg'),
	(221, 60804, 'img/prod60804_1.jpg'),
	(222, 60804, 'img/prod60804_2.jpg'),
	(223, 60804, 'img/prod60804_3.jpg'),
	(224, 60804, 'img/prod60804_4.jpg');

-- Volcando estructura para tabla ecommerce.related_products
CREATE TABLE IF NOT EXISTS `related_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id_related_id` (`product_id`,`related_id`),
  KEY `related_id` (`related_id`),
  CONSTRAINT `related_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `related_products_ibfk_2` FOREIGN KEY (`related_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.related_products: ~28 rows (aproximadamente)
INSERT INTO `related_products` (`id`, `product_id`, `related_id`) VALUES
	(1, 40281, 50743),
	(2, 40281, 50744),
	(3, 50741, 50742),
	(4, 50741, 50744),
	(5, 50742, 50741),
	(6, 50742, 50743),
	(7, 50743, 50742),
	(8, 50743, 50744),
	(9, 50744, 50741),
	(10, 50744, 50743),
	(11, 50921, 50924),
	(12, 50921, 50922),
	(13, 50922, 50921),
	(14, 50922, 50923),
	(15, 50923, 50924),
	(16, 50923, 50922),
	(17, 50924, 50921),
	(18, 50924, 50923),
	(19, 50925, 50924),
	(20, 50925, 50921),
	(21, 60801, 60802),
	(22, 60801, 60804),
	(23, 60802, 60801),
	(24, 60802, 60803),
	(25, 60803, 60802),
	(26, 60803, 60804),
	(27, 60804, 60801),
	(28, 60804, 60803);

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

-- Volcando datos para la tabla ecommerce.scores: ~0 rows (aproximadamente)

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

-- Volcando datos para la tabla ecommerce.users: ~0 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `lastname`, `username`, `email`, `phone`, `profile_img`) VALUES
	(1, 'Facundo', 'Magnin', 'facu', 'facu@example.com', '099000000', '../img/user-icon/user.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
