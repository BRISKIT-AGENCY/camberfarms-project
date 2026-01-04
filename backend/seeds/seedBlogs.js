import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Blog from '../models/Blog.js'

dotenv.config()

const blogs = [
    {
        "title": "How Camberfarm Is Building a Future of Responsible Growth",
        "excerpt": "Discover how Camberfarm is driving sustainable agriculture through farmer empowerment, transparency, and innovation.",
        "slug": "camberfarm-responsible-growth",
        "image": "https://api.camberfarm.com/uploads/blogs/responsible-growth.jpg",
        "publishedAt": "2025-01-05T10:00:00Z",
        "sections": [
            {
                "heading": "Sustainability at the Core",
                "paragraphs": [
                    "At Camberfarm, sustainability is more than a buzzword. It defines how we grow, source, and export agricultural produce across Africa.",
                    "From soil health to international shipment, every decision is guided by responsibility and long-term impact."
                ]
            },
            {
                "heading": "Empowering African Farmers",
                "paragraphs": [
                    "We work closely with smallholder farmers to provide education, modern tools, and data-driven farming practices.",
                    "These initiatives improve yield while preserving land productivity for future generations."
                ]
            }
        ]
    },

    {
        "title": "Empowering Smallholder Farmers Across Africa",
        "excerpt": "How education, access to tools, and fair trade are transforming farming communities.",
        "slug": "empowering-smallholder-farmers-africa",
        "image": "https://api.camberfarm.com/uploads/blogs/smallholder-farmers.jpg",
        "publishedAt": "2025-01-10T09:00:00Z",
        "sections": [
            {
                "heading": "Education as a Foundation",
                "paragraphs": [
                    "True transformation begins with knowledge. Camberfarm provides training on modern farming techniques.",
                    "Farmers learn soil management, pest control, and post-harvest handling."
                ]
            },
            {
                "heading": "Access to Markets",
                "paragraphs": [
                    "We connect farmers directly to global markets, eliminating middlemen.",
                    "This ensures fair pricing and sustainable livelihoods."
                ]
            }
        ]
    },

    {
        "title": "The Role of Traceability in Global Food Trade",
        "excerpt": "Why transparency and traceability matter in agricultural exports.",
        "slug": "traceability-global-food-trade",
        "image": "https://api.camberfarm.com/uploads/blogs/traceability.jpg",
        "publishedAt": "2025-01-15T11:30:00Z",
        "sections": [
            {
                "heading": "What Is Traceability?",
                "paragraphs": [
                    "Traceability allows buyers to know exactly where food comes from.",
                    "It builds trust across the entire supply chain."
                ]
            },
            {
                "heading": "Camberfarm’s Approach",
                "paragraphs": [
                    "Every batch exported by Camberfarm can be tracked back to its source.",
                    "This ensures quality, safety, and ethical sourcing."
                ]
            }
        ]
    },

    {
        "title": "Reducing Post-Harvest Losses in African Agriculture",
        "excerpt": "How better storage and logistics reduce waste and increase profits.",
        "slug": "reducing-post-harvest-losses",
        "image": "https://api.camberfarm.com/uploads/blogs/post-harvest.jpg",
        "publishedAt": "2025-01-18T08:45:00Z",
        "sections": [
            {
                "heading": "The Post-Harvest Challenge",
                "paragraphs": [
                    "Up to 40% of produce is lost after harvest in parts of Africa.",
                    "Poor storage and transportation are major causes."
                ]
            },
            {
                "heading": "Innovative Solutions",
                "paragraphs": [
                    "Camberfarm invests in temperature-controlled logistics.",
                    "These solutions preserve freshness and reduce spoilage."
                ]
            }
        ]
    },

    {
        "title": "Why Ethical Sourcing Matters More Than Ever",
        "excerpt": "Ethical sourcing builds trust, sustainability, and long-term partnerships.",
        "slug": "why-ethical-sourcing-matters",
        "image": "https://api.camberfarm.com/uploads/blogs/ethical-sourcing.jpg",
        "publishedAt": "2025-01-22T10:15:00Z",
        "sections": [
            {
                "heading": "Defining Ethical Sourcing",
                "paragraphs": [
                    "Ethical sourcing ensures fair treatment of farmers and workers.",
                    "It also protects the environment."
                ]
            },
            {
                "heading": "Camberfarm’s Commitment",
                "paragraphs": [
                    "We partner only with certified cooperatives.",
                    "Compliance with international standards is non-negotiable."
                ]
            }
        ]
    },

    {
        "title": "The Green Future of African Agricultural Exports",
        "excerpt": "Sustainability and profitability can coexist in African trade.",
        "slug": "green-future-african-exports",
        "image": "https://api.camberfarm.com/uploads/blogs/green-future.jpg",
        "publishedAt": "2025-01-25T12:00:00Z",
        "sections": [
            {
                "heading": "Balancing Growth and Responsibility",
                "paragraphs": [
                    "Economic growth must not come at the cost of the environment.",
                    "Camberfarm integrates sustainability across the value chain."
                ]
            }
        ]
    },

    {
        "title": "How Technology Is Transforming African Farming",
        "excerpt": "Digital tools are changing how African farmers grow and trade.",
        "slug": "technology-transforming-african-farming",
        "image": "https://api.camberfarm.com/uploads/blogs/farming-technology.jpg",
        "publishedAt": "2025-01-28T09:30:00Z",
        "sections": [
            {
                "heading": "Data-Driven Decisions",
                "paragraphs": [
                    "Technology helps farmers make informed decisions.",
                    "Yield forecasting and soil analysis improve productivity."
                ]
            }
        ]
    },

    {
        "title": "Understanding Export Standards for Agricultural Products",
        "excerpt": "What global buyers expect from African exporters.",
        "slug": "export-standards-agricultural-products",
        "image": "https://api.camberfarm.com/uploads/blogs/export-standards.jpg",
        "publishedAt": "2025-02-01T10:00:00Z",
        "sections": [
            {
                "heading": "Meeting International Standards",
                "paragraphs": [
                    "Export markets demand strict quality control.",
                    "Camberfarm meets safety, moisture, and pesticide regulations."
                ]
            }
        ]
    },

    {
        "title": "From Farm to Port: Inside Camberfarm’s Supply Chain",
        "excerpt": "A transparent look at how African produce reaches global markets.",
        "slug": "farm-to-port-supply-chain",
        "image": "https://api.camberfarm.com/uploads/blogs/farm-to-port.jpg",
        "publishedAt": "2025-02-05T14:20:00Z",
        "sections": [
            {
                "heading": "The Journey of Produce",
                "paragraphs": [
                    "Produce moves from farms to processing hubs.",
                    "Each stage is monitored for quality assurance."
                ]
            }
        ]
    },

    {
        "title": "Why Africa’s Agricultural Future Is Bright",
        "excerpt": "With the right investments, Africa can feed the world sustainably.",
        "slug": "africa-agricultural-future",
        "image": "https://api.camberfarm.com/uploads/blogs/agriculture-future.jpg",
        "publishedAt": "2025-02-10T16:00:00Z",
        "sections": [
            {
                "heading": "Untapped Potential",
                "paragraphs": [
                    "Africa holds 60% of the world’s arable land.",
                    "Strategic investment unlocks massive opportunities."
                ]
            }
        ]
    }
]


async function seedBlogs() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/mitimeth`)

        await Blog.deleteMany()
        await Blog.insertMany(blogs)

        console.log('✅ Blogs seeded successfully')
        process.exit()
    } catch (error) {
        console.error('❌ Seeding failed', error)
        process.exit(1)
    }
}

seedBlogs()
