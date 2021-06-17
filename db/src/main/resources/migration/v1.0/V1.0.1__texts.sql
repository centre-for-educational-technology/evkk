create table core.testing_texts(
    id   uuid default uuid_generate_v4(),
    title varchar(50),
    content text,
    created_at    timestamptz not null,
    deleted_at    timestamptz,
    constraint testing_texts_pkey primary key (id)
);

call core.attach_meta_trigger('core.testing_texts');

create table core.text(
    id uuid default uuid_generate_v4(),
    content text,
    constraint text_pkey primary key(id)
);

call core.attach_meta_trigger('core.text');

create table core.text_official_property(
    property_name varchar,
    property_datatype varchar,
    property_type varchar,
    property_description varchar,
    constraint text_official_property_pkey primary key(property_name)
);

call core.attach_meta_trigger('core.text_official_property');

create table core.text_property_default_value(
    id uuid default uuid_generate_v4(),
    property_name varchar,
    property_value varchar,
    property_display_value varchar default NULL,
    constraint text_property_default_value_id primary key(id),
    constraint text_property_default_value_uq unique(property_name, property_value)
);

create table core.text_property(
    id uuid default uuid_generate_v4(),
    text_id uuid references core.text (id),
    property_name varchar,
    property_value varchar,
    constraint text_property_pkey primary key(id)
);

create table core.text_schema(
    schema_name varchar,
    constraint text_schema_pkey primary key(schema_name)
);

create table core.text_schema_property(
    id uuid default uuid_generate_v4(),
    schema_name varchar references text_schema(schema_name),
    property_name varchar references text_official_property(property_name),
    constraint text_schema_property_key primary key(id),
    constraint text_schema_property_uq unique(schema_name, property_name)
);
