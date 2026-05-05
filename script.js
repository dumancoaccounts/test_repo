const cartCount = document.querySelector("#cart-count");
const message = document.querySelector("#form-message");
const signupForm = document.querySelector("#signup-form");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const themeSelect = document.querySelector("#theme-select");
const languageSelect = document.querySelector("#language-select");

const themeStorageKey = "northstar-theme";
const defaultTheme = "dune";
const availableThemes = new Set(["dune", "nightfall", "harbor", "grove"]);

let cartItems = 0;
let currentLanguage = "en";

const translations = {
  en: {
    "nav.languageLabel": "Language",
    "nav.cart": "Cart",
    "nav.cartAria": "Cart items",
    "nav.collection": "Collection",
    "nav.story": "Story",
    "nav.journal": "Journal",
    "hero.eyebrow": "Field-tested essentials for city weekends",
    "hero.title": "Functional gear with a calmer point of view.",
    "hero.text": "Shop a tight edit of travel bags, outerwear, and everyday carry pieces designed to move from subway rush to coastal reset.",
    "hero.primaryAction": "Shop the drop",
    "hero.secondaryAction": "Why Northstar",
    "hero.metricsAria": "Store metrics",
    "hero.metricDispatch": "dispatch on all ready-to-ship orders",
    "hero.metricRating": "average rating from repeat customers",
    "hero.metricMembers": "members in the early-access list",
    "showcase.drop": "Drop 04",
    "showcase.packDetails": "Weather-sealed zips, 20L storage, laptop sleeve",
    "showcase.bestSeller": "Best seller",
    "showcase.shellDetails": "Storm cuff finish with lightweight thermal lining",
    "collection.eyebrow": "Featured collection",
    "collection.title": "Built for motion, edited for simplicity.",
    "collection.text": "Four core pieces, one quiet palette, and enough utility to carry a full weekend.",
    "products.pack.tag": "Transit",
    "products.pack.description": "Waxed cotton shell, padded laptop sleeve, modular bottle pocket.",
    "products.shell.tag": "Outerwear",
    "products.shell.description": "Windproof ripstop layer with packable hood and sealed seams.",
    "products.duffel.tag": "Travel",
    "products.duffel.description": "Structured base, shoe compartment, and detachable shoulder strap.",
    "products.bottle.tag": "Everyday carry",
    "products.bottle.description": "Powder-coated steel with twist-lock cap and all-day insulation.",
    "story.eyebrow": "Why it works",
    "story.title": "Less clutter. Better materials. Clearer decisions.",
    "story.text": "Northstar trims the catalog to a compact seasonal system. That means tighter quality control, fewer disposable trends, and combinations that actually work together.",
    "story.materialTitle": "Material-first development",
    "story.materialText": "We start with abrasion testing, waterproofing, and long-hold color before silhouette.",
    "story.repairTitle": "Repair-friendly construction",
    "story.repairText": "Replaceable pulls, reinforced stress seams, and accessible hardware across the line.",
    "story.inventoryTitle": "Measured inventory",
    "story.inventoryText": "Smaller drops reduce waste and keep the product cycle disciplined.",
    "journal.eyebrow": "Customer note",
    "journal.quote": "“The pack looks clean enough for work, but still survives actual travel. That balance is rare.”",
    "journal.customer": "Selin A., repeat customer",
    "signup.eyebrow": "Early access list",
    "signup.title": "Get first look at the next drop.",
    "signup.emailLabel": "Email address",
    "signup.emailPlaceholder": "Email address",
    "signup.submit": "Join the list",
    "actions.addToCart": "Add to cart",
    "actions.added": "Added",
    "form.thanks": "Thanks, {email}. You're on the list for Drop 05."
  },
  tr: {
    "nav.languageLabel": "Dil",
    "nav.cart": "Sepet",
    "nav.cartAria": "Sepetteki ürünler",
    "nav.collection": "Koleksiyon",
    "nav.story": "Hikaye",
    "nav.journal": "Günlük",
    "hero.eyebrow": "Şehir hafta sonları için sahada test edilmiş temel parçalar",
    "hero.title": "Daha sakin bir bakışla işlevsel ekipman.",
    "hero.text": "Metro telaşından sahil molasına uzanan yolculuklar için tasarlanmış seyahat çantaları, dış giyim ve günlük taşıma parçalarından oluşan özenli bir seçki.",
    "hero.primaryAction": "Yeni seçkiyi incele",
    "hero.secondaryAction": "Neden Northstar",
    "hero.metricsAria": "Mağaza ölçümleri",
    "hero.metricDispatch": "gönderime hazır tüm siparişlerde sevkiyat",
    "hero.metricRating": "tekrar alışveriş yapan müşterilerden ortalama puan",
    "hero.metricMembers": "erken erişim listesinde üye",
    "showcase.drop": "Drop 04",
    "showcase.packDetails": "Hava koşullarına dayanıklı fermuarlar, 20L hacim, laptop bölmesi",
    "showcase.bestSeller": "Çok satan",
    "showcase.shellDetails": "Hafif termal astarlı fırtına manşeti bitişi",
    "collection.eyebrow": "Öne çıkan koleksiyon",
    "collection.title": "Hareket için üretildi, sadelik için düzenlendi.",
    "collection.text": "Dört temel parça, sakin bir palet ve tüm hafta sonunu taşıyacak kadar işlev.",
    "products.pack.tag": "Transit",
    "products.pack.description": "Mumlu pamuk dış yüzey, dolgulu laptop bölmesi, modüler şişe cebi.",
    "products.shell.tag": "Dış giyim",
    "products.shell.description": "Toplanabilir kapüşonlu ve dikişleri yalıtılmış rüzgar geçirmez ripstop katman.",
    "products.duffel.tag": "Seyahat",
    "products.duffel.description": "Yapılı taban, ayakkabı bölmesi ve çıkarılabilir omuz askısı.",
    "products.bottle.tag": "Günlük taşıma",
    "products.bottle.description": "Çevirmeli kilit kapağı ve gün boyu yalıtımı olan toz boyalı çelik.",
    "story.eyebrow": "Neden işe yarıyor",
    "story.title": "Daha az kalabalık. Daha iyi malzemeler. Daha net kararlar.",
    "story.text": "Northstar kataloğu kompakt bir sezonluk sisteme indirir. Bu da daha sıkı kalite kontrol, daha az geçici trend ve gerçekten birlikte çalışan kombinasyonlar demektir.",
    "story.materialTitle": "Malzeme öncelikli geliştirme",
    "story.materialText": "Siluetten önce aşınma testi, su geçirmezlik ve uzun ömürlü renkle başlarız.",
    "story.repairTitle": "Onarım dostu yapı",
    "story.repairText": "Tüm seride değiştirilebilir çekme uçları, güçlendirilmiş yük dikişleri ve erişilebilir donanım.",
    "story.inventoryTitle": "Ölçülü stok",
    "story.inventoryText": "Daha küçük seçkiler atığı azaltır ve ürün döngüsünü disiplinli tutar.",
    "journal.eyebrow": "Müşteri notu",
    "journal.quote": "“Çanta iş için yeterince sade görünüyor ama gerçek yolculuğa da dayanıyor. Bu denge nadir.”",
    "journal.customer": "Selin A., tekrar alışveriş yapan müşteri",
    "signup.eyebrow": "Erken erişim listesi",
    "signup.title": "Bir sonraki seçkiye ilk bakanlardan ol.",
    "signup.emailLabel": "E-posta adresi",
    "signup.emailPlaceholder": "E-posta adresi",
    "signup.submit": "Listeye katıl",
    "actions.addToCart": "Sepete ekle",
    "actions.added": "Eklendi",
    "form.thanks": "Teşekkürler, {email}. Drop 05 için listedesin."
  },
  fr: {
    "nav.languageLabel": "Langue",
    "nav.cart": "Panier",
    "nav.cartAria": "Articles du panier",
    "nav.collection": "Collection",
    "nav.story": "Histoire",
    "nav.journal": "Journal",
    "hero.eyebrow": "Essentiels testés sur le terrain pour les week-ends en ville",
    "hero.title": "Des équipements fonctionnels au point de vue plus calme.",
    "hero.text": "Découvrez une sélection resserrée de sacs de voyage, de vêtements d'extérieur et de pièces du quotidien conçues pour passer du métro pressé à l'échappée côtière.",
    "hero.primaryAction": "Voir le drop",
    "hero.secondaryAction": "Pourquoi Northstar",
    "hero.metricsAria": "Indicateurs de la boutique",
    "hero.metricDispatch": "expédition pour toutes les commandes prêtes à partir",
    "hero.metricRating": "note moyenne des clients fidèles",
    "hero.metricMembers": "membres sur la liste d'accès anticipé",
    "showcase.drop": "Drop 04",
    "showcase.packDetails": "Zips étanches, volume 20L, compartiment ordinateur",
    "showcase.bestSeller": "Meilleure vente",
    "showcase.shellDetails": "Poignets tempête avec doublure thermique légère",
    "collection.eyebrow": "Collection en vedette",
    "collection.title": "Conçue pour le mouvement, pensée pour la simplicité.",
    "collection.text": "Quatre pièces clés, une palette discrète et assez d'utilité pour tout un week-end.",
    "products.pack.tag": "Transit",
    "products.pack.description": "Extérieur en coton ciré, compartiment ordinateur matelassé, poche bouteille modulaire.",
    "products.shell.tag": "Vêtements d'extérieur",
    "products.shell.description": "Couche ripstop coupe-vent avec capuche compacte et coutures étanchées.",
    "products.duffel.tag": "Voyage",
    "products.duffel.description": "Base structurée, compartiment chaussures et bandoulière amovible.",
    "products.bottle.tag": "Port quotidien",
    "products.bottle.description": "Acier thermolaqué avec bouchon à verrouillage rotatif et isolation toute la journée.",
    "story.eyebrow": "Pourquoi ça marche",
    "story.title": "Moins d'encombrement. De meilleurs matériaux. Des choix plus clairs.",
    "story.text": "Northstar réduit le catalogue à un système saisonnier compact. Cela signifie un contrôle qualité plus strict, moins de tendances jetables et des combinaisons qui fonctionnent vraiment ensemble.",
    "story.materialTitle": "Développement axé sur les matières",
    "story.materialText": "Nous commençons par les tests d'abrasion, l'imperméabilité et la tenue des couleurs avant la silhouette.",
    "story.repairTitle": "Construction facile à réparer",
    "story.repairText": "Tirettes remplaçables, coutures renforcées et composants accessibles sur toute la ligne.",
    "story.inventoryTitle": "Stocks mesurés",
    "story.inventoryText": "Des drops plus petits réduisent le gaspillage et gardent le cycle produit discipliné.",
    "journal.eyebrow": "Note client",
    "journal.quote": "« Le sac est assez sobre pour le travail, mais résiste aussi aux vrais voyages. Cet équilibre est rare. »",
    "journal.customer": "Selin A., cliente fidèle",
    "signup.eyebrow": "Liste d'accès anticipé",
    "signup.title": "Soyez parmi les premiers à voir le prochain drop.",
    "signup.emailLabel": "Adresse e-mail",
    "signup.emailPlaceholder": "Adresse e-mail",
    "signup.submit": "Rejoindre la liste",
    "actions.addToCart": "Ajouter au panier",
    "actions.added": "Ajouté",
    "form.thanks": "Merci, {email}. Vous êtes sur la liste pour le Drop 05."
  }
};

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  document.documentElement.lang = currentLanguage;

  for (const element of document.querySelectorAll("[data-i18n]")) {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  }

  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = t(key);
  }

  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", t(key));
  }

  for (const button of addToCartButtons) {
    button.textContent = button.disabled ? t("actions.added") : t("actions.addToCart");
  }

  if (languageSelect.value !== currentLanguage) {
    languageSelect.value = currentLanguage;
  }
}

const applyTheme = (themeName) => {
  document.body.dataset.theme = themeName;

  if (themeSelect.value !== themeName) {
    themeSelect.value = themeName;
  }
};

const storedTheme = localStorage.getItem(themeStorageKey);
const initialTheme = availableThemes.has(storedTheme) ? storedTheme : defaultTheme;

applyTheme(initialTheme);

for (const button of addToCartButtons) {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    button.textContent = t("actions.added");
    button.disabled = true;
  });
}

themeSelect.addEventListener("change", (event) => {
  const selectedTheme = event.target.value;

  if (!availableThemes.has(selectedTheme)) {
    return;
  }

  applyTheme(selectedTheme);
  localStorage.setItem(themeStorageKey, selectedTheme);
});


languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get("email");

  message.textContent = t("form.thanks").replace("{email}", email);
  signupForm.reset();
});

applyLanguage(currentLanguage);
