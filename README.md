# LuxStay PH: Short-Let Apartment Booking Website

A fully responsive, single-page booking website for a fictional short-let apartment business in Port Harcourt, Nigeria. Built with **HTML, CSS and vanilla JavaScript** as a front-end portfolio project.

> Portfolio demo: not a real business. Listings, prices and reviews are sample content.

## Features
- Full-screen background video hero, with a poster image and a fallback
- Apartment listings with filtering (Studio / 1 Bedroom / 2 Bedrooms) and image galleries
- Live availability calendar for each apartment
- Booking request form with validation
- Responsive review slider (1 card on phones, 2–3 on desktop)
- Animated stats, scroll-reveal effects and a mobile hamburger menu
- Mobile-first, responsive layout tested from 320px phones up to desktop
- Basic SEO: meta description and semantic sections
- **Admin dashboard** (`admin.html`): demo login, booking requests (confirm / decline), price editing,
  listing on/off switch and a click-to-block availability calendar. Changes made in admin update the
  public site's prices and calendar instantly (shared via `store.js` + localStorage).

## Admin demo login
Email: `admin@luxstay.ph` · Password: `demo1234`
(Front-end demo only: data is stored in your browser, with no real server or authentication.)

## Tech
HTML5 · CSS3 (Flexbox, Grid, media queries) · JavaScript (ES6+, localStorage, DOM events) · Google Fonts

## Deploy (Render Static Site)
1. Push this folder to a GitHub repository.
2. In Render: **New → Static Site** → connect the repo.
3. Build command: *(leave empty)* · Publish directory: `.`

Built by [Oba Oriekwo](https://github.com/obaoriekwo).
