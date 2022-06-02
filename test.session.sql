CREATE TABLE core.text_insert(
    text_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    upload_timestamp TIMESTAMP,
    user_id INT,
    is_private BOOLEAN,
    text_title TEXT,
    text_description TEXT NOT NULL,
    text_content TEXT NOT NULL,
    text_type TEXT NOT NULL,
    used_resources BOOLEAN NOT NULL,
    is_the_author BOOLEAN,
    author_age INT NOT NULL,
    author_gender TEXT NOT NULL,
    author_degree TEXT NOT NULL,
    author_speciality TEXT NOT NULL,
    author_native_language TEXT NOT NULL,
    autor_is_bilingual BOOLEAN,
    other_languages INT,
    author_country_of_residence TEXT
);

CREATE TABLE core.text_insert_languages(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    text_id INT NOT NULL,
    extra_language TEXT
);

DROP TABLE core.text_insert

create table core.text_test as (select * from core.text_property) with no data;

INSERT INTO core.text_test (content)
VALUES ('content');

ALTER TABLE core.text_test
ADD COLUMN title TEXT;
