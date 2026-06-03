USE event_portal;

SELECT e.title, e.city, e.start_date, e.end_date
FROM users u
JOIN registrations r ON u.user_id = r.user_id
JOIN events e ON r.event_id = e.event_id
WHERE u.user_id = 1
AND e.status = 'upcoming'
AND u.city = e.city
ORDER BY e.start_date;
