# CSE Student Portfolio
Link : https://portafolio-de-mosabbir.netlify.app/
Modern portfolio built with React, TypeScript, Vite, Framer Motion, and Lucide icons.

## Update Your Information

Edit `src/profile.ts` to update:

- name, role, location, email, phone
- GitHub, LinkedIn, and portfolio links
- skills, projects, experience, stats
- resume path and photo path

## Add Your Photo

Put your image in the `public` folder and name it:

```txt
profile-photo.jpg
```

Or change the `photo` value in `src/profile.ts` to your own file path.

## Add Your Resume

Put your resume PDF in the `public` folder and name it:

```txt
resume.pdf
```

Or change the `resumeUrl` value in `src/profile.ts`.

## Contact Form

The contact form opens the visitor's email app with your email address, subject, and message filled in. To change the receiving address, update `email` in `src/profile.ts`.

The contact section also includes a copy-email button for quick outreach.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy On Netlify

Netlify is already configured with `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `24`

The resume PDF is copied from `public/resume.pdf` into the production build automatically.
