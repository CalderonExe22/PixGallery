-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."accounts_rol" (
    "id" int8 NOT NULL,
    "name" varchar(100) NOT NULL,
    "description" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX accounts_rol_name_key ON public.accounts_rol USING btree (name)
CREATE INDEX accounts_rol_name_ff4bb5c2_like ON public.accounts_rol USING btree (name varchar_pattern_ops);

INSERT INTO "public"."accounts_rol" ("id", "name", "description") VALUES
(1, 'fotógrafo', '');
INSERT INTO "public"."accounts_rol" ("id", "name", "description") VALUES
(2, 'anonimo', 'usuario no logeado');
