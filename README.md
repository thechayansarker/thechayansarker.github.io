# thechayansarker.github.io

Chayan Sarker's academic profile, served by GitHub Pages from `main`.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Files

- `index.html`: the home page (profile, bio, research, education, experience, honors, skills)
- `work/<project>/index.html`: case studies (Air Health, SensEase, SafeVision)
- `home.css`: shared styles for every page; `case.css` adds case study styles
- `site.js`: theme toggle, footer year, side menu (case pages build it from their section headings)
- `a11y.js`: the accessibility panel (text size, spacing, font, contrast, inputs, motion)
- `assets/`: portrait and favicon (the CV link points to Google Drive)

The header, footer and accessibility panel markup is repeated in each HTML file, so a change to them needs making in all four pages. When you change a CSS or JS file, bump its `?v=` number in the pages that load it so browsers fetch the new copy.

## Run it locally

```
python3 -m http.server 8823
```

Then open http://localhost:8823
