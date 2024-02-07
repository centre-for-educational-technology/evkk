do
$$
  declare
    temprow  record;
    newvalue varchar;
  begin
    for temprow in
      select *
      from core.text_property
      where property_name = 'vanus'
      loop
        if cast(temprow.property_value as integer) between 1 and 18 then
          newvalue := 'kuni18';
        end if;
        if cast(temprow.property_value as integer) between 19 and 26 then
          newvalue := 'kuni26';
        end if;
        if cast(temprow.property_value as integer) between 27 and 40 then
          newvalue := 'kuni40';
        end if;
        if cast(temprow.property_value as integer) between 41 and 99 then
          newvalue := '41plus';
        end if;
        insert into core.text_property
        values (gen_random_uuid(), temprow.text_id, 'vanusevahemik', newvalue);
      end loop;
  end;
$$
