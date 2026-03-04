const fs = require('fs');

const modelsData = {
    models: [
        {
            id: "1",
            name: "GPT-5",
            slug: "gpt-5",
            developer: "OpenAI",
            shortSummary: "Highly versatile multimodal inference engine.",
            overview: "GPT-5 represents the next phase of large-scale mathematical inference, expanding upon the reasoning capabilities established by its predecessors. It operates as a truly multimodal construct, meaning it parses text, audio, images, and video natively without relying on secondary bridging models. Professionals across finance, engineering, and software development utilize this infrastructure to automate complex logic sequences.",
            keyCapabilities: [
                "Native Multimodal Processing",
                "Advanced Step-by-Step Mathematical Reasoning",
                "High-Speed Code Synthesis and Auditing",
                "Extended Long-term Memory Persistence"
            ],
            strengths: "Its primary architectural advantage lies in deep logic resolution. When tasked with multi-stage programming problems or complex data interpretations, the model rarely loses the thread. The ecosystem integration via API is also highly mature, making enterprise deployment straightforward.",
            weaknesses: "Because of the massive parameter count, operating costs for the highest-tier models remain significant. Occasional over-cautious refusal rates on ambiguous queries continue to be reported by power users.",
            useCases: "Ideal for deep code generation scaffolding, automated customer support logic routing, and synthesizing comprehensive reports from dozens of disparate source documents.",
            pricingInfo: "Base API access is billed per 1 million tokens, structured in tiers depending on processing speed priority. A consumer subscription is also available monthly.",
            freeTier: "Limited daily usage available.",
            comparisonFeatures: {
                textGeneration: "Industry Leading",
                codingAbility: "Exceptional",
                multimodalSupport: "Native (Text, Vision, Audio)",
                contextWindow: "128K - 256K Tokens",
                speed: "High",
                freeTierStatus: "Yes (Rate Limited)",
                pricingStatus: "Tiered Token Usage",
                apiAccess: "Available"
            }
        },
        {
            id: "2",
            name: "Claude Opus 4.6",
            slug: "claude-opus-4-6",
            developer: "Anthropic",
            shortSummary: "Unmatched contextual retention for large document analysis.",
            overview: "Claude Opus 4.6 is positioned as the definitive tool for processing massive walls of text with near-perfect retrieval accuracy. By heavily optimizing its attention mechanisms, the model ensures data provided at the very beginning of a long prompt is weighed equally against data at the end. Reviewers consistently note its tone feels highly natural and less mechanical than alternative options.",
            keyCapabilities: [
                "Massive Context Window Parsing",
                "Nuanced and Adaptable Writing Tone",
                "Near 100% Needle-in-a-Haystack Recall",
                "Subtle Instructability Constraints"
            ],
            strengths: "The ability to upload entire rulebooks, novels, or enterprise codebases and query them safely is unparalleled. Furthermore, the writing style can be easily steered away from the generic 'AI voice' into highly specific brand personas without requiring complex prompt gymnastics.",
            weaknesses: "While it understands code exceptionally well, raw generation speed can sometimes lag behind competitors when drafting exceedingly dense applications. Audio modalities are less integrated natively.",
            useCases: "Perfect for legal document review, academic paper synthesis, creative writing composition, and aligning large datasets against internal company compliance guidelines.",
            pricingInfo: "Priced competitively based on input and output token ratios, with volume discounts for enterprise-scale integration.",
            freeTier: "Available via specific front-end interfaces.",
            comparisonFeatures: {
                textGeneration: "Highly Natural",
                codingAbility: "Very Good",
                multimodalSupport: "Vision & Text",
                contextWindow: "1M+ Tokens",
                speed: "Moderate",
                freeTierStatus: "Yes",
                pricingStatus: "Token Ratio Linked",
                apiAccess: "Available"
            }
        },
        {
            id: "3",
            name: "Gemini 3",
            slug: "gemini-3",
            developer: "Google",
            shortSummary: "Deep ecosystem integration with unparalleled speed.",
            overview: "Gemini 3 leverages a specifically customized architecture to achieve blazing fast inference speeds, particularly when drawing real-time context from the wider internet. Because it exists natively within the Google workspace, the friction involved in accessing current events, checking facts, or referencing active spreadsheets is virtually eliminated. It handles massive throughput with consistent stability.",
            keyCapabilities: [
                "Real-Time Data Indexing Integration",
                "Extremely Fast Time-to-First-Token",
                "Seamless Workspace Synchronization",
                "Efficient Multi-step Logic Resolution"
            ],
            strengths: "Speed and recency of information are where this infrastructure shines. If a query relies on data published an hour ago or requires checking multiple live sources, the model returns synthesized answers instantly. The coding models specifically trained for its ecosystem are highly robust.",
            weaknesses: "Sometimes the model defaults to brief summary answers when a user might prefer an exhaustive deep dive, requiring explicit formatting instructions to override.",
            useCases: "Optimal for researchers needing up-to-the-minute data, data analysts working within existing cloud sheets, and developers building latency-sensitive applications.",
            pricingInfo: "Often bundled within broader technical ecosystem subscriptions, with separate standard API utilization billing.",
            freeTier: "Generous basic quota.",
            comparisonFeatures: {
                textGeneration: "Fast & Factual",
                codingAbility: "Excellent",
                multimodalSupport: "Native Full Stack",
                contextWindow: "1M+ Tokens",
                speed: "Very High",
                freeTierStatus: "Yes (Generous)",
                pricingStatus: "Ecosystem Bundle / Tokens",
                apiAccess: "Available"
            }
        },
        {
            id: "4",
            name: "Grok 4",
            slug: "grok-4",
            developer: "xAI",
            shortSummary: "Unfiltered real-time social data ingestion.",
            overview: "Grok 4 differentiates itself by maintaining direct, real-time access to the global social media firehose. This provides the system with an incredibly unique perspective on cultural trends, immediate news breakouts, and shifting public sentiment. The architecture is explicitly designed to minimize artificial guardrails, allowing for a more direct, occasionally humorous, analytical perspective.",
            keyCapabilities: [
                "Live Global Sentiment Analysis",
                "Unfiltered Conversational Style",
                "Rapid Trend Identification",
                "Direct Platform Integration"
            ],
            strengths: "When monitoring brand reputation or attempting to gauge the immediate reaction to a live event, no other platform has the same direct data pipe. The model is also remarkably adept at understanding sarcasm, niche internet culture, and rapidly evolving vernacular.",
            weaknesses: "Because it ingests raw, live data, the noise-to-signal ratio can sometimes force users to write very specific filters to get purely technical answers. Mathematical reasoning trails the absolute top-tier specialized systems.",
            useCases: "Highly utilized by brand managers, trend forecasters, political analysts, and marketing teams attempting to ride the wave of immediate cultural relevance.",
            pricingInfo: "Integrated into specific platform premium subscriptions as a core offering.",
            freeTier: "No dedicated free tier outside subscription.",
            comparisonFeatures: {
                textGeneration: "Adaptive & Direct",
                codingAbility: "Moderate",
                multimodalSupport: "Text & Evolving Vision",
                contextWindow: "128K Tokens",
                speed: "High",
                freeTierStatus: "No",
                pricingStatus: "Subscription Access",
                apiAccess: "Available"
            }
        },
        {
            id: "5",
            name: "Mistral Large",
            slug: "mistral-large",
            developer: "Mistral AI",
            shortSummary: "High-efficiency open-weight champion.",
            overview: "Mistral Large takes an aggressively optimized approach to parameter efficiency, providing top-tier results without demanding astronomical compute overhead. By refining the training data quality meticulously, the model achieves inference benchmarks that rival systems three times its size. This modularity means organizations can deploy it flexibly depending on local or cloud constraints.",
            keyCapabilities: [
                "Unmatched Parameter Efficiency",
                "Exceptional Multilingual Fluency",
                "Flexible Deployment Architecture",
                "Clean, Unbiased Base Weights"
            ],
            strengths: "The flexibility to run heavily optimized versions on private, secure local enterprise hardware gives this model an automatic win for highly regulated industries. It is famously direct in its coding instructions and exceptionally strong across European languages.",
            weaknesses: "It focuses heavily on text and code, meaning its native multimodal capabilities in audio or video are less comprehensive than proprietary giants. The broader plug-in ecosystem is still developing.",
            useCases: "Mandatory for organizations dealing with strict medical or financial privacy laws requiring on-premise execution, and enterprise teams needing robust multi-language translations without massive overhead.",
            pricingInfo: "Highly disruptive pricing for API access, with open-weight options available for completely independent hosting.",
            freeTier: "Open weights available.",
            comparisonFeatures: {
                textGeneration: "Precise & Direct",
                codingAbility: "Very Good",
                multimodalSupport: "Primarily Text",
                contextWindow: "32K - 128K Tokens",
                speed: "Extremely High",
                freeTierStatus: "Open Source Available",
                pricingStatus: "Disruptive / Self-hosted",
                apiAccess: "Available"
            }
        }
    ]
};

fs.writeFileSync('models.json', JSON.stringify(modelsData, null, 2));
console.log('models.json generated successfully.');
