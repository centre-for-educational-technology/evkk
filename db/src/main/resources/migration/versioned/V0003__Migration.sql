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
