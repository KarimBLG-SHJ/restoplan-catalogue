// Source unique du catalogue Restoplan (utilisé par index.html et services.html)
const CATS = [
  ["avant",   "Avant de m'engager",                          "Vérifier un local avant de signer un bail ou un achat."],
  ["plans",   "Mon local et mes plans",                      "Les bases dont dépendent tous les autres services."],
  ["mairie",  "Autorisations et mairie",                     "Les dossiers administratifs, y compris ceux qu'on oublie."],
  ["copro",   "Copropriété, propriétaire et voisins",        "Débloquer un projet freiné par un tiers."],
  ["normes",  "Normes, sécurité et accessibilité",           "Les points qui recalent à la commission de sécurité."],
  ["cuisine", "Cuisine et hygiène",                          "Du plan de cuisine au contrôle sanitaire."],
  ["chantier","Travaux et chantier",                         "Là où le restaurateur se fait le plus souvent avoir."],
  ["apres",   "Après les travaux et après un contrôle",      "Déclarer, lever des réserves, se mettre en règle."],
  ["special", "Belgique et formats spécifiques",             "Cas particuliers."],
  ["m2",      "Tarification au m² (mode alternatif, interne)","Pour ajuster les services « plans » selon la surface. Pas affiché au client."],
];

// b: "etude" = prix issu de l'étude ; "estim" = heures × taux. u: unité ("", "/h", "/m²"). t: tags.
const ITEMS = [
  // Avant de m'engager
  {c:"avant", n:"Je veux l'avis d'un architecte, sur place", d:"Un expert vient voir votre local et vous dit, sur place, ce qui est possible et ce qui coince. Comptez 2 h pour une première visite.", p:120, u:"/h", b:"etude", t:[]},
  {c:"avant", n:"Avant de signer : le bâtiment tient-il ?", d:"Audit structurel du local avant achat ou bail : murs, planchers, charges admissibles.", p:360, b:"etude", t:[]},
  {c:"avant", n:"Ai-je le droit d'ouvrir un restaurant ici ?", d:"Étude de faisabilité réglementaire et urbaine : PLU, destination du local, règles de la mairie.", p:1250, b:"etude", t:[]},
  {c:"avant", n:"Je reprends : qu'est-ce qui est aux normes, qu'est-ce qui ne l'est pas ?", d:"Diagnostic de conformité de l'existant : extraction, gaz, électricité, sécurité, accessibilité. Rapport avec priorités.", h:8, b:"estim", t:[]},

  // Mon local et mes plans
  {c:"plans", n:"Je n'ai pas les plans de mon local", d:"Relevé de l'existant (métré) et plans propres à l'échelle. Base indispensable à tous les autres services.", h:8, b:"estim", t:[]},
  {c:"plans", n:"Combien de personnes puis-je accueillir ?", d:"Calcul de l'effectif admissible et classement ERP (type, catégorie). Conditionne la sécurité, les sorties et l'assurance.", h:3, b:"estim", t:[]},
  {c:"plans", n:"Combien de couverts puis-je mettre ?", d:"Plan d'implantation de la salle : places assises, circulations, accès PMR, optimisation du nombre de couverts.", h:6, b:"estim", t:[]},
  {c:"plans", n:"Je veux voir mon futur restaurant avant de me lancer", d:"Esquisses et avant-projet sommaire : les premiers plans dessinés pour visualiser et valider la direction.", p:3000, b:"etude", t:[]},
  {c:"plans", n:"Il me faut une image de mon projet", d:"Perspective ou visuel 3D pour la banque, un investisseur, la mairie ou l'Architecte des Bâtiments de France.", h:8, b:"estim", t:[]},

  // Autorisations et mairie
  {c:"mairie", n:"Je veux changer ma devanture ou mon enseigne", d:"Dossier de déclaration préalable de travaux (DP) déposé à la mairie. Travaux visibles de l'extérieur, sans gros œuvre.", p:1500, b:"etude", t:["obl"]},
  {c:"mairie", n:"Il me faut un permis de construire", d:"Montage complet du dossier de permis de construire (PC) : création de surface, modification de structure, changement de destination avec travaux.", p:2550, b:"etude", t:["obl"]},
  {c:"mairie", n:"Je dois être autorisé à recevoir du public", d:"Dossier d'autorisation de travaux ERP (AT) avec notices de sécurité incendie et d'accessibilité. Obligatoire pour ouvrir au public.", p:3750, b:"etude", t:["obl"]},
  {c:"mairie", n:"Je veux une terrasse", d:"Plan d'aménagement de la terrasse et dossier d'autorisation d'occupation du domaine public (AOT) déposé à la mairie.", p:1000, b:"etude", t:["obl"]},
  {c:"mairie", n:"Mon local n'est pas classé restaurant", d:"Dossier de changement de destination du local (commerce vers restauration). Blocage n°1 des ouvertures en centre-ville.", h:10, b:"estim", t:["obl"]},
  {c:"mairie", n:"Je veux poser mon enseigne", d:"Demande d'autorisation d'enseigne selon le règlement local de publicité. Distinct de la devanture.", h:3, b:"estim", t:["obl"]},
  {c:"mairie", n:"Je veux un store-banne, une pergola ou une bâche", d:"Demande d'autorisation spécifique pour une installation en façade ou sur le domaine public.", h:3, b:"estim", t:["obl"]},
  {c:"mairie", n:"Je veux un chevalet, un étalage ou un panneau trottoir", d:"Demande d'occupation du domaine public hors terrasse.", h:2, b:"estim", t:["obl"]},
  {c:"mairie", n:"Mon local est en zone protégée (ABF, monument historique)", d:"Dossier pour l'Architecte des Bâtiments de France avec insertion paysagère. Évite le refus de la façade.", h:10, b:"estim", t:[]},
  {c:"mairie", n:"Ma salle est en sous-sol", d:"Demande de dérogation ERP pour l'exploitation d'un local ou d'une salle en sous-sol.", h:5, b:"estim", t:[]},

  // Copropriété, propriétaire et voisins
  {c:"copro", n:"Ma copropriété refuse mon conduit d'extraction", d:"Étude d'implantation du conduit (façade ou toiture, débouché, distances) et dossier technique pour l'assemblée générale.", h:8, b:"estim", t:[]},
  {c:"copro", n:"Mon propriétaire veut un dossier avant d'autoriser les travaux", d:"Dossier bailleur : plans et descriptif des travaux prévus.", h:5, b:"estim", t:[]},
  {c:"copro", n:"Je dois m'isoler du logement au-dessus ou du voisin", d:"Étude d'isolement coupe-feu et acoustique entre tiers.", h:6, b:"estim", t:[]},

  // Normes, sécurité et accessibilité
  {c:"normes", n:"J'ai une amende : mon restaurant n'est pas accessible aux PMR", d:"Diagnostic accessibilité et demande de dérogation si le local ne peut pas tout respecter.", p:750, b:"etude", t:["obl"]},
  {c:"normes", n:"La commission de sécurité exige un désenfumage", d:"Étude de désenfumage : évacuation des fumées en cas d'incendie.", p:1000, b:"etude", t:["obl"]},
  {c:"normes", n:"Mes voisins se plaignent du bruit", d:"Diagnostic acoustique et préconisations pour être en règle et éviter la fermeture.", p:2300, b:"etude", t:[]},
  {c:"normes", n:"Ai-je assez de sorties de secours ?", d:"Vérification des dégagements : nombre et largeur des sorties selon l'effectif.", h:3, b:"estim", t:["obl"]},
  {c:"normes", n:"Mes toilettes ne sont pas aux normes", d:"Mise en conformité des sanitaires clients : nombre de WC, WC accessible PMR.", h:4, b:"estim", t:["obl"]},
  {c:"normes", n:"Il me manque des vestiaires ou des WC pour le personnel", d:"Aménagement conforme au code du travail : vestiaires et sanitaires séparés.", h:4, b:"estim", t:["obl"]},
  {c:"normes", n:"Mes matériaux de décoration sont-ils autorisés ?", d:"Vérification de la réaction au feu des revêtements, plafonds et rideaux.", h:3, b:"estim", t:[]},
  {c:"normes", n:"Il me faut l'éclairage de sécurité et l'alarme", d:"Plan d'implantation de l'éclairage de sécurité (BAES) et de l'alarme incendie.", h:4, b:"estim", t:["obl","part"]},
  {c:"normes", n:"Ma salle manque d'air", d:"Ventilation et renouvellement d'air réglementaire de la salle, distinct de l'extraction cuisine.", h:5, b:"estim", t:[]},

  // Cuisine et hygiène
  {c:"cuisine", n:"Je veux concevoir ma cuisine professionnelle", d:"Plan technique complet de la cuisine sur-mesure : postes, flux, équipements, raccordements.", p:9000, b:"etude", t:[]},
  {c:"cuisine", n:"Ma hotte ou mon extraction n'est pas aux normes", d:"Dimensionnement de l'extraction et de la ventilation : fumées, odeurs, thermique.", p:1400, b:"etude", t:["obl"]},
  {c:"cuisine", n:"Je dois passer le contrôle d'hygiène", d:"Validation du plan d'hygiène et de la marche en avant (HACCP) par un consultant.", p:800, b:"etude", t:["obl"]},
  {c:"cuisine", n:"Je dois installer un bac à graisse", d:"Dimensionnement et implantation du séparateur à graisses exigé par l'assainissement. Fourniture non comprise.", h:4, b:"estim", t:["obl","part"]},
  {c:"cuisine", n:"Où mettre mes poubelles ?", d:"Aménagement d'un local déchets conforme.", h:3, b:"estim", t:[]},

  // Travaux et chantier
  {c:"chantier", n:"Je veux casser un mur", d:"Étude de structure pour ouvrir un mur porteur en sécurité : cuisine ouverte, agrandissement de la salle.", p:1625, b:"etude", t:[]},
  {c:"chantier", n:"Je veux agrandir ou faire une extension", d:"Étude de structure complète du projet.", p:2750, b:"etude", t:[]},
  {c:"chantier", n:"Je veux des devis comparables", d:"Descriptif de travaux simplifié à envoyer aux entreprises pour obtenir des devis sur la même base.", h:6, b:"estim", t:[]},
  {c:"chantier", n:"Mes devis sont-ils cohérents ?", d:"Analyse comparative des devis reçus : écarts, oublis, points à négocier.", h:3, b:"estim", t:[]},
  {c:"chantier", n:"Combien vont coûter mes travaux et combien de temps de fermeture ?", d:"Estimation budgétaire du chantier et planning prévisionnel.", h:5, b:"estim", t:[]},
  {c:"chantier", n:"Je veux qu'un professionnel vérifie mon chantier", d:"Visite de contrôle ponctuelle avec compte rendu. Prix par visite.", h:2, b:"estim", t:[]},
  {c:"chantier", n:"Mon chantier est fini : est-ce conforme à ce qui était prévu ?", d:"Réception des travaux et liste de réserves.", h:4, b:"estim", t:[]},
  {c:"chantier", n:"Je dois vérifier l'amiante et le plomb avant travaux", d:"Coordination du diagnostic amiante et plomb obligatoire avant travaux dans un bâtiment ancien. Coût du diagnostiqueur non compris.", h:2, b:"estim", t:["obl","part"]},

  // Après les travaux et après un contrôle
  {c:"apres", n:"La commission de sécurité passe", d:"Préparation du dossier et accompagnement le jour de la visite.", h:6, b:"estim", t:[]},
  {c:"apres", n:"La commission a émis des réserves", d:"Plan de levée de réserves.", h:4, b:"estim", t:[]},
  {c:"apres", n:"La DDPP m'a mis une non-conformité d'aménagement", d:"Plan correctif hygiène après contrôle.", h:5, b:"estim", t:[]},
  {c:"apres", n:"Mes travaux sont finis, je dois le déclarer", d:"Déclaration d'achèvement et de conformité des travaux (DAACT) et attestation d'accessibilité.", h:3, b:"estim", t:["obl"]},
  {c:"apres", n:"Je dois fournir mon registre d'accessibilité", d:"Constitution du registre public d'accessibilité, obligatoire pour tout ERP.", h:3, b:"estim", t:["obl"]},

  // Belgique et formats spécifiques
  {c:"special", n:"J'ouvre en Belgique", d:"Audit pour permis d'environnement et certificat PEB.", p:1750, b:"etude", t:["obl"]},
  {c:"special", n:"J'ouvre une dark kitchen ou un kiosque", d:"Autorisations spécifiques à ces formats.", h:6, b:"estim", t:[]},

  // Tarification au m²
  {c:"m2", n:"Conception commerciale et architecture d'intérieur", d:"Étude et réalisation des plans. Moyenne entre 50 et 90 €/m² ; les surfaces de moins de 50 m² sont facturées plus cher au m².", p:70, u:"/m²", b:"etude", t:[]},
  {c:"m2", n:"Plans techniques seuls", d:"Étude et réalisation des plans techniques.", p:65, u:"/m²", b:"etude", t:[]},
  {c:"m2", n:"Montage d'une demande de permis de construire au m²", d:"Alternative au forfait PC, facturée à la surface.", p:50, u:"/m²", b:"etude", t:[]},
];

