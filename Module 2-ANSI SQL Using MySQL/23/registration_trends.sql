USE event_portal;

SELECT DATE_FORMAT(registration_date, '%Y-%m') AS month_name,
       COUNT(registration_id) AS total_registrations
FROM registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY month_name;
