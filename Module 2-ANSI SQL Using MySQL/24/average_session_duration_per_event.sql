USE event_portal;

SELECT e.title,
       AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)) AS average_minutes
FROM events e
JOIN sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title;
