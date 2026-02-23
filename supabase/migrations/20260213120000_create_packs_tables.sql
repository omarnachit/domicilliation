-- Create packs table
CREATE TABLE packs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  period TEXT,
  popular BOOLEAN DEFAULT false,
  cta TEXT NOT NULL,
  discount TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pack_features table
CREATE TABLE pack_features (
  id BIGSERIAL PRIMARY KEY,
  pack_id BIGINT NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  included BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pack_comparison_categories table
CREATE TABLE pack_comparison_categories (
  id BIGSERIAL PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pack_comparison_features table
CREATE TABLE pack_comparison_features (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES pack_comparison_categories(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  pack_basique BOOLEAN DEFAULT false,
  pack_gestion BOOLEAN DEFAULT false,
  pack_creation BOOLEAN DEFAULT false,
  pack_formalites BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pack_faqs table
CREATE TABLE pack_faqs (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_pack_features_pack_id ON pack_features(pack_id);
CREATE INDEX idx_comparison_features_category_id ON pack_comparison_features(category_id);
CREATE INDEX idx_faqs_category ON pack_faqs(category);

-- Insert packs data
INSERT INTO packs (title, description, price, period, popular, cta, discount) VALUES
('Adresse Basique', 'Siège social prestige avec accès numérique basique', '2 000 - 4 000', NULL, false, 'Démarrer', NULL),
('Adresse + Gestion', 'Portail client complet avec gestion intelligente du courrier', '+2 000', 'an', true, 'Choisir ce pack', '-25% salles & bureaux'),
('Création Société', 'Services de création + gestion administrative', '5 000 - 10 000', 'prestation', false, 'Demander un devis', '-25% salles & bureaux'),
('Formalités + Expertise', 'Gestion administrative, comptable et services avancés', 'À partir de 500 MAD/mois', 'mois', false, 'Nous contacter', '-25% salles & bureaux');

-- Insert pack features
-- Adresse Basique
INSERT INTO pack_features (pack_id, name, included) VALUES
(1, 'Siège social prestige (Casablanca/Marrakech/Fès/Rabat)', true),
(1, 'Scans quotidiens du courrier', true),
(1, 'Accès portail client 24/7', true),
(1, 'Stockage sécurisé 30 jours', true),
(1, 'Notifications Email', true),
(1, 'Accès physique 6j/7 (8h30-18h30)', false),
(1, 'OCR & Recherche full-text', false),
(1, 'Notifications SMS/WhatsApp', false),
(1, 'Réexpédition mensuelle', false),
(1, 'Tri automatique par catégorie', false);

-- Adresse + Gestion
INSERT INTO pack_features (pack_id, name, included) VALUES
(2, 'Siège social prestige', true),
(2, 'Scans quotidiens & tri automatique (Fiscal/Recommandé/Commercial)', true),
(2, 'Historique infini (rétention légale 5 ans)', true),
(2, 'OCR & Recherche full-text par document', true),
(2, 'Notifications Email + SMS + WhatsApp personnalisables', true),
(2, 'Digest quotidien/hebdomadaire configurable', true),
(2, 'Téléchargement sécurisé (chiffrement AES-256)', true),
(2, 'Réexpédition mensuelle ou à la demande (Maroc/International)', true),
(2, 'Accès physique 6j/7 avec retrait par QR code', true),
(2, 'Gestion des personnes autorisées', true),
(2, 'Réception colis avec photos et suivi', true),
(2, 'Support prioritaire par email/chat', true);

-- Création Société
INSERT INTO pack_features (pack_id, name, included) VALUES
(3, 'Adresse + Gestion inclus', true),
(3, 'Certificat négatif & rédaction statuts', true),
(3, 'Immatriculation complète RC/IF/CNSS/ICE', true),
(3, 'Publication Bulletin Officiel (500-1 500 MAD)', true),
(3, 'Traitement 7-14 jours', true),
(3, 'Déclarations TVA/IR mensuels ou trimestriels', true),
(3, 'Déclarations IS annuel', true),
(3, 'Rappels d''échéances (15/30/60 jours)', true),
(3, 'Télédéclarations automatiques', true),
(3, 'Support prioritaire par téléphone', true);

-- Formalités + Expertise
INSERT INTO pack_features (pack_id, name, included) VALUES
(4, 'Tous les services Création Société', true),
(4, 'Gestion comptable complète (saisie pièces, paie)', true),
(4, 'Rapprochements bancaires mensuels', true),
(4, 'Liasses fiscales automatiques', true),
(4, 'États financiers (Bilan/CPC/Trésorerie)', true),
(4, 'Modifications statuts, transfert siège, cession parts', true),
(4, 'Gestion CNSS/DAMANCOM', true),
(4, 'Annexes : Cachet (200-500 MAD), Marque OMPIC (2-4K MAD)', true),
(4, 'Site web vitrine (3-8K) ou e-commerce (10-25K)', true),
(4, 'Support 24/7 + Consultant dédié', true);

-- Insert comparison categories
INSERT INTO pack_comparison_categories (category_name, sort_order) VALUES
('Siège Social & Courrier', 1),
('Portail Client Avancé', 2),
('Notifications & Alertes', 3),
('Réexpédition & Colis', 4),
('Accès Physique', 5),
('Services Juridiques & Création', 6),
('Déclarations Fiscales & Paie', 7),
('Gestion Comptable', 8),
('Services Additionnels', 9),
('Espaces de Travail', 10),
('Support Client', 11);

-- Insert comparison features
-- Category 1: Siège Social & Courrier
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Siège Social & Courrier'), 'Siège social prestige (4 villes)', true, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Siège Social & Courrier'), 'Scans quotidiens du courrier', true, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Siège Social & Courrier'), 'Accès portail 24/7', true, true, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Siège Social & Courrier'), 'Tri automatique par catégorie', false, true, true, true, 4),
((SELECT id FROM pack_comparison_categories WHERE category_name='Siège Social & Courrier'), 'Historique 5 ans illimité', false, true, true, true, 5);

-- Category 2: Portail Client Avancé
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Portail Client Avancé'), 'OCR & Recherche full-text', false, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Portail Client Avancé'), 'Téléchargement sécurisé AES-256', false, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Portail Client Avancé'), 'Archives mensuelles (ZIP)', false, true, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Portail Client Avancé'), 'Stockage rétention légale 5 ans', false, true, true, true, 4);

