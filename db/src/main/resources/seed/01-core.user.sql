insert into core.user (user_id, email_address, password_hash, created_at, role_name)
values ('5ffe9511-8eff-408c-8f8e-5d01d9b8df27', 'user0@localhost', '{noop}password', transaction_timestamp(), 'ADMIN');
--insert into core.text_parsing_type VALUES ('estnltk14');
--insert into core.text_parsing_type VALUES ('stanza_conllu');
--insert into core.text_parsing (parsing_type, text_id, parsed_content) VALUES('estnltk14', '32c21cfc-b14f-45e5-8d67-e59d7cfa2e54', 'proovisisestus');