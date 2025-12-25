import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`translations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`path\` text,
  	\`key\` text,
  	\`ja\` text,
  	\`en\` text,
  	\`ko\` text,
  	\`cn\` text,
  	\`tw\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`translations_updated_at_idx\` ON \`translations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`translations_created_at_idx\` ON \`translations\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`translations_id\` integer REFERENCES translations(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_translations_id_idx\` ON \`payload_locked_documents_rels\` (\`translations_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`translations\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`articles_id\` integer,
  	\`pages_id\` integer,
  	\`products_id\` integer,
  	\`attractions_id\` integer,
  	\`restaurants_id\` integer,
  	\`spa_id\` integer,
  	\`areas_id\` integer,
  	\`partners_id\` integer,
  	\`hotels_id\` integer,
  	\`service_guide_id\` integer,
  	\`important_news_id\` integer,
  	\`ota_banners_id\` integer,
  	\`tickets_id\` text,
  	\`jtb_banner_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`attractions_id\`) REFERENCES \`attractions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`restaurants_id\`) REFERENCES \`restaurants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`spa_id\`) REFERENCES \`spa\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`areas_id\`) REFERENCES \`areas\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hotels_id\`) REFERENCES \`hotels\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`service_guide_id\`) REFERENCES \`service_guide\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`important_news_id\`) REFERENCES \`important_news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ota_banners_id\`) REFERENCES \`ota_banners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`jtb_banner_id\`) REFERENCES \`jtb_banner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "articles_id", "pages_id", "products_id", "attractions_id", "restaurants_id", "spa_id", "areas_id", "partners_id", "hotels_id", "service_guide_id", "important_news_id", "ota_banners_id", "tickets_id", "jtb_banner_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "articles_id", "pages_id", "products_id", "attractions_id", "restaurants_id", "spa_id", "areas_id", "partners_id", "hotels_id", "service_guide_id", "important_news_id", "ota_banners_id", "tickets_id", "jtb_banner_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
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
