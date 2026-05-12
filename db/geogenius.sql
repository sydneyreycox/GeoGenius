CREATE DATABASE IF NOT EXISTS geogenius_db;
USE geogenius_db;

-- Table: city
CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lat DECIMAL(10,8) NOT NULL,
    lng DECIMAL(11,8) NOT NULL,
    cityImage VARCHAR(255)
);

-- Data: city
INSERT INTO city (id, name, lat, lng) VALUES
(1, 'Washington D.C', 38.89425000, -77.03965000),
(2, 'San Antonio', 29.42430900, -98.49467900),
(3, 'Rio de Janeiro', -22.95191600, -43.21048700),
(4, 'Sichuan', 30.65090000, 104.07570000),
(5, 'Paris', 48.85840000, 2.29450000),
(6, 'Cairo', 29.97920000, 31.13420000),
(7, 'Minneapolis', 44.97780000, -93.26500000),
(8, 'Mexico City', 19.43260000, -99.13320000),
(9, 'Tokyo', 35.67640000, 139.65000000),
(10, 'Olympia', 37.63850000, 21.62990000),
(11, 'Agra', 27.17670000, 78.00810000),
(12, 'Ottawa', 45.42359370, -75.70092900),
(13, 'Bangkok', 13.74985580, 100.49157650),
(14, 'Copenhagen', 55.69285990, 12.59928280),
(15, 'Reykjavik', 64.14202290, -21.92654940),
(16, 'Los Angeles', 34.13411510, -118.32154820),
(17, 'Concord', 43.20691260, -71.53807170),
(18, 'Budapest', 47.50712100, 19.04566900),
(19, 'Athens', 37.97152850, 23.72671660),
(20, 'New York City', 40.75797470, -73.98554260),
(21, 'Venice', 45.43798420, 12.33589800),
(22, 'Dubai', 25.19719700, 55.27437640),
(23, 'Munich', 48.13917070, 11.57424520),
(24, 'Moscow', 55.751244, 37.618423),
(25, 'San Francisco', 37.81991090, -122.47855980),
(26, 'Chicago', 41.89186330, -87.60509440),
(27, 'Toronto', 43.64256620, -79.38705680),
(28, 'Seattle', 47.62050630, -122.34927740),
(29, 'Hong Kong', 22.30041240, 114.18928030),
(30, 'Istanbul', 41.00858300, 28.98017500);

-- Table: question
CREATE TABLE question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(250) NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY (answer) REFERENCES city(id)
);

-- Data: question
INSERT INTO question (id, text, answer) VALUES

-- Washington D.C. (1)
(1, 'In what city is the White House located?', 1),
(2, 'In what city is the Lincoln Memorial located?', 1),
(3, 'Where is the Martin Luther King, Jr. Memorial?', 1),
(4, 'Where is the Washington National Cathedral?', 1),
(5, 'In what city is the Thomas Jefferson Memorial located?', 1),
(6, 'What is the capital of the United States?', 1),
(7, 'What city is informally known as ''The District''?', 1),

-- San Antonio (2)
(8, 'Do you remember the Alamo?', 2),
(9, 'In which city is the Tower of the Americas located?', 2),
(10, 'Which city has the Spanish colonial missions of San Jose and San Juan?', 2),
(11, 'Where is military Fort Sam Houston located?', 2),
(51, 'Which Texas city is home to the NBA''s San Antonio Spurs?', 2),

-- Rio de Janeiro (3)
(12, 'In what city is Christ the Redeemer?', 3),
(13, 'Sugarloaf Mountain is located in what city?', 3),
(14, 'In what city is Tijuca National Forest Located', 3),
(15, 'What city was the capital of Brazil until 1960?', 3),
(16, 'What city has the nickname Cidade Maravilhosa?', 3),
(17, 'What populous city sits on Guanabara Bay?', 3),
(39, 'Which city hosted the 2016 Summer Olympics?', 3),

-- Chengdu (4)
(18, 'The province of this capital is known for its bold, spicy, and numbing cuisine.', 4),
(19, 'What city houses the Leshan Giant Buddha?', 4),
(20, 'What city has been the capital of the Sichuan province for 2,000 years?', 4),
(21, 'What city is known as the Home of the Giant Panda?', 4),
(22, 'What city was the base of operations for the American Flying Tigers air force?', 4),

-- Paris (5)
(23, 'What city has the Eiffel Tower?', 5),
(52, 'Which city is home to the Louvre Museum?', 5),
(53, 'In what city is Notre-Dame Cathedral?', 5),
(54, 'Which city is known as the "City of Light"?', 5),
(55, 'Which city is home to the Arc de Triomphe?', 5),

-- Cairo (6)
(24, 'What city has the Great Pyramids of Giza?', 6),
(56, 'In which city is the Great Sphinx located?', 6),
(57, 'What is the capital of Egypt?', 6),
(58, 'Which city is home to the Egyptian Museum?', 6),
(59, 'Which African capital sits along the Nile River?', 6),

