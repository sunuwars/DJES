# Joe and Dom thinking of queries:

## People searching:

* User searches for item
    * `SELECT * FROM items WHERE lower(name) LIKE '%{user-input.toLowerCase()}%' OR lower(description) LIKE '%{user-input.toLowerCase()}%';
    * The above is passed in using JS template literal. Do we need to escape the percentages?

* User searches for item, with box checked to only show items that are available (ie not out on loan)
    * `SELECT * FROM loans WHERE item_id=${item_id}`


SELECT *
FROM login
WHERE user_id=1
ORDER BY date DESC
LIMIT 1

May not be necessary, but the below can return boolean (1 or 0) to tell us whether the item has ever been loaned
``` 
SELECT CASE WHEN EXISTS (
    SELECT *
    FROM loans
    WHERE item_id = 2)
      THEN CAST(1 AS BIT)
      ELSE CAST(0 AS BIT) END;
```
