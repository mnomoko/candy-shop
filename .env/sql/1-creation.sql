DROP TABLE IF EXISTS computer;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS panier;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS commande;
DROP TABLE IF EXISTS commande_product;

CREATE SEQUENCE category_seq START WITH 44 INCREMENT BY 1;
CREATE TABLE category (
    id BIGINT DEFAULT NEXTVAL('category_seq'),
    name VARCHAR(255),
    CONSTRAINT PK_CATEGORY PRIMARY KEY (id)
);

CREATE SEQUENCE product_seq START WITH 44 INCREMENT BY 1;
CREATE TABLE product (
    id BIGINT DEFAULT NEXTVAL('product_seq'),
    name VARCHAR(255),
    price NUMERIC,
    category_id BIGINT NOT NULL,
    CONSTRAINT PK_PRODUCT PRIMARY KEY (id)
);

-- CREATE SEQUENCE panier_seq START WITH 44 INCREMENT BY 1;
-- CREATE TABLE panier (
--     id BIGINT DEFAULT NEXTVAL('panier_seq') PRIMARY KEY,
--     product INTEGER,
--     quantity INTEGER,
--     CONSTRAINT PK_PANIER PRIMARY KEY (id)
-- );

CREATE SEQUENCE customer_seq START WITH 44 INCREMENT BY 1;
CREATE TABLE customer (
    id BIGINT DEFAULT NEXTVAL('customer_seq'),
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT PK_CUSTOMER PRIMARY KEY (id)
);

CREATE SEQUENCE commande_seq START WITH 44 INCREMENT BY 1;
CREATE TABLE commande (
    id BIGINT DEFAULT NEXTVAL('commande_seq'),
    purchase_date TIMESTAMP NULL,
    customer_id BIGINT NOT NULL,
    CONSTRAINT PK_COMMANDE PRIMARY KEY (id)
);

-- CREATE SEQUENCE commande_product_seq START WITH 44 INCREMENT BY 1;
-- CREATE TABLE commande_product (
--     id BIGINT DEFAULT NEXTVAL('commande_product_seq') PRIMARY KEY,
--     commande_id BIGINT,
--     product_id BIGINT,
--     quantity INTEGER,
--     CONSTRAINT PK_COMMANDE_PRODUCT PRIMARY KEY (id)
-- );

CREATE TABLE public.roles
(
    id_user bigint NOT NULL,
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fk_role_user FOREIGN KEY (id_user)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE users
(
    id bigint NOT NULL,
    account_non_expired boolean,
    account_non_locked boolean,
    credentials_non_expired boolean,
    enabled boolean,
    firstname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk_username_users UNIQUE (username)

)

alter table product add constraint fk_product_category_1 foreign key (category_id) references category (id) on delete restrict on update restrict;
alter table commande add constraint fk_commande_customer_1 foreign key (customer_id) references customer (id) on delete restrict on update restrict;

create index ix_product_category_1 on product (category_id);
create index ix_commande_customer_1 on commande (customer_id);