-- Category 3: Notifications & Alertes
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Notifications & Alertes'), 'Notifications Email', true, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Notifications & Alertes'), 'SMS/WhatsApp illimités', false, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Notifications & Alertes'), 'Alertes prioritaires (Fiscal/Recommandé)', false, true, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Notifications & Alertes'), 'Digest quotidien/hebdomadaire', false, true, true, true, 4);

-- Category 4: Réexpédition & Colis
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Réexpédition & Colis'), 'Réexpédition mensuelle/à la demande', false, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Réexpédition & Colis'), 'Destinations Maroc & International', false, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Réexpédition & Colis'), 'Numéros de suivi pour envois', false, true, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Réexpédition & Colis'), 'Gestion colis avec photos', false, true, true, true, 4);

-- Category 5: Accès Physique
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Accès Physique'), 'Accès 6j/7 (8h30-18h30)', false, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Accès Physique'), 'Retrait par QR code', false, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Accès Physique'), 'Gestion personnes autorisées', false, true, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Accès Physique'), 'Registre visiteurs & signatures', false, true, true, true, 4);

-- Category 6: Services Juridiques & Création
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Juridiques & Création'), 'Certificat négatif & Statuts', false, false, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Juridiques & Création'), 'Immatriculation RC/IF/CNSS/ICE', false, false, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Juridiques & Création'), 'Publication Bulletin Officiel', false, false, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Juridiques & Création'), 'Modifications statuts/Cession/Transfert', false, false, false, true, 4);

-- Category 7: Déclarations Fiscales & Paie
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Déclarations Fiscales & Paie'), 'TVA/IR mensuels ou trimestriels', false, false, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Déclarations Fiscales & Paie'), 'Déclarations IS annuel', false, false, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Déclarations Fiscales & Paie'), 'Gestion CNSS/DAMANCOM', false, false, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Déclarations Fiscales & Paie'), 'Télédéclarations automatiques', false, false, true, true, 4);

-- Category 8: Gestion Comptable
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Gestion Comptable'), 'Saisie pièces comptables', false, false, false, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Gestion Comptable'), 'Rapprochements bancaires', false, false, false, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Gestion Comptable'), 'Gestion paie & CNSS', false, false, false, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Gestion Comptable'), 'États financiers (Bilan/CPC)', false, false, false, true, 4);

-- Category 9: Services Additionnels
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Additionnels'), 'Cachet entreprise (200-500 MAD)', false, false, false, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Additionnels'), 'Dépôt marque OMPIC (2-4K MAD)', false, false, false, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Additionnels'), 'Site web vitrine (3-8K MAD)', false, false, false, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Services Additionnels'), 'Site e-commerce (10-25K MAD)', false, false, false, true, 4);

-- Category 10: Espaces de Travail
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Espaces de Travail'), 'Réduction -25% salles réunion', true, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Espaces de Travail'), 'Réduction -25% bureaux privatifs', true, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Espaces de Travail'), 'Réduction -25% espaces partagés', true, true, true, true, 3);

-- Category 11: Support Client
INSERT INTO pack_comparison_features (category_id, feature_name, pack_basique, pack_gestion, pack_creation, pack_formalites, sort_order) VALUES
((SELECT id FROM pack_comparison_categories WHERE category_name='Support Client'), 'Support Email', true, true, true, true, 1),
((SELECT id FROM pack_comparison_categories WHERE category_name='Support Client'), 'Support Chat', false, true, true, true, 2),
((SELECT id FROM pack_comparison_categories WHERE category_name='Support Client'), 'Support Téléphone', false, false, true, true, 3),
((SELECT id FROM pack_comparison_categories WHERE category_name='Support Client'), 'Support 24/7 + Consultant', false, false, false, true, 4);

