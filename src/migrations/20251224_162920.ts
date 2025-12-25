import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text,
  	\`date\` text,
  	\`slug\` text,
  	\`title\` text,
  	\`title_en\` text,
  	\`title_ko\` text,
  	\`title_cn\` text,
  	\`title_tw\` text,
  	\`url\` text,
  	\`url_en\` text,
  	\`url_ko\` text,
  	\`url_cn\` text,
  	\`url_tw\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`path\` text,
  	\`title\` text,
  	\`title_en\` text,
  	\`title_ko\` text,
  	\`title_cn\` text,
  	\`title_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`ogp_image_url\` text,
  	\`ogp_image_url_en\` text,
  	\`ogp_image_url_ko\` text,
  	\`ogp_image_url_cn\` text,
  	\`ogp_image_url_tw\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`is_disabled\` integer,
  	\`slug\` text,
  	\`area\` text,
  	\`image_url\` text,
  	\`flutter_map_position_top\` numeric,
  	\`flutter_map_position_left\` numeric,
  	\`map_coords_mobile\` text,
  	\`map_coords\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`attractions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`is_disabled\` integer,
  	\`name\` text,
  	\`name_kana\` text,
  	\`area\` text,
  	\`is_limit_disabled\` integer,
  	\`limit_title\` text,
  	\`limit_text_field\` text,
  	\`limit_age_min\` numeric,
  	\`limit_passenger_age_min\` numeric,
  	\`limit_weight_min\` numeric,
  	\`limit_weight_max\` numeric,
  	\`limit_height_min\` numeric,
  	\`accompanied_age\` numeric,
  	\`parental_consent\` integer,
  	\`driving_license\` integer,
  	\`restricted_users\` text,
  	\`restricted_users_en\` text,
  	\`restricted_users_ko\` text,
  	\`restricted_users_cn\` text,
  	\`restricted_users_tw\` text,
  	\`notes\` text,
  	\`notes_en\` text,
  	\`notes_ko\` text,
  	\`notes_cn\` text,
  	\`notes_tw\` text,
  	\`ticket_premium_pass\` text,
  	\`ticket_same_day\` text,
  	\`disclaimer\` text,
  	\`image_url\` text,
  	\`image_url_small\` text,
  	\`ogp_image_url\` text,
  	\`tagline\` text,
  	\`tagline_en\` text,
  	\`tagline_ko\` text,
  	\`tagline_cn\` text,
  	\`tagline_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`limit_old_age\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`attractions_updated_at_idx\` ON \`attractions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`attractions_created_at_idx\` ON \`attractions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`restaurants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`is_disabled\` integer,
  	\`area\` text,
  	\`name\` text,
  	\`name_kana\` text,
  	\`tagline\` text,
  	\`tagline_en\` text,
  	\`tagline_ko\` text,
  	\`tagline_cn\` text,
  	\`tagline_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`business_start_time\` text,
  	\`business_end_time\` text,
  	\`image_url\` text,
  	\`image_url_small\` text,
  	\`image_url_main\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`restaurants_updated_at_idx\` ON \`restaurants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`restaurants_created_at_idx\` ON \`restaurants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`spa\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`is_disabled\` integer,
  	\`area\` text,
  	\`name\` text,
  	\`name_kana\` text,
  	\`tagline\` text,
  	\`tagline_en\` text,
  	\`tagline_ko\` text,
  	\`tagline_cn\` text,
  	\`tagline_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`image_url\` text,
  	\`image_url_small\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`spa_updated_at_idx\` ON \`spa\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`spa_created_at_idx\` ON \`spa\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`areas\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`areas_updated_at_idx\` ON \`areas\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`areas_created_at_idx\` ON \`areas\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`name_en\` text,
  	\`name_ko\` text,
  	\`name_cn\` text,
  	\`name_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`url\` text,
  	\`image_url\` text,
  	\`is_disabled\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hotels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`name_en\` text,
  	\`name_ko\` text,
  	\`name_cn\` text,
  	\`name_tw\` text,
  	\`description\` text,
  	\`description_en\` text,
  	\`description_ko\` text,
  	\`description_cn\` text,
  	\`description_tw\` text,
  	\`url\` text,
  	\`url_en\` text,
  	\`url_ko\` text,
  	\`url_cn\` text,
  	\`url_tw\` text,
  	\`image_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`hotels_updated_at_idx\` ON \`hotels\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hotels_created_at_idx\` ON \`hotels\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`service_guide\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`title\` text,
  	\`title_en\` text,
  	\`title_ko\` text,
  	\`title_cn\` text,
  	\`title_tw\` text,
  	\`subtitle\` text,
  	\`subtitle_en\` text,
  	\`subtitle_ko\` text,
  	\`subtitle_cn\` text,
  	\`subtitle_tw\` text,
  	\`body\` text,
  	\`body_en\` text,
  	\`body_ko\` text,
  	\`body_cn\` text,
  	\`body_tw\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`service_guide_updated_at_idx\` ON \`service_guide\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`service_guide_created_at_idx\` ON \`service_guide\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`important_news\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`title_en\` text,
  	\`title_ko\` text,
  	\`title_cn\` text,
  	\`title_tw\` text,
  	\`url\` text,
  	\`url_en\` text,
  	\`url_ko\` text,
  	\`url_cn\` text,
  	\`url_tw\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`important_news_updated_at_idx\` ON \`important_news\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`important_news_created_at_idx\` ON \`important_news\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ota_banners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`language\` text,
  	\`url\` text,
  	\`image_url\` text,
  	\`image_alt\` text,
  	\`event\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`ota_banners_updated_at_idx\` ON \`ota_banners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ota_banners_created_at_idx\` ON \`ota_banners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tickets\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_ex_tax\` text,
  	\`price_ex_tax_en\` text,
  	\`price_ex_tax_ko\` text,
  	\`price_ex_tax_cn\` text,
  	\`price_ex_tax_tw\` text,
  	\`price_inc_tax\` text,
  	\`price_inc_tax_en\` text,
  	\`price_inc_tax_ko\` text,
  	\`price_inc_tax_cn\` text,
  	\`price_inc_tax_tw\` text,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`tickets_updated_at_idx\` ON \`tickets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tickets_created_at_idx\` ON \`tickets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`jtb_banner\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_disabled\` integer,
  	\`text\` text,
  	\`url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`jtb_banner_updated_at_idx\` ON \`jtb_banner\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`jtb_banner_created_at_idx\` ON \`jtb_banner\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`articles_id\` integer REFERENCES articles(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pages_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`products_id\` integer REFERENCES products(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`attractions_id\` integer REFERENCES attractions(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`restaurants_id\` integer REFERENCES restaurants(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`spa_id\` integer REFERENCES spa(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`areas_id\` integer REFERENCES areas(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`partners_id\` integer REFERENCES partners(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`hotels_id\` integer REFERENCES hotels(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`service_guide_id\` integer REFERENCES service_guide(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`important_news_id\` integer REFERENCES important_news(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`ota_banners_id\` integer REFERENCES ota_banners(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`tickets_id\` text REFERENCES tickets(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`jtb_banner_id\` integer REFERENCES jtb_banner(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_attractions_id_idx\` ON \`payload_locked_documents_rels\` (\`attractions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_restaurants_id_idx\` ON \`payload_locked_documents_rels\` (\`restaurants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_spa_id_idx\` ON \`payload_locked_documents_rels\` (\`spa_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_areas_id_idx\` ON \`payload_locked_documents_rels\` (\`areas_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hotels_id_idx\` ON \`payload_locked_documents_rels\` (\`hotels_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_service_guide_id_idx\` ON \`payload_locked_documents_rels\` (\`service_guide_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_important_news_id_idx\` ON \`payload_locked_documents_rels\` (\`important_news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ota_banners_id_idx\` ON \`payload_locked_documents_rels\` (\`ota_banners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tickets_id_idx\` ON \`payload_locked_documents_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_jtb_banner_id_idx\` ON \`payload_locked_documents_rels\` (\`jtb_banner_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`attractions\`;`)
  await db.run(sql`DROP TABLE \`restaurants\`;`)
  await db.run(sql`DROP TABLE \`spa\`;`)
  await db.run(sql`DROP TABLE \`areas\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`hotels\`;`)
  await db.run(sql`DROP TABLE \`service_guide\`;`)
  await db.run(sql`DROP TABLE \`important_news\`;`)
  await db.run(sql`DROP TABLE \`ota_banners\`;`)
  await db.run(sql`DROP TABLE \`tickets\`;`)
  await db.run(sql`DROP TABLE \`jtb_banner\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
