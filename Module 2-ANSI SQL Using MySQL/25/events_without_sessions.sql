USE event_portal;

SELECT e.title
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL;