-- Insert FAQs
INSERT INTO pack_faqs (category, question, answer, sort_order) VALUES
('Portail Client & Courrier', 'Comment fonctionne le portail client 24/7?', 'Le portail client vous donne accès 24h/24 à tous vos documents numérisés. Vous pouvez consulter, télécharger et gérer votre courrier depuis n''importe où. Chaque document est sécurisé avec un chiffrement AES-256.', 1),
('Portail Client & Courrier', 'Qu''est-ce que l''OCR et la recherche full-text?', 'L''OCR (Reconnaissance Optique de Caractères) analyse le contenu de vos documents scannés. Cela vous permet de rechercher des mots-clés spécifiques dans tous vos documents historiques, même ceux datant d''années. Par exemple, recherchez "impôt" pour trouver tous les documents fiscaux.', 2),
('Portail Client & Courrier', 'Combien de temps mes documents sont-ils archivés?', 'Tous les documents sont archivés pendant 5 ans minimum, conformément à la réglementation légale marocaine. Vous pouvez accéder à tout l''historique via le portail à tout moment.', 3),
('Notifications & Alertes', 'Quels types de notifications puis-je recevoir?', 'Vous pouvez recevoir des notifications par Email, SMS et WhatsApp à chaque arrivée de courrier ou colis. Les packs Gestion et supérieurs permettent de configurer des alertes prioritaires pour les courriers fiscaux et recommandés, et de choisir un digest quotidien/hebdomadaire.', 1),
('Notifications & Alertes', 'Puis-je personnaliser mes préférences de notifications?', 'Absolument! Dans le pack Adresse + Gestion, vous pouvez personnaliser les notifications par catégorie de courrier (Fiscal, Recommandé, Commercial, Administratif), choisir les canaux (Email/SMS/WhatsApp), et configurer un digest quotidien ou hebdomadaire selon vos préférences.', 2),
('Réexpédition & Accès Physique', 'Comment fonctionne la réexpédition?', 'La réexpédition mensuelle redistribue votre courrier à l''adresse de votre choix au Maroc ou à l''international. Vous pouvez aussi demander une réexpédition à la demande. Tous les envois incluent un numéro de suivi. L''affranchissement peut être à votre charge ou prépayé.', 1),
('Réexpédition & Accès Physique', 'Puis-je accéder physiquement aux locaux?', 'Oui, les clients du pack Adresse + Gestion et supérieurs ont accès aux locaux 6 jours par semaine de 8h30 à 18h30. Vous pouvez retirer votre courrier via un système de QR code sécurisé, avec des créneaux horaires disponibles. Un registre visiteurs est maintenu à titre de sécurité.', 2),
('Création Société', 'Quels documents sont fournis pour la création?', 'Le pack Création Société inclut : Certificat négatif, Statuts signés, Immatriculation au Registre de Commerce (RC), Inscription à l''administration fiscale (IF), Affiliation à la CNSS, Obtention du numéro ICE, et Publication au Bulletin Officiel. Délai : 7-14 jours.', 1),
('Création Société', 'Quels sont les coûts additionnels pour la création?', 'Le prix du pack couvre les services de création. Les coûts officiels (droits RC, impôts, etc.) sont inclus. Le seul coût additionnel optionnel est la publication au Bulletin Officiel (500-1 500 MAD).', 2),
('Services Comptables & Fiscaux', 'Comment fonctionne la gestion comptable?', 'Le pack Formalités + Expertise inclut la saisie de vos pièces comptables, les rapprochements bancaires mensuels, la génération automatique de liasses fiscales, et les états financiers (Bilan, CPC, Trésorerie). Votre consultant dédié vous guide dans tout le processus.', 1),
('Services Comptables & Fiscaux', 'Quand dois-je déclarer mes impôts?', 'Le pack Création Société inclut les déclarations TVA/IR (mensuelles ou trimestriques) et l''IS annuel. Le pack Formalités + Expertise gère les télédéclarations automatiques. Vous recevrez des rappels d''échéances 15, 30 et 60 jours avant.', 2),
('Services Additionnels', 'Quels services additionnels sont disponibles?', 'Le pack Formalités + Expertise propose : Cachet entreprise (200-500 MAD), Dépôt de marque OMPIC (2-4K MAD), Site web vitrine (3-8K MAD), Site e-commerce (10-25K MAD). Chaque service peut être commandé indépendamment.', 1),
('Support & Avantages', 'Comment bénéficier de la réduction -25% sur les espaces?', 'Tous nos clients bénéficient automatiquement de -25% sur les salles de réunion, bureaux privatifs et espaces partagés. Vous recevrez un code de réduction automatiquement lors de votre inscription.', 1),
('Support & Avantages', 'Quel niveau de support est inclus?', 'Adresse Basique : Support email. Adresse + Gestion : Chat prioritaire. Création Société : Téléphone. Formalités + Expertise : Support 24/7 + Consultant dédié. Tous les clients ont accès à une base de connaissances complète.', 2),
('Modifications & Upgrades', 'Puis-je changer de pack ou résilier?', 'Oui, vous pouvez upgrader ou downgrader à tout moment. Les modifications prennent effet le mois suivant avec ajustement de votre facture. La résiliation est possible sans pénalité.', 1);
