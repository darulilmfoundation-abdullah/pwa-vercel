CREATE TABLE `institute_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `institute_name` varchar(100) NOT NULL,
  `status` enum('active','expired','suspended') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a demo code
INSERT INTO `institute_codes` (`code`, `institute_name`, `status`) VALUES
('DIF-2025', 'DIF Institute', 'active');
