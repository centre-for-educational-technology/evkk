        select array_to_json(array_agg(row_to_json(t)))
        from (
        select distinct tp2.property_name as type,
        tp2.property_value as value,
        count(tp2.text_id) as tekste,
        sum(tp3.property_value::integer) as sonu,
        sum(tp4.property_value::integer) as lauseid,
        sum(tp5.property_value::integer) as vigu,
            
        COUNT(tp2.text_id) * 100.0 / (SELECT distinct COUNT(text_id) FROM core.text_property WHERE property_name = 'korpus' AND property_value IN ('cFOoRQekA')) AS protsent
        from core.text_property as tp1
        JOIN core.text_property as tp2 on tp1.text_id=tp2.text_id
        JOIN core.text_property as tp3 on tp2.text_id=tp3.text_id
        JOIN core.text_property as tp4 on tp3.text_id=tp4.text_id
        JOIN core.text_property as tp5 on tp4.text_id=tp5.text_id
        WHERE tp1.property_name = 'korpus' AND tp1.property_value IN ('cFOoRQekA') AND
         tp2.property_name = 'vanus' AND tp2.property_value IN ('kuni18', 'kuni26', '') AND tp3.property_name = 'sonu' AND tp4.property_name = 'lauseid'
        AND tp5.property_name = 'vigu'
        GROUP BY tp2.property_name, tp2.property_value
        ) t