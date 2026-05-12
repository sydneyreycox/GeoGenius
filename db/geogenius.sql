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
INSERT INTO city (id, name, lat, lng, cityImage) VALUES
(1, 'Washington D.C', 38.89425000, -77.03965000, 'WashingtonDCImage.png'),
(2, 'San Antonio', 29.42430900, -98.49467900, 'SanAntonioImage.png'),
(3, 'Rio de Janeiro', -22.95191600, -43.21048700, 'RioDeJaneiroImage.png'),
(4, 'Sichuan', 30.65090000, 104.07570000, 'SichuanImage.png'),
(5, 'Paris', 48.85840000, 2.29450000, 'ParisImage.png'),
(6, 'Cairo', 29.97920000, 31.13420000, 'CairoImage.png'),
(7, 'Minneapolis', 44.97780000, -93.26500000, 'MinneapolisImage.png'),
(8, 'Mexico City', 19.43260000, -99.13320000, 'MexicoCityImage.png'),
(9, 'Tokyo', 35.67640000, 139.65000000, 'TokyoImage.png'),
(10, 'Olympia', 37.63850000, 21.62990000, 'OlympiaImage.png'),
(11, 'Agra', 27.17670000, 78.00810000, 'AgraImage.png'),
(12, 'Ottawa', 45.42359370, -75.70092900, 'OttawaImage.png'),
(13, 'Bangkok', 13.74985580, 100.49157650, 'BangkokImage.png'),
(14, 'Copenhagen', 55.69285990, 12.59928280, 'CopenhagenImage.png'),
(15, 'Reykjavik', 64.14202290, -21.92654940, 'ReykjavikImage.png'),
(16, 'Los Angeles', 34.13411510, -118.32154820, 'LosAngelesImage.png'),
(17, 'Concord', 43.20691260, -71.53807170, 'ConcordImage.png'),
(18, 'Budapest', 47.50712100, 19.04566900, 'BudapestImage.png'),
(19, 'Athens', 37.97152850, 23.72671660, 'AthensImage.png'),
(20, 'New York City', 40.75797470, -73.98554260, 'NewYorkCityImage.png'),
(21, 'Venice', 45.43798420, 12.33589800, 'VeniceImage.png'),
(22, 'Dubai', 25.19719700, 55.27437640, 'DubaiImage.png'),
(23, 'Munich', 48.13917070, 11.57424520, 'MunichImage.png'),
(24, 'Moscow', 55.751244, 37.618423, 'MoscowImage.png'),
(25, 'San Francisco', 37.81991090, -122.47855980, 'SanFranciscoImage.png'),
(26, 'Chicago', 41.89186330, -87.60509440, 'ChicagoImage.png'),
(27, 'Toronto', 43.64256620, -79.38705680, 'TorontoImage.png'),
(28, 'Seattle', 47.62050630, -122.34927740, 'SeattleImage.png'),
(29, 'Hong Kong', 22.30041240, 114.18928030, 'HongKongImage.png'),
(30, 'Istanbul', 41.00858300, 28.98017500, 'IstanbulImage.png');

-- Table: question
CREATE TABLE question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(250) NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY (answer) REFERENCES city(id)
);

-- Data: question
INSERT INTO question (id, text, answer) VALUES
(1, 'What city is the White House Located?', 1),
(2, 'Do you remember the Alamo?', 2),
(3, 'In what city is Christ the Redeemer?', 3),
(4, 'What province is known for its bold, spicy, and numbing cuisine?', 4),
(5, 'What city has the Eiffel Tower?', 5),
(6, 'What city has the Great Pyramids of Giza?', 6),
(7, 'What is the capital city of Minnesota?', 7),
(8, 'What city was built over the Aztec City of Tenochtitlan?', 8),
(9, 'Which of these places was once called Edo?', 9),
(10, 'What is the capital of the United States?', 1),
(11, 'In what city was the Statue of Zeus originally constructed?', 10),
(12, 'Where is the Taj Mahal?', 11),
(13, 'What is the Capital of Canada?', 12),
(14, 'What is the Capital of Thailand?', 13),
(15, 'Which European capital is known for the Little Mermaid statue?', 14),
(16, 'What is the Capital of Iceland?', 15),
(17, 'Which U.S. city is known as the City of Angels?', 16),
(18, 'What is the Capital of New Hampshire?', 17),
(19, 'What city is located on the Danube river?', 18),
(20, 'Which city would you visit to see the Parthenon?', 19),
(21, 'Which city is known as the “Big Apple”?', 20),
(22, 'Which city hosted the 2016 Summer Olympics?', 21),
(23, 'Which city is famous for canals and gondolas?', 3),
(24, 'What city is home to the Burj Khalifa, the tallest building in the world?', 22),
(25, 'Which European city is known for Oktoberfest?', 23),
(26, 'In which capital city is the Red Square situated?', 24),
(27, 'Which U.S. city is famous for its Golden Gate Bridge?', 25),
(28, 'Which city is known as the “Windy City”?', 26),
(29, 'Which city is home to the CN Tower?', 27),
(30, 'Which city is known for the Space Needle?', 28),
(31, 'Which city is known as the “Pearl of the Orient”?', 29),
(32, 'What city was formerly known as Constantinople?', 30),
(33, 'What is the capital of Mexico?', 8);

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