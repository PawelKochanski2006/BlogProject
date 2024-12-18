-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 01:11 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(1, 'Technology', '2024-12-09 23:37:26'),
(2, 'Lifestyle', '2024-12-09 23:37:26'),
(8, 'Health', '2024-12-10 23:46:13');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_comment_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `parent_comment_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 2, NULL, 'Great insights about AI!', '2024-12-10 23:52:08', '2024-12-10 23:55:26'),
(2, 1, 2, NULL, 'Great insights about AI!', '2024-12-10 23:52:21', '2024-12-10 23:55:31'),
(3, 2, 2, NULL, 'This is very helpful for my lifestyle changes.', '2024-12-10 23:53:57', '2024-12-10 23:55:35'),
(28, 1, 1, 1, 'Thank you! Glad you found it helpful.', '2024-12-10 23:55:37', '2024-12-10 23:55:37'),
(29, 1, 2, 1, 'I agree, AI is the future.', '2024-12-10 23:55:37', '2024-12-10 23:55:37'),
(33, 1, 1, 1, 'Thank you! Glad you found it helpful.', '2024-12-10 23:58:45', '2024-12-10 23:58:45'),
(34, 1, 2, 2, 'I agree, AI is the future.', '2024-12-10 23:58:45', '2024-12-10 23:58:45'),
(35, 2, 2, 3, 'I am happy it helped you!', '2024-12-10 23:58:45', '2024-12-10 23:58:45'),
(36, 1, 5, NULL, 'Test :)', '2024-12-15 20:38:16', '2024-12-15 20:38:16'),
(37, 1, 1, NULL, 'Test odpoweidzi na odpowiedz', '2024-12-15 22:42:49', '2024-12-15 22:42:49'),
(38, 2, 5, 35, 'Siema \n', '2024-12-15 22:46:19', '2024-12-15 23:18:05'),
(39, 2, 5, 35, 'No cześć \n', '2024-12-15 22:46:28', '2024-12-15 23:18:22'),
(40, 2, 1, NULL, 'Test odpowiedz', '2024-12-15 22:52:08', '2024-12-15 22:52:08'),
(41, 2, 1, NULL, 'dalczego\n', '2024-12-15 22:53:11', '2024-12-15 22:53:11'),
(42, 2, 1, NULL, 'dsa', '2024-12-15 22:58:21', '2024-12-15 22:58:21'),
(43, 2, 1, NULL, 'asds', '2024-12-15 22:58:31', '2024-12-15 22:58:31'),
(44, 2, 1, NULL, 'test nwm który', '2024-12-15 23:03:15', '2024-12-15 23:03:15'),
(45, 2, 1, NULL, 'aaaaaaaaaaaa', '2024-12-15 23:04:39', '2024-12-15 23:04:39'),
(46, 4, 1, NULL, 'Test', '2024-12-15 23:06:24', '2024-12-15 23:06:24'),
(47, 4, 1, NULL, 'sadasd', '2024-12-15 23:07:45', '2024-12-15 23:07:45'),
(48, 4, 4, NULL, 'dsfsAF', '2024-12-15 23:13:15', '2024-12-15 23:13:15'),
(49, 6, 3, NULL, 'Coś tam dla testu sobie pisze', '2024-12-15 23:17:06', '2024-12-15 23:17:06'),
(50, 2, 3, NULL, 'Coś tam dla testu sobie pisze kolejny raz', '2024-12-15 23:22:54', '2024-12-15 23:22:54'),
(51, 2, 4, NULL, 'Coś tam dla testu sobie pisze kolejny raz', '2024-12-15 23:25:30', '2024-12-15 23:25:30'),
(52, 2, 4, 35, 'Coś tam dla testu sobie pisze kolejny raz', '2024-12-15 23:30:30', '2024-12-15 23:30:30'),
(53, 4, 1, 48, 'Działa?', '2024-12-15 23:32:25', '2024-12-15 23:32:25'),
(54, 4, 1, 53, 'a czy działa odpowiedz na odpowiedz?', '2024-12-15 23:32:47', '2024-12-15 23:32:47'),
(55, 4, 1, 54, 'WOW DZIAŁA', '2024-12-15 23:33:04', '2024-12-15 23:33:04');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `user_id`, `image_url`, `alt_text`, `category_id`, `created_at`) VALUES
(6, 1, 'https://placehold.co/300x300', 'Beautiful Landscape', 1, '2024-12-11 00:02:39'),
(7, 1, 'https://placehold.co/300x300', 'Tech Innovations', 2, '2024-12-11 00:02:39'),
(8, 1, 'https://placehold.co/300x300', 'Healthy Living Tips', 3, '2024-12-11 00:02:39'),
(9, 1, 'https://placehold.co/300x300', 'AI in Action', 2, '2024-12-11 00:02:39'),
(10, 1, 'https://placehold.co/300x300', 'Lifestyle Choice', 3, '2024-12-11 00:02:39');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gallery_categories`
--

CREATE TABLE `gallery_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_categories`
--

