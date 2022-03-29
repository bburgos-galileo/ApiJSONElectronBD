CREATE DATABASE `consulta` ;

CREATE TABLE `resultado` (
  `id` varchar(200) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `fecha_creacion` varchar(100) DEFAULT NULL,
  `fecha_consulta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(45) DEFAULT NULL,
  `filtro` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;