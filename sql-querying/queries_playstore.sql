-- Comments in SQL Start with dash-dash --
SELECT * FROM analytics WHERE id = 1880;
SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';
SELECT category, COUNT(*)FROM analytics GROUP BY category;
SELECT app_name, reviews FROM analytics ORDER by reviews desc LIMIT 5;
SELECT app_name, reviews, rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews desc LIMIT 1;
SELECT category, AVG(rating) FROM analytics GROUP by category ORDER BY AVG(rating) desc;
SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price desc LIMIT 1;
SELECT app_name, min_installs, rating FROM analytics WHERE min_installs < 50 AND rating IS NOT NULL ORDER BY rating desc;
SELECT app_name, rating, reviews FROM analytics WHERE rating < 3 AND reviews >= 10000;
SELECT app_name, reviews, price FROM analytics WHERE price BETWEEN 0.10 AND 1 ORDER BY reviews desc LIMIT 10;
SELECT * FROM analytics WHERE last_updated = ( SELECT MIN(last_updated) FROM analytics);
SELECT * FROM analytics WHERE price = ( SELECT MAX(price) FROM analytics);
SELECT SUM(reviews) FROM analytics;
SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;
SELECT app_name, reviews, min_installs,  min_installs / reviews AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;