# June Energy - Visual Taxonomy & Site Map

This diagram illustrates the architectural hierarchy and connectivity of the June Energy website.

```mermaid
graph TD
    %% Global Styles
    classDef main fill:#002B45,stroke:#2BB39E,stroke-width:2px,color:#fff;
    classDef product fill:#2BB39E,stroke:#002B45,stroke-width:1px,color:#fff;
    classDef info fill:#F8FAFB,stroke:#002B45,stroke-width:1px,color:#002B45;
    classDef support fill:#F5F7F8,stroke:#506673,stroke-dasharray: 5 5,color:#506673;

    %% Nodes
    Home["Homepage (june.energy/nl-be/)"]:::main
    
    %% Product Branch
    Sub["Abonnementen (Products)"]:::product
    Switch["June Switch"]:::product
    SwitchPlus["June Switch Plus"]:::product
    Premium["June Premium"]:::product
    Dongle["June Dongle"]:::product
    
    %% Educational Branch
    HowItWorks["Hoe werkt het?"]:::info
    Vision["Visie"]:::info
    Reviews["Reviews"]:::info
    Prices["Prijzen (Comparison)"]:::info
    
    %% Partnership Branch
    Partners["Partnervoordelen"]:::info
    
    %% Conversion/Support Branch
    Login["Login (External Portals)"]:::support
    FAQ["Veelgestelde Vragen (FAQ)"]:::support
    Privacy["Privacy & Legal"]:::support

    %% Relationships
    Home --> Sub
    Sub --> Switch
    Sub --> SwitchPlus
    Sub --> Premium
    Sub --> Dongle
    
    Home --> HowItWorks
    Home --> Prices
    Home --> Reviews
    
    Home --> Vision
    Home --> Partners
    
    %% Cross-links
    HowItWorks -.-> Prices
    Prices -.-> Sub
    Reviews -.-> Sub
    
    %% Footer Actions
    Home --- FAQ
    Home --- Login
    Home --- Privacy
```

## Taxonomy Breakdown

### 1. Core Service Layer (Navigation Focus)
Essential pages that define **What** June is and **How** it delivers value.
- **Homepage:** The high-level aggregator & trust builder.
- **Hoe werkt het?:** Educational deep-dive into the "Black Box" logic of automatic switching.
- **Prijzen:** Direct comparison to enable immediate decision-making.

### 2. Product Segment Layer (Conversion Focus)
Targeted landing pages for specific user profiles.
- **The Saver (Switch):** Entry-level, focusing on simple ROI.
- **The Risk-Averse (Switch Plus):** Focusing on the "Savings Guarantee."
- **The Tech Enthusiast (Premium/Dongle):** Focusing on real-time data and solar optimization.

### 3. Trust & Loyalty Layer (Retention Focus)
Social proof and partnership ecosystems.
- **Reviews:** User-generated content and video testimonials.
- **Visie:** The "Why" behind the company, establishing ethical credibility.
- **Partnervoordelen:** B2B integration and referral benefits.

### 4. Utility Layer (Functional Focus)
Operational elements of the site.
- **Login:** Hand-off to the user dashboard.
- **FAQ:** Objection handling and support documentation.
- **Legal/Privacy:** Compliance and transparency.
