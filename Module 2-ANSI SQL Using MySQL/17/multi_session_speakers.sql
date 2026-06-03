USE event_portal;

SELECT speaker_name, COUNT(session_id) AS total_sessions
FROM sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1;
