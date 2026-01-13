import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()

const groupedProducts = [
  {
    title: 'Pepper',
    image: '/images/products/pepper.jpg',
    descriptions: 'Export-grade peppers sourced from Nigerian farms.',
    packaging: '25kg sacks',
    containerSize: '20ft / 40ft',
    seasons: ['November - March'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Red Pepper',
        image: '/images/products/red-pepper.jpg',
        minimumOrder: 2000,
        maximumOrder: 20000
      },
      {
        name: 'Yellow Pepper',
        image: '/images/products/yellow-pepper.jpg',
        minimumOrder: 1500,
        maximumOrder: 15000
      },
      {
        name: 'Alligator Pepper',
        image: '/images/products/alligator-pepper.jpg',
        minimumOrder: 1000,
        maximumOrder: 10000
      }
    ]
  },

  {
    title: 'Hibiscus Flower',
    image: '/images/products/hibiscus.jpg',
    descriptions: 'Premium sun-dried hibiscus flowers for beverages.',
    packaging: '25kg polypropylene bags',
    containerSize: '20ft / 40ft',
    seasons: ['January - March', 'July - October'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Whole Flower',
        image: '/images/products/hibiscus-whole.jpg',
        minimumOrder: 1000,
        maximumOrder: 20000
      },
      {
        name: 'Cut Flower',
        image: '/images/products/hibiscus-cut.jpg',
        minimumOrder: 1500,
        maximumOrder: 25000
      }
    ]
  },

  {
    title: 'Ginger',
    image: '/images/products/ginger.jpg',
    descriptions: 'Naturally dried ginger suitable for export.',
    packaging: '50kg woven bags',
    containerSize: '20ft / 40ft',
    seasons: ['November - February'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Dried Split Ginger',
        image: '/images/products/ginger-split.jpg',
        minimumOrder: 2000,
        maximumOrder: 25000
      },
      {
        name: 'Dried Whole Ginger',
        image: '/images/products/ginger-whole.jpg',
        minimumOrder: 3000,
        maximumOrder: 30000
      }
    ]
  },

  {
    title: 'Sesame Seeds',
    image: '/images/products/sesame.jpg',
    descriptions: 'High-quality cleaned sesame seeds.',
    packaging: '50kg jute bags',
    containerSize: '20ft / 40ft',
    seasons: ['September - December'],
    incoterms: ['FOB', 'CIF', 'EXW'],
    variants: [
      {
        name: 'White Sesame',
        image: '/images/products/sesame-white.jpg',
        minimumOrder: 5000,
        maximumOrder: 30000
      },
      {
        name: 'Brown Sesame',
        image: '/images/products/sesame-brown.jpg',
        minimumOrder: 4000,
        maximumOrder: 25000
      }
    ]
  },

  {
    title: 'Cashew Nuts',
    image: '/images/products/cashew.jpg',
    descriptions: 'Export-grade raw cashew nuts.',
    packaging: '80kg vacuum bags',
    containerSize: '40ft',
    seasons: ['February - May'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Raw Cashew Nuts',
        image: '/images/products/cashew-raw.jpg',
        minimumOrder: 10000,
        maximumOrder: 50000
      }
    ]
  },

  {
    title: 'Cocoa Beans',
    image: '/images/products/cocoa.jpg',
    descriptions: 'Fermented cocoa beans with rich aroma.',
    packaging: '64kg jute bags',
    containerSize: '20ft / 40ft',
    seasons: ['October - March'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Grade 1 Cocoa Beans',
        image: '/images/products/cocoa-grade1.jpg',
        minimumOrder: 8000,
        maximumOrder: 60000
      }
    ]
  },

  {
    title: 'Shea Butter',
    image: '/images/products/shea.jpg',
    descriptions: 'Organic unrefined shea butter.',
    packaging: '25kg containers',
    containerSize: '20ft',
    seasons: ['May - August'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Unrefined Shea Butter',
        image: '/images/products/shea-unrefined.jpg',
        minimumOrder: 1000,
        maximumOrder: 15000
      }
    ]
  },

  {
    title: 'Palm Kernel Oil',
    image: '/images/products/palm-kernel.jpg',
    descriptions: 'Cold-pressed palm kernel oil.',
    packaging: '200L drums',
    containerSize: '20ft',
    seasons: ['All year'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Crude Palm Kernel Oil',
        image: '/images/products/pko.jpg',
        minimumOrder: 5000,
        maximumOrder: 40000
      }
    ]
  },

  {
    title: 'Maize',
    image: '/images/products/maize.jpg',
    descriptions: 'Export-grade maize grains.',
    packaging: '50kg woven bags',
    containerSize: '20ft / 40ft',
    seasons: ['July - October'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Yellow Maize',
        image: '/images/products/maize-yellow.jpg',
        minimumOrder: 10000,
        maximumOrder: 70000
      },
      {
        name: 'White Maize',
        image: '/images/products/maize-white.jpg',
        minimumOrder: 8000,
        maximumOrder: 60000
      }
    ]
  },

  {
    title: 'Soybeans',
    image: '/images/products/soybeans.jpg',
    descriptions: 'Non-GMO soybeans for export.',
    packaging: '50kg polypropylene bags',
    containerSize: '20ft / 40ft',
    seasons: ['August - November'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Yellow Soybeans',
        image: '/images/products/soybeans-yellow.jpg',
        minimumOrder: 5000,
        maximumOrder: 50000
      }
    ]
  },

  {
    title: 'Groundnuts',
    image: '/images/products/groundnuts.jpg',
    descriptions: 'Shelled groundnuts suitable for food processing.',
    packaging: '50kg jute bags',
    containerSize: '20ft / 40ft',
    seasons: ['September - January'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Shelled Groundnuts',
        image: '/images/products/groundnuts-shelled.jpg',
        minimumOrder: 3000,
        maximumOrder: 35000
      }
    ]
  },

  {
    title: 'Moringa',
    image: '/images/products/moringa.jpg',
    descriptions: 'Organic moringa products.',
    packaging: '10kg food-grade bags',
    containerSize: '20ft',
    seasons: ['All year'],
    incoterms: ['FOB', 'CIF'],
    variants: [
      {
        name: 'Moringa Leaf Powder',
        image: '/images/products/moringa-powder.jpg',
        minimumOrder: 500,
        maximumOrder: 10000
      },
      {
        name: 'Dried Moringa Leaves',
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
