INSERT INTO category (id, name) VALUES (1, 'chino');
INSERT INTO category (id, name) VALUES (2, 'jeans');

INSERT INTO product (id, name, price, category_id) VALUES (1, 'blue montain', 10, 1);
INSERT INTO product (id, name, price, category_id) VALUES (2, 'blue navy', 10, 1);
INSERT INTO product (id, name, price, category_id) VALUES (3, 'dark blue', 10, 2);
INSERT INTO product (id, name, price, category_id) VALUES (4, 'blue light', 10, 2);
INSERT INTO product (id, name, price, category_id) VALUES (5, 'blue and white', 10, 2);

INSERT INTO public.roles(id_user, role) VALUES (1, 'USER');
INSERT INTO public.roles(id_user, role) VALUES (2, 'USER');
INSERT INTO public.roles(id_user, role) VALUES (2, 'ADMIN');

INSERT INTO public.users(id_user, account_non_expired, account_non_locked, credentials_non_expired, enabled, firstname, lastname, password, username)
	(1,	true, true, true, true, "User", "USER", "user", "user");
INSERT INTO public.users(id_user, account_non_expired, account_non_locked, credentials_non_expired, enabled, firstname, lastname, password, username)
	(2,	true, true, true, true, "Admin", "ADMIN", "admin", "admin");

INSERT INTO customer (id, lastname, firstname, login, password) VALUES (1, 'john', 'doe', 'jdoe', 'azertyuiop');

INSERT INTO commande (id, purchase_date, customer_id) VALUES (1, null, 1);
