# chayan.design personal site

A single page personal site: centred column, halftone portrait, numbered
sections, a 3D bookshelf, a record shelf, a tree footer with live local time,
and a floating dock with a light/dark toggle.

Plain HTML, CSS and JavaScript. No build step and no dependencies, so GitHub
Pages can serve it exactly as it is.

## Run it locally

```
python3 -m http.server 8823
```

Then open http://localhost:8823

## Edit the content

Everything you would want to change lives in **`data.js`**: name, bio,
experience, work, the games you're playing, books, footer links and the dock.

Bio paragraphs support two markers:

* `*emphasis*` for subtle bold
* `[label](https://url)` for links (external links get an arrow)

### Portrait

Set `portrait` in `data.js` to your image. `portraitStyle` picks how it is
drawn: `ascii` (monospace characters), `illustration` (the image as is, white
background removed) or `halftone` (dots).

### Books

Each book has a title, author initials, spine colour, text colour, spine width,
height, an optional `cover` image and a `link`. Click a spine to open it, click
the open cover to follow the link.

Shelf settings in `data.js`:

| Setting      | What it does |
| ------------ | ------------ |
| `coverWidth` | Width of an opened cover |
| `gap`        | Space between spines |
| `lean`       | Tilt in degrees. Books left of the open one lean one way, books right of it the other |
| `titleLine`  | How far above the shelf the spine titles start |
| `align`      | `packed`, `even`, `split` or `centered` |

### Work and case studies

Each entry in `work` in `data.js` is a row on the home page with a title,
a one line summary, a year and an `href`. Case studies live in their own
folder, for example `work/sensease/index.html`, with images beside them in
`work/sensease/images/`.

To add a project, copy the `work/sensease` folder, rename it, rewrite the
page, and add a row to `work` pointing at the new folder. Keep
`data-root="../../"` on the page's `<body>` so the dock and footer links lead
back to the home page.

### Recently playing

Each game has a title, a `cover` image and a `link`. Click to feature one,
click the featured cover to follow its link.

## Deploy to GitHub Pages

1. Create a new repository on GitHub. To serve it at
   `https://<username>.github.io`, name it `<username>.github.io`.
   Any other name serves it at `https://<username>.github.io/<repo>`.
2. Push this folder:

   ```
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub open **Settings**, then **Pages**. Under **Build and deployment**
   choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. The site is live about a minute later at the address shown on that page.

To use your own domain (for example `chayan.design`), add it under
**Settings > Pages > Custom domain** and point your DNS at GitHub as the page
instructs.
