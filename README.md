# Rakesh Kumar Panda Portfolio Website

A static portfolio site. No build step, no framework, no database. It runs on any static host.

## Files
- index.html : page structure and SEO tags (name, title, description)
- assets/js/data.js : ALL website text. Edit this file to change content.
- assets/js/main.js : renders data.js into the page. No need to edit.
- assets/css/style.css : colours and fonts. Colours are the variables at the top.
- assets/resume/ : resume PDF and DOCX used by the Download button
- assets/img/ : favicon and your profile photo

## How to update content
1. Open assets/js/data.js in VS Code.
2. Change any text inside the quotes. Keep commas and brackets as they are.
3. To add a project, copy one block inside "projects" and edit it. Put a GitHub link in "repo" to show a View code link.
4. To change the resume, replace the PDF in assets/resume/ with the same file name.
5. Preview locally: double-click index.html, or run `python -m http.server 8000` in this folder and open http://localhost:8000
6. Push to GitHub (or redeploy) to publish the change.

## Hosting options
Full step-by-step instructions are in the Profile Playbook. Short version:

GitHub Pages (recommended, free)
1. Create a public repo named `<your-username>.github.io`
2. Upload every file in this folder to the repo root (index.html must be at the root)
3. Settings > Pages > Source: Deploy from a branch > Branch: main / (root) > Save
4. Site is live at https://<your-username>.github.io in 1 to 3 minutes

Netlify: app.netlify.com > Add new site > Deploy manually > drag this folder in.
Vercel: vercel.com > Add New > Project > import the GitHub repo > Framework preset: Other > Deploy.

## After the site is live
- Update "siteUrl" in data.js and the og/meta tags in index.html with your real URL
- Add the URL to LinkedIn (Contact info > Website), GitHub profile and resume header
