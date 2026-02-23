CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contracts ADD COLUMN plan_id UUID REFERENCES plans(id);

-- Seeding Initial Plans
INSERT INTO plans (name, price, description, features, is_featured) VALUES
('Essentiel', 150.00, 'Pour démarrer votre activité.', '["Siège social à Casablanca", "Contrat 12 mois", "Réception courrier", "Notification Email"]', false),
('Premium', 250.00, 'La formule préférée.', '["Tout du pack Essentiel", "Scan courrier (PDF)", "Alertes WhatsApp", "Salle réunion (2h/mois)"]', true),
('Business', 400.00, 'Pour la croissance.', '["Tout du pack Premium", "Gestion appels", "Salle réunion (10h/mois)", "Support juridique"]', false),
