M8 Tutor Centre

This repository contains a simple public website for M8 Tutor Centre with an application/contact form.

How the form sends applications:
- Quick (no server): Use a third-party form handling service such as Formspree and configure it to forward submissions to tradergmailcom744@gmail.com. Replace the form action in index.html with the Formspree endpoint.
- Self-hosted: Use the included server.js (Node + Express + nodemailer). Set SMTP_HOST, SMTP_USER, SMTP_PASS environment variables and deploy the server. Point the form action to /api/apply.

Files included:
- index.html
- styles.css
- server.js (optional backend)
- package.json

Published as a public repository under the account maithutech1-debug.
