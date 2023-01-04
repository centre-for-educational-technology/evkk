create table core.text_added
(
  id      uuid default uuid_generate_v4(),
  content text,
  constraint text_added_pkey primary key (id)
);

call core.attach_meta_trigger('core.text_added');

create table core.text_property_added
(
  id             uuid default uuid_generate_v4(),
  text_id        uuid references core.text_added (id),
  property_name  varchar,
  property_value varchar,
  constraint text_property_added_pkey primary key (id)
);
