# discourse-rad-plugin

`discourse-rad-plugin` offers custom BBCode tags to help adapt the documentation by the reader's desire:

### Tabs RAD element
```
[tabs]
[tab version="snap-2.9,snap-2.8" view="UI"]
# Snap 2.9 or 2.8 UI
[/tab]
[tab version="snap-2.9,snap-2.8" view="CLI"]
# Snap 2.9 or 2.8 CLI
[/tab]
[tab version="deb-2.9,deb-2.8" view="UI"]
# Deb 2.9 or 2.8 UI
[/tab]
[tab version="deb-2.9,deb-2.8" view="CLI"]
# Deb 2.9 or 2.8 CLI
[/tab]
[/tabs]
```

All this plugin does is converting these custom BBCodes to HTML. The docs website will need the [javascript package](https://github.com/canonical-web-and-design/discourse-rad-parser) to enable the RAD functionality on the page.

## How does the plugin work?

### 1. Tabs RAD element
- the plugin looks for all the `[tabs]` elements in the discourse post
- the plugin iterates through each `[tabs]` element and looks at each `[tab]` element
- for each unique attribute name (fx. `version`, `view`), it creates a dropdown
- for each unique attribute value (fx. `snap-2.9` or `UI`) it creates a dropdown option for its corresponding dropdown name
- an attribute can have more values, comma separated
- each `[tab]` will be converted to a `div` and the `[tab]` attributes will be converted to data attributes (fx. the content for the option `[option version="snap-2.9,snap-2.8" view="CLI"]` will be `<div data-version="snap-2.9,snap-2.8" data-view="CLI"></div>`).
- the default values on page load will always be the first option values of each unique dropdown

Plugin markdown to html transformation steps:
1. BBCode:
```
[tabs]
[tab version="snap-2.9,snap-2.8" view="UI"]
# Snap 2.9 or 2.8 UI
[/tab]
[tab version="snap-2.9,snap-2.8" view="CLI"]
# Snap 2.9 or 2.8 CLI
[/tab]
[tab version="deb-2.9,deb-2.8" view="UI"]
# Deb 2.9 or 2.8 UI
[/tab]
[tab version="deb-2.9,deb-2.8" view="CLI"]
# Deb 2.9 or 2.8 CLI
[/tab]
[/tabs]
```
2. Markdown to HTML:
```html
<div class="discourse-rad-element">
  <div class="js-rad-tabs-element">
    <div class="js-rad-content-element" data-version="snap-2.9,snap-2.8" data-view="UI">
      <h1>Snap 2.9 or 2.8 UI</h1>
    </div>
    <div class="js-rad-content-element" data-version="snap-2.9,snap-2.8" data-view="CLI">
      <h1>Snap 2.9 or 2.8 CLI</h1>
    </div>
    <div class="js-rad-content-element" data-version="deb-2.9,deb-2.9" data-view="UI">
      <h1>Deb 2.9 or 2.8 UI</h1>
    </div>
    <div class="js-rad-content-element" data-version="deb-2.9,deb-2.8" data-view="CLI">
      <h1>Deb 2.9 or 2.8 CLI</h1>
    </div>
  </div>
</div>
```
2. Final html:
```html
<div class="discourse-rad-element">
  <div class="js-rad-tabs-element p-code-snippet">
     <div class="p-code-snippet__header">
        <h5 class="p-code-snippet__title"></h5>
        <div class="p-code-snippet__dropdowns">
           <select name="version" class="js-rad-dropdown-element p-code-snippet__dropdown"'>
              <option value="snap-2.9">snap 2.9</option>
              <option value="snap-2.8">snap 2.8</option>
              <option value="deb-2.9">deb 2.9</option>
              <option value="deb-2.8">deb 2.8</option>
           </select>
           <select name="view" class="js-rad-dropdown-element p-code-snippet__dropdown">
              <option value="UI">UI</option>
              <option value="CLI">CLI</option>
           </select>
        </div>
     </div>
     <div class="js-rad-content-element p-code-snippet__block" data-view="snap-2.9,snap-2.8" data-view="UI">
        <p>Snap 2.9 or 2.8 UI</p>
     </div>
     <div class="js-rad-content-element p-code-snippet__block" data-view="snap-2.9,snap-2.8" data-view="CLI">
        <p>Snap 2.9 or 2.8 CLI</p>
     </div>
     <div class="js-rad-content-element p-code-snippet__block" data-view="deb-2.9,deb-2.8" data-view="UI">
        <p>Deb 2.9 or 2.8 UI</p>
     </div>
     <div class="js-rad-content-element p-code-snippet__block" data-view="deb-2.9,deb-2.8" data-view="CLI">
        <p>Deb 2.9 or 2.8 CLI</p>
     </div>
  </div>
</div>
```

## Contributing 

If you would like to help improve this project, here is a list of steps to help you get started.

### Get Discourse running locally 

1. Clone discourse repository:
```
git clone https://github.com/discourse/discourse.git
cd discourse
```

2. Launch Discourse locally:
```
d/boot_dev --init
    # wait while:
    #   - dependencies are installed,
    #   - the database is migrated, and
    #   - an admin user is created (you'll need to interact with this)

# In one terminal:
d/rails s

# And in a separate terminal
d/ember-cli
```

3. Go to http://localhost:4200

### Get the plugin to run

```
cd plugins
git clone git@github.com:canonical-web-and-design/discourse-rad-plugin.git
```

Restart the discourse instance if it was running.

## Reporting errors

If you have found a bug, a vulnerability or have an idea to improve the plugin, please [create a new issue](https://github.com/canonical-web-and-design/discourse-rad-plugin/issues/new), or suggest a fix by creating a pull request.
