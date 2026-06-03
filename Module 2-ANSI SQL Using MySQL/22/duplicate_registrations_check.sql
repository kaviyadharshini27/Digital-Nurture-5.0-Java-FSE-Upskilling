USE event_portal;

SELECT user_id, event_id, COUNT(*) AS duplicate_count
FROM registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;
