import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'
import { t } from '../helper/lang.js'

dotenv.config()

const groupedProducts = [
  {
    title: t(
      'Pepper',
      'Poivre',
      'Pfeffer',
      'Pimienta',
      'Peperoncino',
      'Pimenta',
      'فلفل',
      '辣椒',
      'Перец',
      'Biber'
    ),

    image: '/images/products/pepper.jpg',

    descriptions: t(
      'Export-grade peppers sourced from Nigerian farms.',
      'Poivrons de qualité export provenant de fermes nigérianes.',
      'Exportfähige Paprika aus nigerianischen Farmen.',
      'Pimientos de calidad exportación de Nigeria.',
      'Peperoncini di qualità export dalla Nigeria.',
      'Pimentas de qualidade para exportação da Nigéria.',
      'فلفل عالي الجودة للتصدير من نيجيريا.',
      '来自尼日利亚农场的出口级辣椒。',
      'Экспортный перец из Нигерии.',
      'Nijerya çiftliklerinden ihraç kalitesinde biber.'
    ),

    packaging: t(
      '25kg sacks',
      'Sacs de 25 kg',
      '25-kg-Säcke',
      'Sacos de 25 kg',
      'Sacchi da 25 kg',
      'Sacos de 25 kg',
      'أكياس 25 كجم',
      '25公斤袋',
      'Мешки по 25 кг',
      '25 kg çuvallar'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 / 40 футов',
      '20ft / 40ft'
    ),

    seasons: [
      'November - March'
    ],

    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Red Pepper',
          'Poivron Rouge',
          'Rote Paprika',
          'Pimiento Rojo',
          'Peperoncino Rosso',
          'Pimenta Vermelha',
          'فلفل أحمر',
          '红辣椒',
          'Красный перец',
          'Kırmızı Biber'
        ),
        image: '/images/products/red-pepper.jpg',
        minimumOrder: 2000,
        maximumOrder: 20000
      },

      {
        name: t(
          'Yellow Pepper',
          'Poivron Jaune',
          'Gelbe Paprika',
          'Pimiento Amarillo',
          'Peperoncino Giallo',
          'Pimenta Amarela',
          'فلفل أصفر',
          '黄辣椒',
          'Жёлтый перец',
          'Sarı Biber'
        ),
        image: '/images/products/yellow-pepper.jpg',
        minimumOrder: 1500,
        maximumOrder: 15000
      }
    ]
  },

  {
    title: t(
      'Hibiscus Flower',
      'Fleur d’Hibiscus',
      'Hibiskusblüte',
      'Flor de Hibisco',
      'Fiore di Ibisco',
      'Flor de Hibisco',
      'زهرة الكركديه',
      '木槿花',
      'Цветок гибискуса',
      'Hibiskus Çiçeği'
    ),

    image: '/images/products/hibiscus.jpg',

    descriptions: t(
      'Premium sun-dried hibiscus flowers for beverages.',
      'Fleurs d’hibiscus séchées au soleil de qualité premium pour boissons.',
      'Hochwertige sonnengetrocknete Hibiskusblüten für Getränke.',
      'Flores de hibisco secadas al sol de alta calidad para bebidas.',
      'Fiori di ibisco essiccati al sole di qualità premium per bevande.',
      'Flores de hibisco secas ao sol de qualidade premium para bebidas.',
      'زهور كركديه مجففة بالشمس عالية الجودة للمشروبات.',
      '优质日晒干燥木槿花，用于饮品。',
      'Премиальные сушёные на солнце цветы гибискуса для напитков.',
      'İçecekler için premium güneşte kurutulmuş hibiskus çiçekleri.'
    ),

    packaging: t(
      '25kg polypropylene bags',
      'Sacs en polypropylène de 25 kg',
      '25-kg-Polypropylensäcke',
      'Sacos de polipropileno de 25 kg',
      'Sacchi in polipropilene da 25 kg',
      'Sacos de polipropileno de 25 kg',
      'أكياس بولي بروبيلين 25 كجم',
      '25公斤聚丙烯袋',
      'Полипропиленовые мешки по 25 кг',
      '25 kg polipropilen çuvallar'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 / 40 футов',
      '20ft / 40ft'
    ),

    seasons: [
      'January - March',
      'July - October'
    ],

    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Whole Flower',
          'Fleur Entière',
          'Ganze Blüte',
          'Flor Entera',
          'Fiore Intero',
          'Flor Inteira',
          'زهرة كاملة',
          '整花',
          'Целый цветок',
          'Bütün Çiçek'
        ),
        image: '/images/products/hibiscus-whole.jpg',
        minimumOrder: 1000,
        maximumOrder: 20000
      },

      {
        name: t(
          'Cut Flower',
          'Fleur Coupée',
          'Geschnittene Blüte',
          'Flor Cortada',
          'Fiore Tagliato',
          'Flor Cortada',
          'زهرة مقطعة',
          '切花',
          'Нарезанный цветок',
          'Kesilmiş Çiçek'
        ),
        image: '/images/products/hibiscus-cut.jpg',
        minimumOrder: 1500,
        maximumOrder: 25000
      }
    ]
  },


  {
    title: t(
      'Ginger',
      'Gingembre',
      'Ingwer',
      'Jengibre',
      'Zenzero',
      'Gengibre',
      'زنجبيل',
      '姜',
      'Имбирь',
      'Zencefil'
    ),

    image: '/images/products/ginger.jpg',

    descriptions: t(
      'Naturally dried ginger suitable for export.',
      'Gingembre séché naturellement, adapté à l’exportation.',
      'Natürlich getrockneter Ingwer für den Export geeignet.',
      'Jengibre secado naturalmente, apto para exportación.',
      'Zenzero essiccato naturalmente, adatto all’esportazione.',
      'Gengibre seco naturalmente, adequado para exportação.',
      'زنجبيل مجفف طبيعياً مناسب للتصدير.',
      '天然干姜，适合出口。',
      'Натурально сушёный имбирь, подходящий для экспорта.',
      'Doğal kurutulmuş zencefil, ihracata uygun.'
    ),

    packaging: t(
      '50kg woven bags',
      'Sacs tissés de 50 kg',
      '50kg gewebte Säcke',
      'Bolsas tejidas de 50 kg',
      'Sacchi intrecciati da 50 kg',
      'Sacos tecidos de 50 kg',
      'أكياس منسوجة 50 كجم',
      '50公斤编织袋',
      '50 кг тканые мешки',
      '50kg dokuma torbalar'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 / 40 футов',
      '20ft / 40ft'
    ),

    seasons: ['November - February'], // can also convert to Map if you want full translation
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Dried Split Ginger',
          'Gingembre Fendu Séché',
          'Getrockneter geschnittener Ingwer',
          'Jengibre Seco Partido',
          'Zenzero Secco Spezzato',
          'Gengibre Seco Cortado',
          'زنجبيل مقطّع مجفف',
          '干姜片',
          'Сушёный разделённый имбирь',
          'Kuru Parçalanmış Zencefil'
        ),
        image: '/images/products/ginger-split.jpg',
        minimumOrder: 2000,
        maximumOrder: 25000
      },
      {
        name: t(
          'Dried Whole Ginger',
          'Gingembre Entier Séché',
          'Getrockneter ganzer Ingwer',
          'Jengibre Seco Entero',
          'Zenzero Intero Secco',
          'Gengibre Seco Inteiro',
          'زنجبيل كامل مجفف',
          '整块干姜',
          'Сушёный целый имбирь',
          'Kuru Tam Zencefil'
        ),
        image: '/images/products/ginger-whole.jpg',
        minimumOrder: 3000,
        maximumOrder: 30000
      }
    ]
  },


  {
    title: t(
      'Sesame Seeds',
      'Graines de sésame',
      'Sesamsamen',
      'Semillas de sésamo',
      'Semi di sesamo',
      'Sementes de sésamo',
      'بذور السمسم',
      '芝麻',
      'Кунжутные семена',
      'Susam Tohumu'
    ),

    image: '/images/products/sesame.jpg',

    descriptions: t(
      'High-quality cleaned sesame seeds.',
      'Graines de sésame nettoyées de haute qualité.',
      'Hochwertige gereinigte Sesamsamen.',
      'Semillas de sésamo limpias de alta calidad.',
      'Semi di sesamo puliti di alta qualità.',
      'Sementes de sésamo limpas de alta qualidade.',
      'بذور السمسم عالية الجودة والمنظفة.',
      '高品质清洗芝麻。',
      'Кунжутные семена высокого качества, очищенные.',
      'Yüksek kaliteli temizlenmiş susam tohumu.'
    ),

    packaging: t(
      '50kg jute bags',
      'Sacs de jute de 50 kg',
      '50kg Jutesäcke',
      'Bolsas de yute de 50 kg',
      'Sacchi di iuta da 50 kg',
      'Sacos de juta de 50 kg',
      'أكياس من الجوت 50 كجم',
      '50公斤黄麻袋',
      '50 кг мешки из джута',
      '50kg keten torbalar'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 / 40 футов',
      '20ft / 40ft'
    ),

    seasons: ['September - December'], // you can later map these to a multilingual Map if desired
    incoterms: ['FOB', 'CIF', 'EXW'],

    variants: [
      {
        name: t(
          'White Sesame',
          'Sésame blanc',
          'Weißer Sesam',
          'Sésamo blanco',
          'Sesamo bianco',
          'Sésamo branco',
          'السمسم الأبيض',
          '白芝麻',
          'Белый кунжут',
          'Beyaz Susam'
        ),
        image: '/images/products/sesame-white.jpg',
        minimumOrder: 5000,
        maximumOrder: 30000
      },
      {
        name: t(
          'Brown Sesame',
          'Sésame brun',
          'Brauner Sesam',
          'Sésamo marrón',
          'Sesamo marrone',
          'Sésamo marrom',
          'السمسم البني',
          '棕芝麻',
          'Коричневый кунжут',
          'Kahverengi Susam'
        ),
        image: '/images/products/sesame-brown.jpg',
        minimumOrder: 4000,
        maximumOrder: 25000
      }
    ]
  },


  {
    title: t(
      'Cashew Nuts',
      'Noix de cajou',
      'Cashewnüsse',
      'Nueces de anacardo',
      'Anacardi',
      'Nozes de caju',
      'جوز الكاجو',
      '腰果',
      'Кешью',
      'Kaju'
    ),

    image: '/images/products/cashew.jpg',

    descriptions: t(
      'Export-grade raw cashew nuts.',
      'Noix de cajou crues de qualité export.',
      'Cashewnüsse in Rohform, exportfähig.',
      'Nueces de anacardo crudas de calidad de exportación.',
      'Anacardi crudi di qualità da esportazione.',
      'Castanhas de caju cruas de qualidade para exportação.',
      'جوز الكاجو الخام بدرجة تصدير.',
      '出口级生腰果。',
      'Кешью сырой экспортного качества.',
      'İhracat kalitesinde çiğ kaju fıstığı.'
    ),

    packaging: t(
      '80kg vacuum bags',
      'Sacs sous vide de 80 kg',
      '80kg Vakuumbeutel',
      'Bolsas al vacío de 80 kg',
      'Sacchi sottovuoto da 80 kg',
      'Sacos a vácuo de 80 kg',
      'أكياس مفرغة 80 كجم',
      '80公斤真空袋',
      '80 кг вакуумные пакеты',
      '80kg vakum torbaları'
    ),

    containerSize: t(
      '40ft',
      '40 pieds',
      '40ft',
      '40 pies',
      '40 piedi',
      '40 pés',
      '40 قدم',
      '40英尺',
      '40 футов',
      '40ft'
    ),

    seasons: ['February - May'], // can map to multilingual Map later if needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Raw Cashew Nuts',
          'Noix de cajou crues',
          'Roh-Cashewnüsse',
          'Nueces de anacardo crudas',
          'Anacardi crudi',
          'Castanhas de caju cruas',
          'جوز الكاجو الخام',
          '生腰果',
          'Сырые кешью',
          'Çiğ kaju fıstığı'
        ),
        image: '/images/products/cashew-raw.jpg',
        minimumOrder: 10000,
        maximumOrder: 50000
      }
    ]
  },


  {
    title: t(
      'Cocoa Beans',
      'Fèves de cacao',
      'Kakaobohnen',
      'Granos de cacao',
      'Fagioli di cacao',
      'Grãos de cacau',
      'حبوب الكاكاو',
      '可可豆',
      'Какао бобы',
      'Kakao çekirdekleri'
    ),

    image: '/images/products/cocoa.jpg',

    descriptions: t(
      'Fermented cocoa beans with rich aroma.',
      'Fèves de cacao fermentées avec un arôme riche.',
      'Fermentierte Kakaobohnen mit reichhaltigem Aroma.',
      'Granos de cacao fermentados con rico aroma.',
      'Fagioli di cacao fermentati con aroma ricco.',
      'Grãos de cacau fermentados com aroma rico.',
      'حبوب الكاكاو المخمرة برائحة غنية.',
      '发酵可可豆，香气浓郁。',
      'Ферментированные какао-бобы с богатым ароматом.',
      'Fermente edilmiş kakao çekirdekleri, zengin aromalı.'
    ),

    packaging: t(
      '64kg jute bags',
      'Sacs en jute de 64 kg',
      '64kg Jutesäcke',
      'Bolsas de yute de 64 kg',
      'Sacchi di juta da 64 kg',
      'Sacos de juta de 64 kg',
      'أكياس من الجوت 64 كجم',
      '64公斤黄麻袋',
      '64 кг мешки из джута',
      '64kg keten torbalar'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 футов / 40 футов',
      '20ft / 40ft'
    ),

    seasons: ['October - March'], // can be mapped later if multilingual seasons are needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Grade 1 Cocoa Beans',
          'Fèves de cacao de grade 1',
          'Kakaobohnen der Klasse 1',
          'Granos de cacao de grado 1',
          'Fagioli di cacao di grado 1',
          'Grãos de cacau de Grau 1',
          'حبوب الكاكاو من الدرجة 1',
          '1级可可豆',
          'Какао-бобы 1-го сорта',
          '1. Sınıf Kakao Çekirdekleri'
        ),
        image: '/images/products/cocoa-grade1.jpg',
        minimumOrder: 8000,
        maximumOrder: 60000
      }
    ]
  },


  {
    title: t(
      'Shea Butter',
      'Beurre de karité',
      'Sheabutter',
      'Manteca de karité',
      'Burro di karité',
      'Manteiga de karité',
      'زبدة الشيا',
      '乳木果油',
      'Ши масло',
      'Shea Yağı'
    ),

    image: '/images/products/shea.jpg',

    descriptions: t(
      'Organic unrefined shea butter.',
      'Beurre de karité biologique non raffiné.',
      'Bio-unraffiniertes Sheabutter',
      'Manteca de karité orgánica sin refinar.',
      'Burro di karité biologico non raffinato.',
      'Manteiga de karité orgânica não refinada.',
      'زبدة الشيا العضوية غير المكررة.',
      '有机未精炼乳木果油。',
      'Органическое нерафинированное масло ши.',
      'Organik rafine edilmemiş shea yağı.'
    ),

    packaging: t(
      '25kg containers',
      'Conteneurs de 25 kg',
      '25kg Behälter',
      'Contenedores de 25 kg',
      'Contenitori da 25 kg',
      'Recipientes de 25 kg',
      'حاويات 25 كجم',
      '25公斤容器',
      'Контейнеры 25 кг',
      '25kg kaplar'
    ),

    containerSize: t(
      '20ft',
      '20 pieds',
      '20ft',
      '20 pies',
      '20 piedi',
      '20 pés',
      '20 قدم',
      '20英尺',
      '20 футов',
      '20ft'
    ),

    seasons: ['May - August'], // you can translate seasons later if needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Unrefined Shea Butter',
          'Beurre de karité non raffiné',
          'Unraffiniertes Sheabutter',
          'Manteca de karité sin refinar',
          'Burro di karité non raffinato',
          'Manteiga de karité não refinada',
          'زبدة الشيا غير المكررة',
          '未精炼乳木果油',
          'Нерафинированное масло ши',
          'Rafine edilmemiş shea yağı'
        ),
        image: '/images/products/shea-unrefined.jpg',
        minimumOrder: 1000,
        maximumOrder: 15000
      }
    ]
  },


  {
    title: t(
      'Palm Kernel Oil',
      'Huile de palmiste',
      'Palmkernöl',
      'Aceite de palmiste',
      'Olio di palma',
      'Óleo de palmiste',
      'زيت نواة النخيل',
      '棕榈仁油',
      'Пальмовое масло',
      'Palmiye Çekirdeği Yağı'
    ),

    image: '/images/products/palm-kernel.jpg',

    descriptions: t(
      'Cold-pressed palm kernel oil.',
      'Huile de palmiste pressée à froid.',
      'Kaltgepresstes Palmöl',
      'Aceite de palmiste prensado en frío',
      'Olio di palma spremuto a freddo',
      'Óleo de palmiste prensado a frio',
      'زيت نواة النخيل معصور على البارد',
      '冷榨棕榈仁油',
      'Холодного отжима пальмовое масло',
      'Soğuk preslenmiş palmiye çekirdeği yağı'
    ),

    packaging: t(
      '200L drums',
      'Fûts de 200L',
      '200L Fässer',
      'Barriles de 200L',
      'Fusti da 200L',
      'Tambor de 200L',
      'براميل 200 لتر',
      '200升桶',
      'Бочки 200 л',
      '200L varil'
    ),

    containerSize: t(
      '20ft',
      '20 pieds',
      '20ft',
      '20 pies',
      '20 piedi',
      '20 pés',
      '20 قدم',
      '20英尺',
      '20 футов',
      '20ft'
    ),

    seasons: ['All year'], // you can translate seasons later if needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Crude Palm Kernel Oil',
          'Huile de palmiste brute',
          'Rohes Palmöl',
          'Aceite de palmiste crudo',
          'Olio di palma grezzo',
          'Óleo de palmiste cru',
          'زيت نواة النخيل الخام',
          '未精炼棕榈仁油',
          'Сырое пальмовое масло',
          'Ham palmiye çekirdeği yağı'
        ),
        image: '/images/products/pko.jpg',
        minimumOrder: 5000,
        maximumOrder: 40000
      }
    ]
  },

  {
    title: t(
      'Maize',
      'Maïs',
      'Mais',
      'Maíz',
      'Mais',
      'Milho',
      'الذرة',
      '玉米',
      'Кукуруза',
      'Mısır'
    ),

    image: '/images/products/maize.jpg',

    descriptions: t(
      'Export-grade maize grains.',
      'Grains de maïs de qualité export.',
      'Exportqualität Maiskörner',
      'Granos de maíz de exportación',
      'Grani di mais di qualità per esportazione',
      'Grãos de milho para exportação',
      'حبوب الذرة للتصدير',
      '出口级玉米粒',
      'Кукурузные зерна экспортного качества',
      'İhracat sınıfı mısır taneleri'
    ),

    packaging: t(
      '50kg woven bags',
      'Sacs tissés de 50 kg',
      '50kg Gewebesäcke',
      'Bolsas tejidas de 50kg',
      'Sacchi intrecciati da 50kg',
      'Sacos trançados de 50kg',
      'أكياس منسوجة 50 كجم',
      '50公斤编织袋',
      '50 кг тканых мешков',
      '50kg dokuma çanta'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 футов / 40 футов',
      '20ft / 40ft'
    ),

    seasons: ['July - October'], // translate if needed later
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Yellow Maize',
          'Maïs jaune',
          'Gelber Mais',
          'Maíz amarillo',
          'Mais giallo',
          'Milho amarelo',
          'الذرة الصفراء',
          '黄色玉米',
          'Жёлтая кукуруза',
          'Sarı Mısır'
        ),
        image: '/images/products/maize-yellow.jpg',
        minimumOrder: 10000,
        maximumOrder: 70000
      },
      {
        name: t(
          'White Maize',
          'Maïs blanc',
          'Weißer Mais',
          'Maíz blanco',
          'Mais bianco',
          'Milho branco',
          'الذرة البيضاء',
          '白色玉米',
          'Белая кукуруза',
          'Beyaz Mısır'
        ),
        image: '/images/products/maize-white.jpg',
        minimumOrder: 8000,
        maximumOrder: 60000
      }
    ]
  },


  {
    title: t(
      'Soybeans',
      'Soja',
      'Sojabohnen',
      'Frijoles de soja',
      'Fagioli di soia',
      'Soja',
      'فول الصويا',
      '大豆',
      'Соя',
      'Soya fasulyesi'
    ),

    image: '/images/products/soybeans.jpg',

    descriptions: t(
      'Non-GMO soybeans for export.',
      'Soja non-OGM pour l\'exportation.',
      'Nicht-GVO Sojabohnen für den Export.',
      'Soja no transgénica para exportación.',
      'Fagioli di soia non OGM per l\'esportazione.',
      'Soja não transgênica para exportação.',
      'فول الصويا غير المعدّل وراثياً للتصدير.',
      '非转基因大豆，用于出口。',
      'Соя без ГМО для экспорта.',
      'İhracat için GDO’suz soya fasulyesi.'
    ),

    packaging: t(
      '50kg polypropylene bags',
      'Sacs en polypropylène de 50 kg',
      '50kg Polypropylenbeutel',
      'Bolsas de polipropileno de 50 kg',
      'Sacchi in polipropilene da 50 kg',
      'Sacos de polipropileno de 50 kg',
      'أكياس البولي بروبيلين 50 كجم',
      '50公斤聚丙烯袋',
      '50 кг полипропиленовые мешки',
      '50kg polipropilen çanta'
    ),

    containerSize: t(
      '20ft / 40ft',
      '20 pieds / 40 pieds',
      '20ft / 40ft',
      '20 pies / 40 pies',
      '20 piedi / 40 piedi',
      '20 pés / 40 pés',
      '20 قدم / 40 قدم',
      '20英尺 / 40英尺',
      '20 футов / 40 футов',
      '20ft / 40ft'
    ),

    seasons: ['August - November'], // can translate if needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Yellow Soybeans',
          'Soja jaune',
          'Gelbe Sojabohnen',
          'Soja amarilla',
          'Fagioli di soia gialli',
          'Soja amarela',
          'فول الصويا الأصفر',
          '黄色大豆',
          'Жёлтая соя',
          'Sarı Soya Fasulyesi'
        ),
        image: '/images/products/soybeans-yellow.jpg',
        minimumOrder: 5000,
        maximumOrder: 50000
      }
    ]
  },


  {
  title: {
    en: 'Groundnuts',
    fr: 'Arachides',
    de: 'Erdnüsse',
    es: 'Cacahuetes',
    it: 'Arachidi',
    pt: 'Amendoins',
    ar: 'الفول السوداني',
    zh: '花生',
    ru: 'Арахис',
    tr: 'Yer fıstığı'
  },
  image: '/images/products/groundnuts.jpg',
  descriptions: {
    en: 'Shelled groundnuts suitable for food processing.',
    fr: 'Arachides décortiquées adaptées à la transformation alimentaire.',
    de: 'Geschälte Erdnüsse für die Lebensmittelverarbeitung geeignet.',
    es: 'Cacahuetes pelados adecuados para el procesamiento de alimentos.',
    it: 'Arachidi sgusciate adatte alla trasformazione alimentare.',
    pt: 'Amendoins descascados adequados para processamento de alimentos.',
    ar: 'الفول السوداني المقشر مناسب لمعالجة الطعام.',
    zh: '适合食品加工的去壳花生。',
    ru: 'Очистенный арахис, пригодный для пищевой промышленности.',
    tr: 'Kabukları soyulmuş yer fıstığı, gıda işleme için uygundur.'
  },
  packaging: {
    en: '50kg jute bags',
    fr: 'Sacs en jute de 50 kg',
    de: '50kg Jutesäcke',
    es: 'Bolsas de yute de 50 kg',
    it: 'Sacchi di juta da 50 kg',
    pt: 'Sacos de juta de 50 kg',
    ar: 'أكياس جوت 50 كجم',
    zh: '50公斤黄麻袋',
    ru: '50 кг мешки из джута',
    tr: '50kg keten torbalar'
  },
  containerSize: {
    en: '20ft / 40ft',
    fr: '20 pieds / 40 pieds',
    de: '20ft / 40ft',
    es: '20 pies / 40 pies',
    it: '20 piedi / 40 piedi',
    pt: '20 pés / 40 pés',
    ar: '20 قدم / 40 قدم',
    zh: '20英尺 / 40英尺',
    ru: '20 футов / 40 футов',
    tr: '20ft / 40ft'
  },
  seasons: ['September - January'], // you can keep as array or also localize if needed
  incoterms: ['FOB', 'CIF'],
  variants: [
    {
      name: {
        en: 'Shelled Groundnuts',
        fr: 'Arachides décortiquées',
        de: 'Geschälte Erdnüsse',
        es: 'Cacahuetes pelados',
        it: 'Arachidi sgusciate',
        pt: 'Amendoins descascados',
        ar: 'الفول السوداني المقشر',
        zh: '去壳花生',
        ru: 'Очистенный арахис',
        tr: 'Kabukları soyulmuş yer fıstığı'
      },
      image: '/images/products/groundnuts-shelled.jpg',
      minimumOrder: 3000,
      maximumOrder: 35000
    }
  ]
},


  {
    title: t(
      'Moringa',
      'Moringa',
      'Moringa',
      'Moringa',
      'Moringa',
      'Moringa',
      'المورينجا',
      '辣木',
      'Моринга',
      'Moringa'
    ),

    image: '/images/products/moringa.jpg',

    descriptions: t(
      'Organic moringa products.',
      'Produits de moringa biologiques.',
      'Bio-Moringa-Produkte.',
      'Productos de moringa orgánicos.',
      'Prodotti biologici di moringa.',
      'Produtos orgânicos de moringa.',
      'منتجات المورينجا العضوية.',
      '有机辣木产品。',
      'Органические продукты моринга.',
      'Organik moringa ürünleri.'
    ),

    packaging: t(
      '10kg food-grade bags',
      'Sacs alimentaires de 10 kg',
      '10kg Lebensmittelbeutel',
      'Bolsas de grado alimenticio de 10 kg',
      'Sacchi alimentari da 10 kg',
      'Sacos alimentares de 10 kg',
      'أكياس غذائية 10 كجم',
      '10公斤食品级袋',
      '10 кг пакеты пищевого качества',
      '10kg gıda sınıfı torbalar'
    ),

    containerSize: t(
      '20ft',
      '20 pieds',
      '20ft',
      '20 pies',
      '20 piedi',
      '20 pés',
      '20 قدم',
      '20英尺',
      '20 футов',
      '20ft'
    ),

    seasons: ['All year'], // can translate if needed
    incoterms: ['FOB', 'CIF'],

    variants: [
      {
        name: t(
          'Moringa Leaf Powder',
          'Poudre de feuilles de moringa',
          'Moringa-Blattpulver',
          'Polvo de hoja de moringa',
          'Polvere di foglie di moringa',
          'Pó de folhas de moringa',
          'مسحوق أوراق المورينجا',
          '辣木叶粉',
          'Порошок листьев моринга',
          'Moringa yaprağı tozu'
        ),
        image: '/images/products/moringa-powder.jpg',
        minimumOrder: 500,
        maximumOrder: 10000
      },
      {
        name: t(
          'Dried Moringa Leaves',
          'Feuilles de moringa séchées',
          'Getrocknete Moringa-Blätter',
          'Hojas de moringa secas',
          'Foglie di moringa essiccate',
          'Folhas de moringa secas',
          'أوراق المورينجا المجففة',
          '干辣木叶',
          'Сушеные листья моринга',
          'Kurutulmuş Moringa yaprakları'
        ),
        image: '/images/products/moringa-leaves.jpg',
        minimumOrder: 800,
        maximumOrder: 15000
      }
    ]
  }

]

async function seedProducts() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/mitimeth`)

    await Product.deleteMany()
    await Product.insertMany(groupedProducts)

    console.log('✅ 12 grouped products seeded successfully')
    process.exit()
  } catch (error) {
    console.error('❌ Seeding failed', error)
    process.exit(1)
  }
}

seedProducts()
