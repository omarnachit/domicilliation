ALTER TABLE clients ADD COLUMN user_id UUID REFERENCES auth.users(id);
