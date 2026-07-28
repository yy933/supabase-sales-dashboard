SELECT 
	sum(sales_deals.value),
	user_profiles.name
FROM sales_deals
INNER JOIN user_profiles ON sales_deals.user_id = user_profiles.id
GROUP BY user_profiles.name;