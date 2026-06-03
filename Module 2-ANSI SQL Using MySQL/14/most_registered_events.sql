USE event_portal;

SELECT e.title, COUNT(r.registration_id) AS total_registrations
FROM events e
JOIN registrations r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC
LIMIT 3;