-- Minneapolis (7)
(25, 'What is the capital city of Minnesota?', 7),
(60, 'Which city is known as the "City of Lakes"?', 7),
(61, 'Which city is home to the Walker Art Center?', 7),
(62, 'What city is home to the Stone Arch Bridge over the Mississippi?', 7),
(63, 'Which city is home to the Minneapolis Institute of Art?', 7),

-- Mexico City (8)
(26, 'What city was built over the Aztec City of Tenochtitlan?', 8),
(50, 'What is the capital of Mexico?', 8),
(64, 'Which city is home to Chapultepec Castle?', 8),
(65, 'Where is the Zocalo, one of the world''s largest public squares?', 8),
(66, 'Which city is near the ancient pyramids of Teotihuacan?', 8),

-- Tokyo (9)
(27, 'Which of these places was once called Edo?', 9),
(67, 'Which city is home to the famous Shibuya Crossing?', 9),
(68, 'Where is Senso-ji, Japan''s oldest Buddhist temple?', 9),
(69, 'Which city is home to the Tokyo Skytree?', 9),
(70, 'In what city is the Imperial Palace of Japan?', 9),

-- Olympia (10)
(28, 'In what city was the Statue of Zeus originally constructed?', 10),
(71, 'In what ancient Greek city were the Olympic Games first held?', 10),
(72, 'Where is the Temple of Hera, where the Olympic flame is lit?', 10),
(73, 'Which Greek city was home to the Sacred Grove of Zeus?', 10),
(74, 'What city is home to the Ancient Olympia archaeological site?', 10),

-- Agra (11)
(29, 'Where is the Taj Mahal?', 11),
(75, 'Which Indian city is home to the Agra Fort?', 11),
(76, 'What city was the Mughal Empire''s capital in the 16th century?', 11),
(77, 'Which city is home to Itmad-ud-Daula, the "Baby Taj"?', 11),
(78, 'Which Indian city sits on the Yamuna River near the Taj Mahal?', 11),

-- Ottawa (12)
(30, 'What is the Capital of Canada?', 12),
(79, 'In which city is the Canadian Parliament building?', 12),
(80, 'Which city is home to the Rideau Canal, a UNESCO World Heritage Site?', 12),
(81, 'Which city is home to the National Gallery of Canada?', 12),
(82, 'What Canadian capital is home to the ByWard Market?', 12),

-- Bangkok (13)
(31, 'What is the Capital of Thailand?', 13),
(83, 'Which city is home to the Grand Palace?', 13),
(84, 'Where is Wat Pho, home to the famous Reclining Buddha?', 13),
(85, 'Which capital city is also known as Krung Thep?', 13),
(86, 'What city is home to Chatuchak, one of the world''s largest weekend markets?', 13),

-- Copenhagen (14)
(32, 'Which European capital is known for the Little Mermaid statue?', 14),
(87, 'Which city is home to Tivoli Gardens, one of the world''s oldest amusement parks?', 14),
(88, 'Where is the colorful 17th-century waterfront district of Nyhavn?', 14),
(89, 'What is the capital of Denmark?', 14),
(90, 'Which city is home to Christiansborg Palace?', 14),

-- Reykjavik (15)
(33, 'What is the Capital of Iceland?', 15),
(91, 'Which capital city is closest to the Blue Lagoon geothermal spa?', 15),
(92, 'Where is Hallgrimskirkja, Iceland''s largest church?', 15),
(93, 'What is the northernmost national capital in the world?', 15),
(94, 'Which city is home to the Sun Voyager sculpture?', 15),

-- Los Angeles (16)
(34, 'Which U.S. city is known as the City of Angels?', 16),
(95, 'Which city is home to the Hollywood Walk of Fame?', 16),
(96, 'Where is the Griffith Observatory?', 16),
(97, 'Which city is home to the Getty Center museum?', 16),
(98, 'Which city hosts the Academy Awards ceremony?', 16),

-- Concord (17)
(35, 'What is the Capital of New Hampshire?', 17),
(99, 'Which city is home to the New Hampshire State House?', 17),
(100, 'What New England city sits on the Merrimack River in New Hampshire?', 17),
(101, 'Which city is home to the McAuliffe-Shepard Discovery Center?', 17),
(102, 'What city was the birthplace of astronaut Christa McAuliffe?', 17),

-- Budapest (18)
(36, 'What city is located on the Danube river?', 18),
(103, 'Which city is known for the Szechenyi thermal baths?', 18),
(104, 'Where is the Hungarian Parliament Building?', 18),
(105, 'Which city is divided by the Danube into two historic halves?', 18),
(106, 'What European capital is home to Buda Castle?', 18),

-- Athens (19)
(37, 'Which city would you visit to see the Parthenon?', 19),
(107, 'What is the capital of Greece?', 19),
(108, 'Which city is home to the Acropolis?', 19),
(109, 'Which city hosted the first modern Olympic Games in 1896?', 19),
(110, 'Where is the ancient Agora of Athens?', 19),

