create function core.text_hash(content text) returns text as
$$
begin
  return encode(sha512(convert_to(content::text, 'utf-8')), 'hex');
end;
$$ language plpgsql immutable;

alter table core.text
  add column hash text generated always as ( core.text_hash(content) ) stored;

update core.text
set hash = default;

alter table core.text
  alter column hash set not null;

comment on column core.text.hash is 'Computed hash for text content';

create index text_idx_hash on core.text (hash);

create table core.text_processor_result
(
  text_processor_result_id uuid default uuid_generate_v4(),
  text_hash                text   not null,
  type                     text   not null,
  version                  bigint not null,
  result                   jsonb  not null,

  constraint text_processor_result_uq_text_hash_type_version unique (text_hash, type, version)
);

comment on table core.text_processor_result is 'Results for text processors';
comment on column core.text_processor_result.text_processor_result_id is 'Primary key';
comment on column core.text_processor_result.text_hash is 'Hash code computed for the text in core.text.hash';
comment on column core.text_processor_result.type is 'Processor type';
comment on column core.text_processor_result.version is 'Processor version';
comment on column core.text_processor_result.result is 'Processor result';

call core.attach_meta_trigger('core.text_processor_result');
create index text_processor_result_idx_text_hash on core.text_processor_result (text_hash);
