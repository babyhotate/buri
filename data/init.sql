CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `display_name` (`display_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;