-- New York City (20)
(38, 'Which city is known as the "Big Apple"?', 20),
(111, 'In what city is the Empire State Building?', 20),
(112, 'Which city is home to Central Park?', 20),
(113, 'Which city has Times Square?', 20),
(114, 'What city is home to the Brooklyn Bridge?', 20),

-- Venice (21)
(40, 'Which city is famous for canals and gondolas?', 21),
(115, 'Which Italian city is built on a lagoon?', 21),
(116, 'What Italian city is home to the Bridge of Sighs?', 21),
(117, 'In which city is St. Mark''s Basilica?', 21),
(118, 'Which city holds the annual Carnival known for elaborate masks?', 21),
(119, 'What Italian city is known for its Rialto Bridge?', 21),

-- Dubai (22)
(41, 'What city is home to the Burj Khalifa, the tallest building in the world?', 22),
(120, 'Which city is home to the Palm Jumeirah artificial island?', 22),
(121, 'Where is the Dubai Mall, one of the world''s largest shopping centers?', 22),
(122, 'Which city is home to the iconic sail-shaped Burj Al Arab hotel?', 22),
(123, 'What city has the Dubai Fountain, the world''s largest choreographed fountain?', 22),

-- Munich (23)
(42, 'Which European city is known for Oktoberfest?', 23),
(124, 'Which city is home to the Nymphenburg Palace?', 23),
(125, 'What Bavarian city is home to the BMW Museum?', 23),
(126, 'Which city hosts the world-famous Hofbrauhaus beer hall?', 23),
(127, 'What city is home to the Marienplatz and its Glockenspiel?', 23),

-- Moscow (24)
(43, 'In which capital city is the Red Square situated?', 24),
(128, 'Which city is home to the Kremlin?', 24),
(129, 'Where is St. Basil''s Cathedral?', 24),
(130, 'Which city is home to the Bolshoi Theatre?', 24),
(131, 'What is the capital of Russia?', 24),

-- San Francisco (25)
(44, 'Which U.S. city is famous for its Golden Gate Bridge?', 25),
(132, 'Which city is home to Alcatraz Island?', 25),
(133, 'What city is known for its historic cable cars?', 25),
(134, 'Which city is home to Fisherman''s Wharf?', 25),
(135, 'What city is home to the Painted Ladies Victorian houses?', 25),

-- Chicago (26)
(45, 'Which city is known as the "Windy City"?', 26),
(136, 'Which city is home to Millennium Park and Cloud Gate ("the Bean")?', 26),
(137, 'What city is home to Willis Tower, formerly the Sears Tower?', 26),
(138, 'Which city is home to the Art Institute of Chicago?', 26),
(139, 'What city is famous for its deep-dish pizza?', 26),

-- Toronto (27)
(46, 'Which city is home to the CN Tower?', 27),
(140, 'What is the largest city in Canada?', 27),
(141, 'Which city is home to the Royal Ontario Museum?', 27),
(142, 'What Canadian city hosts the Toronto International Film Festival?', 27),
(143, 'Which city is home to Rogers Centre, formerly the SkyDome?', 27),

-- Seattle (28)
(47, 'Which city is known for the Space Needle?', 28),
(144, 'Which city is home to Pike Place Market?', 28),
(145, 'What city has the original Starbucks coffee shop?', 28),
(146, 'Which city is home to the Museum of Pop Culture (MoPOP)?', 28),
(147, 'What Pacific Northwest city sits on Puget Sound?', 28),

-- Hong Kong (29)
(48, 'Which city is known as the "Pearl of the Orient"?', 29),
(148, 'Which city is home to Victoria Peak?', 29),
(149, 'What city is famous for the Star Ferry crossing its harbor?', 29),
(150, 'Which city is home to Ocean Park marine amusement park?', 29),
(151, 'What city is known for its Tsim Sha Tsui waterfront promenade?', 29),

-- Istanbul (30)
(49, 'What city was formerly known as Constantinople?', 30),
(152, 'Which city is home to the Hagia Sophia?', 30),
(153, 'What city is home to the Blue Mosque?', 30),
(154, 'Which city is home to the Grand Bazaar, one of the world''s oldest covered markets?', 30),
(155, 'What city straddles two continents, Europe and Asia?', 30);

-- Table: user
-- Stores user accounts and scores
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    score INT DEFAULT 0,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Data: user
INSERT INTO user (id, username, score, password, is_admin) VALUES
(1, 'gael', 17900, '$2b$10$zv2MtpkRuj6cZwha8yo9hOcLpz8wuf3vBNF3Yjk2.zbEJ2zM8p8X.', 0),
(3, 'Molld', 7700, '$2b$10$trdibi.BaptW9KBu0BEL4e/cQ.jbb6nNPLK7GPUs2tFxx38xbU76.', 0),
(6, 'chicken', 0, '$2b$10$OM8Hu84K7.lebxDy40rY0OTjg5G/1dsVFt.UdIfZs7vD8CSnU6Abi', 0),
(7, 'admin', 1000, '$2b$10$Ti3JfXS/vD8fUqtO1ljzSum7iSZfJHIRs56xLfZA.gObtfIraAoFK', 1);