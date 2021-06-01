-- write your queries here
SELECT * FROM owners o FULL JOIN vehicles v ON o.id = v.owner_id;
SELECT o.first_name, o.last_name, COUNT(*) as count FROM owners o JOIN vehicles v on o.id = v.owner_id GROUP BY o.first_name, o.last_name ORDER BY count;
SELECT o.first_name, o.last_name, ROUND(AVG(price)) as average_price, COUNT(owner_id) as count FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY o.first_name, o.last_name HAVING ROUND(AVG(price)) > 10000 ORDER BY o.first_name DESC;

