CREATE TABLE "projects" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar(255), "title" varchar(255), "created_at" datetime, "updated_at" datetime, "body" text, "user_id" integer);
CREATE TABLE "schema_migrations" ("version" varchar(255) NOT NULL);
CREATE TABLE "skills" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "project_id" integer, "skill" varchar(255), "created_at" datetime, "updated_at" datetime);
CREATE TABLE "users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar(255), "last_name" varchar(255), "bio" text, "mission" text, "image_url" varchar(255), "created_at" datetime, "updated_at" datetime);
CREATE UNIQUE INDEX "unique_schema_migrations" ON "schema_migrations" ("version");
INSERT INTO schema_migrations (version) VALUES ('20131128190004');

INSERT INTO schema_migrations (version) VALUES ('20131128234243');

INSERT INTO schema_migrations (version) VALUES ('20131128234748');

INSERT INTO schema_migrations (version) VALUES ('20131128234903');

INSERT INTO schema_migrations (version) VALUES ('20131129140401');
