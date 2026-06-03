USE event_portal;

SELECT u.full_name, COUNT(f.feedback_id) AS total_feedback
FROM users u
JOIN feedback f ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY total_feedback DESC
LIMIT 5;
