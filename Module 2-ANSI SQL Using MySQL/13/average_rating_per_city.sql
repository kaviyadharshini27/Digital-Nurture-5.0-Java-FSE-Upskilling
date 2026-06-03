USE event_portal;

SELECT e.city, AVG(f.rating) AS average_rating
FROM events e
JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.city;
