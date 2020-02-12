----------------
-- EXTENSIONS --
----------------

create extension if not exists "uuid-ossp";
create extension if not exists "citext";
create extension if not exists "hstore";

------------------
-- SCHEMA SETUP --
------------------

grant usage on schema sys to public;
grant usage on schema core to public;

alter default privileges for role current_user in schema core grant select, insert, update on tables to group core_rw;
alter default privileges for role current_user in schema core grant usage on sequences to group core_rw;
alter default privileges for role current_user in schema core grant select on tables to group core_r;

alter default privileges for role current_user in schema sys grant select, insert, update on tables to group sys_rw;
alter default privileges for role current_user in schema sys grant usage on sequences to group sys_rw;
alter default privileges for role current_user in schema sys grant select on tables to group sys_r;

---------------
-- FUNCTIONS --
---------------

-- core.update_meta_field

create function core.update_meta_field() returns trigger as
$$
declare
    now  text = transaction_timestamp()::text;
    user text = current_user::text;
begin
    new._meta = jsonb_object(array [
        'updated_at', now,
        'updated_by', user,
        'created_at', coalesce(new._meta ->> 'created_at', now),
        'created_by', coalesce(new._meta ->> 'created_by', user)
        ]);
    return new;
end;
$$ language plpgsql;

-- core.attach_meta_trigger

create or replace procedure core.attach_meta_trigger(full_table_name regclass) as
$$
declare
    schema_name text;
    table_name  text;
begin
    select relnamespace::regnamespace::text, relname::text
    into schema_name, table_name
    from pg_catalog.pg_class
    where oid = full_table_name;

    execute format('alter table %1$s.%2$s add column _meta jsonb not null',
                   schema_name, table_name);
    execute format('create trigger %2$s_meta_trigger before insert or update on %1$s.%2$s for each row execute procedure core.update_meta_field()',
                   schema_name, table_name);
end;
$$ language plpgsql;

-----------------
-- CORE SCHEMA --
-----------------

-- core.user

create table core.user
(
    user_id       uuid primary key default uuid_generate_v4(),
    email_address citext not null,
    password_hash text   not null,

    constraint user_uq_email_address unique (email_address)
);

call attach_meta_trigger('core.user');

comment on table core.user IS 'EVKK user accounts and passwords';
comment on column core.user.email_address IS 'Unique email address';
comment on column core.user.password_hash IS 'Password hash';

-- core.file

create table core.file
(
    file_id    uuid default uuid_generate_v4(),
    oid        bigint      not null,
    file_type  text        not null,
    media_type text        not null,
    metadata   jsonb,
    created_at timestamptz not null,
    expires_in interval,
    deleted_at timestamptz,

    constraint files_pkey primary key (file_id),
    constraint files_ck_file_type check (file_type in ('TEMPORARY'))
);

comment on table core.file is 'Table for tracking files that are being stored in S3';
comment on column core.file.oid is 'File OID';
comment on column core.file.file_type is 'File type';
comment on column core.file.media_type is 'Media type';
comment on column core.file.metadata is 'Metadata for the file';
comment on column core.file.created_at is 'When was file created';
comment on column core.file.expires_in is 'When file expires and should be deleted, if NULL file never expires';
comment on column core.file.deleted_at is 'When was this file deleted';

call core.attach_meta_trigger('core.file');

-- core.user_file

create table core.user_file
(
    user_file_id uuid primary key default uuid_generate_v4(),
    file_id      uuid        not null references core.file (file_id),
    user_id      uuid        not null references core.user (user_id),
    created_at   timestamptz not null,
    deleted_at   timestamptz,

    constraint user_file_uq_file_id_user_id UNIQUE (file_id, user_id)
);

call attach_meta_trigger('core.user_file');

-- core.token

create table core.token
(
    token_id    uuid default uuid_generate_v4(),
    created_at  timestamptz not null,
    consumed_at timestamptz,
    validity    interval    not null,
    type        text        not null,
    data        jsonb       not null,

    constraint token_pk primary key (token_id),
    constraint token_ck_type check ( type in ('SESSION_TOKEN') )
);

comment on table core.token is 'Tokens with expiration and consuming support';
comment on column core.token.created_at is 'When token was created';
comment on column core.token.consumed_at is 'When was token consumed';
comment on column core.token.validity is 'Token validity duration';
comment on column core.token.type is 'Token type';
comment on column core.token.data is 'Additional data for token';

call core.attach_meta_trigger('core.token');

-----------
-- VIEWS --
-----------
