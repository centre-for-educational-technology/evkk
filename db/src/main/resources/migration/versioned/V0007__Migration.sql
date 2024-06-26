create function core.get_text_id_by_code_or_title(content varchar) returns uuid as
$$
begin
  return (select TP.text_id from core.text_property as TP
          where TP.property_name in ('failinimi', 'kood')
            and TP.property_value like content);
end;
$$ language plpgsql immutable;


create table core.text_error_analysis_sentences
(
  id            uuid default uuid_generate_v4(),
  text_id       uuid references core.text(id),
  sentence_num  bigint,
  sentence      text,
  constraint text_error_analysis_sentences_pkey primary key (id)
);

call core.attach_meta_trigger('core.text_error_analysis_sentences');

create table core.text_error_analysis_annotations
(
  id             uuid default uuid_generate_v4(),
  sentence_id    uuid references core.text_error_analysis_sentences (id),
  scope_start    bigint,
  scope_end      bigint,
  error_type     text,
  correction     text,
  annotator_id   bigint,
  constraint text_error_analysis_annotations_pkey primary key (id)
);

call core.attach_meta_trigger('core.text_error_analysis_annotations');
