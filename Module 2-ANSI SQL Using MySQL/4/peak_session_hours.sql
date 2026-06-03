USE event_portal;

SELECT e.title, COUNT(s.session_id) AS session_count
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
AND TIME(s.start_time) >= '10:00:00'
AND TIME(s.start_time) < '12:00:00'
GROUP BY e.event_id, e.title;
