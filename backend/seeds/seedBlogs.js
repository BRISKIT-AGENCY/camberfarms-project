import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Blog from '../models/Blog.js'
import exportBlog from '../models/exportBlog.js'
import News from '../models/News.js'

dotenv.config()

const blogs = [
    {
        "title": "How Camberfarm Is Building a Future of Responsible Growth",
        "excerpt": "Discover how Camberfarm is driving sustainable agriculture through farmer empowerment, transparency, and innovation.",
        "slug": "camberfarm-responsible-growth",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-05T10:00:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "Empowering Smallholder Farmers Across Africa",
        "excerpt": "How education, access to tools, and fair trade are transforming farming communities.",
        "slug": "empowering-smallholder-farmers-africa",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-10T09:00:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "The Role of Traceability in Global Food Trade",
        "excerpt": "Why transparency and traceability matter in agricultural exports.",
        "slug": "traceability-global-food-trade",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-15T11:30:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "Reducing Post-Harvest Losses in African Agriculture",
        "excerpt": "How better storage and logistics reduce waste and increase profits.",
        "slug": "reducing-post-harvest-losses",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-18T08:45:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "Why Ethical Sourcing Matters More Than Ever",
        "excerpt": "Ethical sourcing builds trust, sustainability, and long-term partnerships.",
        "slug": "why-ethical-sourcing-matters",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-22T10:15:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "The Green Future of African Agricultural Exports",
        "excerpt": "Sustainability and profitability can coexist in African trade.",
        "slug": "green-future-african-exports",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-25T12:00:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "How Technology Is Transforming African Farming",
        "excerpt": "Digital tools are changing how African farmers grow and trade.",
        "slug": "technology-transforming-african-farming",
        "image": "/images/blog.png",
        "publishedAt": "2025-01-28T09:30:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "Understanding Export Standards for Agricultural Products",
        "excerpt": "What global buyers expect from African exporters.",
        "slug": "export-standards-agricultural-products",
        "image": "/images/blog.png",
        "publishedAt": "2025-02-01T10:00:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "From Farm to Port: Inside Camberfarm’s Supply Chain",
        "excerpt": "A transparent look at how African produce reaches global markets.",
        "slug": "farm-to-port-supply-chain",
        "image": "/images/blog.png",
        "publishedAt": "2025-02-05T14:20:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            }
        ]
    },

    {
        "title": "Why Africa’s Agricultural Future Is Bright",
        "excerpt": "With the right investments, Africa can feed the world sustainably.",
        "slug": "africa-agricultural-future",
        "image": "/images/blog.png",
        "publishedAt": "2025-02-10T16:00:00Z",
        "sections": [
            {
                "heading": "Empowering Farmers Through Education and Access",
                "paragraphs": [
                    "We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": " Responsible Sourcing and Transparent Supply Chains",
                "paragraphs": [
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions.",
                    "We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
                ]
            },
            {
                "heading": "Collaboration for Global Impact",
                "paragraphs": [
                    "We collaborate with local governments, NGOs, and agricultural bodies to promote ethical farming, support research, and align with global green standards. Through these partnerships, we’re helping set the benchmark for what responsible African exports should look like.",
                    "Our vision is to lead an ecosystem where profitability and responsibility coexist, proving that Africa can grow sustainably and trade confidently at the global level. In the global push toward sustainable development, agriculture remains one of the most powerful tools for transforming communities and economies. At Camberfarm, sustainability isn’t just a goal, it’s the foundation of how we grow, source, and export Africa’s agricultural produce.",
                    "Across our network of farmers, we’re driving a culture of responsibility, where every grain, spice, and fruit is produced with care for people and the planet. From the soil to the shipment stage, sustainability defines our every decision. We believe true sustainability starts with people. Camberfarm partners with smallholder farmers across Nigeria, Ghana, and East Africa to provide access to training, modern equipment, and data-driven farming techniques.",
                    "Through these programs, farmers learn better soil management, post-harvest handling, and environmentally friendly practices that not only increase yield but preserve long-term productivity."
                ]
            },
            {
                "heading": "The Green Future of African Trade",
                "paragraphs": [
                    "For Camberfarm, sustainability isn’t a trend, it’s a commitment. Every shipment we send represents more than just products; it’s a story of collaboration, empowerment, and integrity. We believe Africa’s greatest export isn’t just its produce, its promise.",
                    "By combining technology, traceability, and human connection, we’re shaping a new future where agriculture fuels both economic growth and environmental balance.",
                    "In a world where buyers want to know where their products come from, Camberfarm ensures full traceability from the field to the port. Every batch we export can be tracked back to its farming source who grew it, where it was cultivated, and under what conditions. We partner with certified local cooperatives and inspect every stage of processing, cleaning, and packaging. Our export division works closely with international compliance agencies to ensure that all products meet standards for safety, moisture content, and pesticide-free farming. This transparency gives our partners from Europe to Asia, full confidence that what they’re buying represents Africa’s best. Agricultural waste remains one of Africa’s biggest challenges.",
                    "Through our integrated approach, Camberfarm reduces post-harvest losses by investing in better processing, storage, and packaging systems. We’re introducing temperature-controlled logistics that maintain product freshness during export journeys, reducing spoilage by up to 30%. Our packaging materials are eco-friendly, recyclable, and designed to reduce plastic dependency. In the long run, we’re exploring renewable energy solutions for our processing hubs because sustainability isn’t just about farming practices, but the full value chain."
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
        await exportBlog.deleteMany()
        await exportBlog.insertMany(blogs)
        await News.deleteMany()
        await News.insertMany(blogs)

        console.log('✅ Blogs seeded successfully')
        process.exit()
    } catch (error) {
        console.error('❌ Seeding failed', error)
        process.exit(1)
    }
}

seedBlogs()
