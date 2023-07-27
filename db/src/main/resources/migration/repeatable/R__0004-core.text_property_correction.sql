delete
from core.text_property
where property_value = '';
delete
from core.text_property
where property_value = '?';

-- haridus start --
delete
from core.text_property
where property_name = 'haridus'
  and property_value = 'TEADMATA';

do
$$
  declare
    temprow  record;
    newvalue varchar;
  begin
    for temprow in
      select * from core.text_property where property_name = 'haridus'
      loop
        insert into core.text_property
        values (gen_random_uuid(), temprow.text_id, 'haridus_vana', temprow.property_value);
        if temprow.property_value = 'pohi' then
          newvalue := 'Alg-/põhiharidus';
        end if;
        if temprow.property_value = 'kesk' then
          newvalue := 'Keskharidus';
        end if;
        if temprow.property_value = 'korg' then
          newvalue := 'Kõrgharidus';
        end if;
        if temprow.property_value in ('pohi', 'kesk', 'korg') then
          update core.text_property set property_value = newvalue where id = temprow.id;
        end if;
        if temprow.property_value = 'muu' then
          delete from core.text_property where id = temprow.id;
        end if;
      end loop;
  end
$$;
-- haridus end --

-- sugu start --
update core.text_property
set property_value = 'mees'
where property_name = 'sugu'
  and property_value = 'M';
update core.text_property
set property_value = 'naine'
where property_name = 'sugu'
  and property_value = 'N';
-- sugu end --

-- elukoht start --
update core.text_property
set property_value = 'Eesti'
where property_name = 'riik'
  and property_value = 'eesti';

do
$$
  declare
    temprow record;
  begin
    for temprow in
      select * from core.text_property where property_name = 'elukoht'
      loop
        delete from core.text_property where property_name = 'riik' and text_id = temprow.text_id;
        if temprow.property_value in ('inglismaa', 'leedu', 'saksamaa', 'soome', 'ungari', 'muu') then
          insert into core.text_property
          values (gen_random_uuid(), temprow.text_id, 'riik', initcap(temprow.property_value));
          delete from core.text_property where id = temprow.id;
        end if;
        if temprow.property_value in
           ('tallinn', 'idaviru', 'tartu', 'Alutaguse vald', 'Anija vald', 'Elva vald', 'Harku vald', 'Hiiumaa vald',
            'Jõgeva vald', 'Jõhvi vald', 'Kambja vald', 'Kiili vald', 'Kohtla-Järve linn', 'Luunja vald',
            'Lääne-Harju vald', 'Maardu linn', 'Mustvee vald', 'Narva linn', 'Narva-Jõesuu linn', 'Pärnu linn',
            'Rae vald', 'Rakvere linn', 'Rakvere vald', 'Saue vald', 'Sillamäe linn', 'Tallinn', 'Tartu linn',
            'Tartu vald', 'Toila vald', 'Tori vald', 'Valga vald', 'Viimsi vald', 'Viljandi linn', 'Viru-Nigula vald',
            'Võru vald') then
          insert into core.text_property values (gen_random_uuid(), temprow.text_id, 'riik', 'Eesti');
        end if;
        if temprow.property_value = 'tallinn' then
          update core.text_property set property_value = 'Tallinn' where id = temprow.id;
        end if;
        if temprow.property_value = 'idaviru' then
          update core.text_property set property_value = 'Ida-Viru maakond' where id = temprow.id;
        end if;
        if temprow.property_value = 'tartu' then
          update core.text_property set property_value = 'Tartu linn' where id = temprow.id;
        end if;
      end loop;
  end
$$;
-- elukoht end --

-- vanus start --
do
$$
  declare
    temprow record;
  begin
    for temprow in
      select *
      from core.text_property
      where property_name = 'vanus'
        and property_value in ('kuni18', 'kuni26', 'kuni40', '41plus')
      loop
        delete from core.text_property where id = temprow.id;
        insert into core.text_property
        values (gen_random_uuid(), temprow.text_id, 'vanusevahemik', temprow.property_value);
      end loop;
  end
$$;
-- vanus end --

-- ajavahemik start --
do
$$
  declare
    temprow  record;
    newvalue varchar;
  begin
    delete from core.text_property where property_name = 'ajavahemik' and property_value not like '%-%';
    for temprow in
      select *
      from core.text_property
      where property_name = 'aasta'
      loop
        if not exists(select 1
                      from core.text_property
                      where property_name = 'ajavahemik'
                        and text_id = temprow.text_id) then
          if cast(temprow.property_value as integer) between 2000 and 2005 then
            newvalue := '2000-2005';
          end if;
          if cast(temprow.property_value as integer) between 2006 and 2010 then
            newvalue := '2006-2010';
          end if;
          if cast(temprow.property_value as integer) between 2011 and 2015 then
            newvalue := '2011-2015';
          end if;
          if cast(temprow.property_value as integer) between 2016 and 2020 then
            newvalue := '2016-2020';
          end if;
          if cast(temprow.property_value as integer) between 2021 and 9999 then
            newvalue := '2021-';
          end if;
          insert into core.text_property
          values (gen_random_uuid(), temprow.text_id, 'ajavahemik', newvalue);
        end if;
      end loop;
  end
$$;
-- ajavahemik end --
