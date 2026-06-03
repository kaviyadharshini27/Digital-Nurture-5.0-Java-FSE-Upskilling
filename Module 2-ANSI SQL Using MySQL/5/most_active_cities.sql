USE event_portal;

SELECT u.city, COUNT(DISTINCT r.user_id) AS total_users
FROM users u
JOIN registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_users DESC
LIMIT 5;
