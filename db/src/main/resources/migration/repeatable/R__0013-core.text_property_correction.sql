delete
from core.text_property
where property_value = '';

update core.text_property
set property_value = 'ak_uurimus_batoo'
where property_value = 'ak_uurimus_bakalaureusetoo';

update core.text_property
set property_value = 'k1eesti_harjutus'
where text_id in (
                  'af71d7da-6ae0-4048-b1fd-f2f83d8aee5a',
                  'b0ca6f22-e126-46cf-a57c-7c2889cf1f2f',
                  '3739d73c-d4d0-45ab-9cfa-6b6c03ea67e2',
                  '344f5cb4-cde1-402a-8924-b5e28888340f',
                  'df7b5411-4fcb-43da-ad9f-fdd2d2928ad7',
                  '602c4e79-a1dd-468c-baab-6bda8cc53e5e',
                  'd837c59a-af42-4546-827b-bb1393da1849'
  )
  and property_name = 'tekstityyp';

delete
from core.text_property
where property_name = 'emakeel'
  and property_value = 'muud';

delete
from core.text_property
where property_name = 'riik'
  and property_value = 'Muu';
