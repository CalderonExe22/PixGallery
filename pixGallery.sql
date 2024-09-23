-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."menus_menu" (
    "id" int8 NOT NULL,
    "name" varchar(100) NOT NULL,
    "url" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."menus_menurol" (
    "id" int8 NOT NULL,
    "menu_id" int8 NOT NULL,
    "rol_id" int8 NOT NULL,
    CONSTRAINT "menus_menurol_menu_id_643dacaf_fk_menus_menu_id" FOREIGN KEY ("menu_id") REFERENCES "public"."menus_menu"("id"),
    CONSTRAINT "menus_menurol_rol_id_c606ddbf_fk_accounts_rol_id" FOREIGN KEY ("rol_id") REFERENCES "public"."accounts_rol"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE INDEX menus_menurol_menu_id_643dacaf ON public.menus_menurol USING btree (menu_id)
CREATE INDEX menus_menurol_rol_id_c606ddbf ON public.menus_menurol USING btree (rol_id);

INSERT INTO "public"."menus_menu" ("id", "name", "url") VALUES
(1, 'login', '/login');
INSERT INTO "public"."menus_menu" ("id", "name", "url") VALUES
(2, 'register', '/register');
INSERT INTO "public"."menus_menu" ("id", "name", "url") VALUES
(3, 'home', '/');
INSERT INTO "public"."menus_menu" ("id", "name", "url") VALUES
(4, 'logout', '/logout'),
(5, 'deskboard', '/deskboard'),
(6, 'galery', '/galery'),
(7, 'crear', '/create');

INSERT INTO "public"."menus_menurol" ("id", "menu_id", "rol_id") VALUES
(1, 1, 2);
INSERT INTO "public"."menus_menurol" ("id", "menu_id", "rol_id") VALUES
(2, 2, 2);
INSERT INTO "public"."menus_menurol" ("id", "menu_id", "rol_id") VALUES
(3, 3, 2);
INSERT INTO "public"."menus_menurol" ("id", "menu_id", "rol_id") VALUES
(4, 4, 1),
(5, 5, 1),
(6, 3, 1),
(7, 6, 1),
(8, 7, 1);