INSERT INTO `gallery_categories` (`id`, `name`, `created_at`) VALUES
(1, 'Nature', '2024-12-09 23:37:26'),
(2, 'Architecture', '2024-12-09 23:37:26'),
(3, 'Technology', '2024-12-11 00:01:52'),
(4, 'Lifestyle', '2024-12-11 00:01:52');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `read_time` varchar(20) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `likes_count` int(11) DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `date`, `title`, `description`, `read_time`, `views`, `likes_count`, `image_url`, `alt_text`, `category_id`, `created_by`, `created_at`) VALUES
(1, '2023-12-01', 'Exploring AI', 'A deep dive into AI and its future applications.', '5 min read', 241, 3, 'https://placehold.co/300x200', 'AI Image', 1, 1, '2024-12-10 23:46:13'),
(2, '2023-12-02', 'Healthy Living Tips', 'Tips for a healthy and balanced lifestyle.', '3 min read', 136, 1, 'https://placehold.co/300x200', 'Lifestyle Image', 2, 2, '2024-12-10 23:46:13'),
(3, '2023-12-03', 'The Future of Technology', 'How technology will shape our lives in 2030.', '7 min read', 210, 3, 'https://placehold.co/300x200', 'Future Tech Image', 1, 1, '2024-12-10 23:46:13'),
(4, '2023-12-01', 'Exploring AI', 'A deep dive into AI and its future applications.', '5 min read', 238, 2, 'https://placehold.co/300x200', 'AI Image', 1, 1, '2024-12-10 23:46:38'),
(5, '2023-12-02', 'Healthy Living Tips', 'Tips for a healthy and balanced lifestyle.', '3 min read', 133, 2, 'https://placehold.co/300x200', 'Lifestyle Image', 2, 2, '2024-12-10 23:46:38'),
(6, '2023-12-03', 'The Future of Technology', 'How technology will shape our lives in 2030.', '7 min read', 239, 2, 'https://placehold.co/300x200', 'Future Tech Image', 1, 1, '2024-12-10 23:46:38');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post_images`
--

CREATE TABLE `post_images` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_images`
--

INSERT INTO `post_images` (`id`, `post_id`, `image_url`, `alt_text`, `created_at`) VALUES
(1, 1, 'https://placehold.co/400x300', 'AI and Machine Learning', '2024-12-10 23:47:52'),
(2, 1, 'https://placehold.co/500x400', 'Future of AI', '2024-12-10 23:47:52'),
(3, 2, 'https://placehold.co/400x300', 'Healthy Eating', '2024-12-10 23:47:52'),
(4, 3, 'https://placehold.co/400x300', 'Tech Innovations', '2024-12-10 23:47:52'),
(5, 3, 'https://placehold.co/500x400', '2030 Tech Trends', '2024-12-10 23:47:52');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(55, 1, 2, '2024-12-11 00:01:16'),
(57, 3, 2, '2024-12-11 00:01:16'),
(60, 5, 1, '2024-12-16 20:07:05'),
(61, 6, 1, '2024-12-16 20:07:08'),
(62, 3, 1, '2024-12-16 20:07:12'),
(63, 2, 1, '2024-12-16 20:07:16'),
(65, 1, 1, '2024-12-16 20:07:20'),
(66, 4, 1, '2024-12-16 20:16:53'),
(67, 5, 5, '2024-12-16 20:18:57'),
(69, 1, 5, '2024-12-16 20:19:20'),
(70, 4, 5, '2024-12-16 20:19:25'),
(73, 3, 5, '2024-12-16 20:19:38'),
(74, 6, 5, '2024-12-16 20:19:41');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post_tags`
--

CREATE TABLE `post_tags` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'admin', 'Pełny dostęp do wszystkich zasobów systemu.', '2024-12-09 23:37:26'),
(2, 'user', 'Zwykły użytkownik z ograniczonymi uprawnieniami.', '2024-12-09 23:37:26');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`) VALUES
(1, 'AI', '2024-12-09 23:37:26'),
(2, 'Programming', '2024-12-09 23:37:26'),
(3, 'Cloud Computing', '2024-12-09 23:37:26'),
(8, 'Technology', '2024-12-10 23:46:38'),
(9, 'Health', '2024-12-10 23:46:38'),
(10, 'Lifestyle', '2024-12-10 23:46:38');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role_id`, `created_at`) VALUES
(1, 'admin', 'admin@exapmle.com', '$2a$10$g8czUIt42L.7phlPe5/Qd.WpejZshiSIzCHkpIkr66K6WgFagoGki', 1, '2024-12-09 23:52:02'),
(2, 'Ala', 'ala@exapmle.com', '$2a$10$d/x8nXj6zYApD2P5zC5gY.AG7G91DwdTLuTUwisfNpz8afnv6sAp6', 2, '2024-12-09 23:53:19'),
(3, 'Marek', 'marek@example.com', '$2a$10$6PegqiFqyUl6jCNTR46tPOkxnLgvphcr2osGHB7LfygyJBUr8yZDi', 2, '2024-12-15 00:22:02'),
(4, 'Celina', 'celina@exapmle.com', '$2a$10$FZQVDH.4vruppmpDORqHq.c0jCw1ZoBCa/43eEgnn/Xvo6dx/0kH2', 2, '2024-12-15 00:47:10'),
(5, 'Test', 'test@example.com', '$2a$10$j9K64vfwkuVS9AJPsZuKRu4OSFtttismVR7aLmBEeI1OvhFHu726K', 2, '2024-12-15 01:25:10');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`);

--
-- Indeksy dla tabeli `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indeksy dla tabeli `gallery_categories`
--
ALTER TABLE `gallery_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indeksy dla tabeli `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indeksy dla tabeli `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gallery_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `gallery_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_images`
--
ALTER TABLE `post_images`
  ADD CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
