---
startDate: '2022-11-01'
endDate: '2025-04-01'
label: 'Job at BitApps sp. z o.o.'
color: '#10b981'
order: 5
---

**Position:** Developer

The company developed the **WoodsApp** platform for forest owners in Germany and Austria.

It provided both a browser-based and mobile interface (Android / iOS).

I was responsible for the browser interface in React, Android in Kotlin, the company website, and to some extent infrastructure matters.

<br />

Initially I was meant to handle frontend only, but it was also clear that I would deal with infrastructure to some extent (AWS, GitLab CI/CD).

The first few weeks were about learning AWS to roughly understand how it works and what the company relies on in infrastructure.

Only after I found a bug (an input had significant delay in a form) and fixed it was I assigned sprint tasks.

<br />

I was tasked with the company website, [bitapps.fi](https://bitapps.fi/), and the first task was to make the site mobile-friendly and match the design.

Then came interactive maps ([result](https://bitapps.fi/solutions.html)) and because the site was built on Jekyll (a simple site engine), I had to figure out a way to build JS and inject it into the page.

I used first webpack for JS compilation, then esbuild, since these weren't complex projects and esbuild was fast, so that was the choice.

<br />

Over time another site came along, neituri.fi, and I chose Astro, which supports JS natively and has built-in image compression.

That is now neituri.com with a different design and contractor.

<br />

One concrete achievement was migrating from Create-React-App to Vite, which significantly sped up the packages installation and build pipeline.

Another was fixing the CRA process hanging during the pipeline build, which was solved through trial and error.

<br />

When frontend tasks amount started to run low, I was offered time to learn Kotlin to support the mobile team.

Thanks to the team's support, after two months I started taking on Android tasks as well, not just frontend (I was assigned tasks I should take first).

<br />

Due to restructuring, the company began winding down operations, so after 2.5 years we had to part ways.
