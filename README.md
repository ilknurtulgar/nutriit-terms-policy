# Nutriit website

Static landing page, privacy policy and terms of use for the Nutriit app, published with GitHub Pages.

## Pages

| Page | English | Turkish |
| --- | --- | --- |
| Landing | `index.html` | `tr/index.html` |
| Privacy policy | `privacy-policy.html` | `tr/privacy-policy.html` |
| Terms of use | `terms-of-use.html` | `tr/terms-of-use.html` |

Shared styles and images are in `assets/`.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site will be available at `https://ilknurtulgar.github.io/nutriit-terms-policy/`.

The app links to:

- `https://ilknurtulgar.github.io/nutriit-terms-policy/privacy-policy.html` (Turkish: `tr/privacy-policy.html`)
- `https://ilknurtulgar.github.io/nutriit-terms-policy/terms-of-use.html` (Turkish: `tr/terms-of-use.html`)

The app opens the Turkish pages when the device language is Turkish, so keep these file names stable.

## Updating

- The privacy policy and terms are generated from `docs/legal/*.md` in the Nutriit app repository. Update the Markdown there, regenerate the pages and update the "Last updated" date.
- The store buttons show "Coming soon". Replace them with the official App Store and Google Play badges and links once the app is live.
