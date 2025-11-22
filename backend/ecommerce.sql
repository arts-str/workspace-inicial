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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.cart: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `sold_count` int(11) DEFAULT 0,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.products: ~14 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `description`, `cost`, `currency`, `sold_count`, `category`) VALUES
	(40281, 'Computadora de escritorio', 'Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo', 2599.00, 'USD', 11, 'Computadoras'),
	(50741, 'Oso de peluche', 'Oso de peluche gigante, con el bebé. Resistente y lavable. Tus hijos los amarán', 2400.00, 'UYU', 97, 'Juguetes'),
	(50742, 'Pelota de básquetbol', 'Balón de baloncesto profesional, para interiores, tamaño 5, 27.5 pulgadas. Oficial de la NBA', 2999.00, 'UYU', 11, 'Juguetes'),
	(50743, 'PlayStation 5', 'Maravíllate con increíbles gráficos y disfruta de nuevas funciones de PS5. Con E/S integrada.', 59999.00, 'UYU', 16, 'Juguetes'),
	(50744, 'Bicicleta', '¡La mejor BMX pequeña del mercado! Frenos traseros y cuadro duradero de acero Hi-Ten.', 10999.00, 'UYU', 8, 'Juguetes'),
	(50921, 'Chevrolet Onix Joy', 'Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.', 13500.00, 'USD', 14, 'Autos'),
	(50922, 'Fiat Way', 'La versión de Fiat que brinda confort y a un precio accesible.', 14500.00, 'USD', 52, 'Autos'),
	(50923, 'Suzuki Celerio', 'Un auto que se ha ganado la buena fama por su economía con el combustible.', 12500.00, 'USD', 25, 'Autos'),
	(50924, 'Peugeot 208', 'El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.', 15200.00, 'USD', 17, 'Autos'),
	(50925, 'Bugatti Chiron', 'El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.', 3500000.00, 'USD', 0, 'Autos'),
	(60801, 'Juego de comedor', 'Un conjunto sencillo y sólido, ideal para zonas de comedor pequeñas, hecho en madera maciza de pino', 4000.00, 'UYU', 88, 'Muebles'),
	(60802, 'Sofá', 'Cómodo sofá de tres cuerpos, con chaiselongue intercambiable. Ideal para las siestas', 24000.00, 'UYU', 12, 'Muebles'),
	(60803, 'Armario', 'Diseño clásico con puertas con forma de panel. Espejo de cuerpo entero para ver cómo te queda la ropa', 8000.00, 'UYU', 24, 'Muebles'),
	(60804, 'Mesa de centro', 'Añade más funciones a tu sala de estar, ya que te permite cambiar fácilmente de actividad.', 10000.00, 'UYU', 37, 'Muebles');

-- Volcando estructura para tabla ecommerce.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce.product_images: ~56 rows (aproximadamente)
INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
	(57, 40281, 'img/prod40281_1.jpg'),
	(58, 40281, 'img/prod40281_2.jpg'),
	(59, 40281, 'img/prod40281_3.jpg'),
	(60, 40281, 'img/prod40281_4.jpg'),
	(61, 50741, 'img/prod50741_1.jpg'),
	(62, 50741, 'img/prod50741_2.jpg'),
	(63, 50741, 'img/prod50741_3.jpg'),
	(64, 50741, 'img/prod50741_4.jpg'),
	(65, 50742, 'img/prod50742_1.jpg'),
	(66, 50742, 'img/prod50742_2.jpg'),
	(67, 50742, 'img/prod50742_3.jpg'),
	(68, 50742, 'img/prod50742_4.jpg'),
	(69, 50743, 'img/prod50743_1.jpg'),
	(70, 50743, 'img/prod50743_2.jpg'),
	(71, 50743, 'img/prod50743_3.jpg'),
	(72, 50743, 'img/prod50743_4.jpg'),
	(73, 50744, 'img/prod50744_1.jpg'),
	(74, 50744, 'img/prod50744_2.jpg'),
	(75, 50744, 'img/prod50744_3.jpg'),
	(76, 50744, 'img/prod50744_4.jpg'),
	(77, 50921, 'img/prod50921_1.jpg'),
	(78, 50921, 'img/prod50921_2.jpg'),
	(79, 50921, 'img/prod50921_3.jpg'),
	(80, 50921, 'img/prod50921_4.jpg'),
	(81, 50922, 'img/prod50922_1.jpg'),
	(82, 50922, 'img/prod50922_2.jpg'),
	(83, 50922, 'img/prod50922_3.jpg'),
	(84, 50922, 'img/prod50922_4.jpg'),
	(85, 50923, 'img/prod50923_1.jpg'),
	(86, 50923, 'img/prod50923_2.jpg'),
	(87, 50923, 'img/prod50923_3.jpg'),
	(88, 50923, 'img/prod50923_4.jpg'),
	(89, 50924, 'img/prod50924_1.jpg'),
	(90, 50924, 'img/prod50924_2.jpg'),
	(91, 50924, 'img/prod50924_3.jpg'),
	(92, 50924, 'img/prod50924_4.jpg'),
	(93, 50925, 'img/prod50925_1.jpg'),
	(94, 50925, 'img/prod50925_2.jpg'),
	(95, 50925, 'img/prod50925_3.jpg'),
	(96, 50925, 'img/prod50925_4.jpg'),
	(97, 60801, 'img/prod60801_1.jpg'),
	(98, 60801, 'img/prod60801_2.jpg'),
	(99, 60801, 'img/prod60801_3.jpg'),
	(100, 60801, 'img/prod60801_4.jpg'),
	(101, 60802, 'img/prod60802_1.jpg'),
	(102, 60802, 'img/prod60802_2.jpg'),
	(103, 60802, 'img/prod60802_3.jpg'),
	(104, 60802, 'img/prod60802_4.jpg'),
	(105, 60803, 'img/prod60803_1.jpg'),
	(106, 60803, 'img/prod60803_2.jpg'),
	(107, 60803, 'img/prod60803_3.jpg'),
	(108, 60803, 'img/prod60803_4.jpg'),
	(109, 60804, 'img/prod60804_1.jpg'),
	(110, 60804, 'img/prod60804_2.jpg'),
	(111, 60804, 'img/prod60804_3.jpg'),
	(112, 60804, 'img/prod60804_4.jpg');

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
