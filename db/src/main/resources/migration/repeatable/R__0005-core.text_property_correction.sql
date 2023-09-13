do
$$
  declare
    tempid uuid;
  begin
    for tempid in
      select t1.id
      from core.text_property t1
             join core.text_property t2 on t1.text_id = t2.text_id
      where t1.property_name = 'keeletase'
        and t1.property_value = 'C2'
        and t2.property_name = 'korpus'
        and t2.property_value = 'cYDRkpymb'
      loop
        delete from core.text_property where id = tempid;
      end loop;
  end
$$;
