ALTER TABLE clients ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));
