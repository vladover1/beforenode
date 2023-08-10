# DECBASE

Personal site of one company.

## Commands

* `npm i` - install dependencies
* `npm run dev` - start in dev mode, all bundles are in the `dev/` folder, the static files are in the `source/static` folder.
* `npm run build` - build production version. All product will be in the `build/` directory.

## About my desicion

* Gulp as a task runner, esbuild as a js bundler.
* Intersection observer API for observe by visibility of Blog section in viewport.
* Projects section. I used the stubs of photos data, bacause they have both the titles and descriptions, and there are filters (by photo albums).
* Public API. I use leaflet map API with google map layer, use Sograda Familia from mockup storytelling as map center and pin.
* Verifying user activity. I assumed that with any user activity there would be any scrolling on the site.
