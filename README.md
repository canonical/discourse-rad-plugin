# discourse-rad-plugin

`discourse-rad-plugin` offers three custom BBCode tags to help adapt the documentation by the reader's desire:

### 1. Multiple Dropdown RAD element
```
[dropdowns title="Title"]
[option version="snap-2.9" view="UI"]Snap 2.9 UI[/option]
[option version="snap-2.9" view="CLI"]Snap 2.9 CLI[/option]
[option version="deb-2.9" view="UI"]Deb 2.9 UI[/option]
[option version="deb-2.9" view="CLI"]Deb 2.9 CLI[/option]
[/dropdowns]
```

### 2. Content RAD element
```
[content version="snap-2.9,deb-2.9" view="UI"]
Content that shows only for snap-2.9/deb-2.9 and UI. 
[/content]
```

### 3. Tabs RAD element
```
[tabs name="view"]
[tab value="UI" icon="icon-name"]UI[/tab]
[tab value="CLI" icon="icon-name"]CLI[/tab]
[/tabs]
```

All this plugin does is converting these custom BBCodes to HTML. The docs website will need the javascript package to enable the RAD functionality on the page.

## How does the plugin work?

### 1. Multiple Dropdown RAD element
- the plugin looks for all the `[dropdowns]` elements in the discourse post
- the plugin iterates through each `[dropdowns]` tag and looks at all its `[options]`
- for each unique attribute name (fx. `version`, `view`), it creates a dropdown
- for each unique attribute value (fx. `snap-2.9` or `UI`) it creates a dropdown option for its corresponding dropdown name
- each `[option]` will be converted to a `div` and the `[option]` attributes will be converted to data attributes (fx. the content for the option `[option version="snap-2.9" view="CLI"]` will be `<div data-version="snap-2.9" data-view="CLI"></div>`).
- option labels match the value of the option. The only transformation that happens is converting `-` to `` (fx `snap-2.9` will show up at `snap 2.9`)
- the default values on page load will always be the first option values of each unique dropdown

Plugin markdown to html transformation steps:
1. BBCode:
```
[dropdowns title="Title"]
[option version="snap-2.9" view="UI"]Snap 2.9 UI[/option]
[option version="snap-2.9" view="CLI"]Snap 2.9 CLI[/option]
[option version="deb-2.9" view="UI"]Deb 2.9 UI[/option]
[option version="deb-2.9" view="CLI"]Deb 2.9 CLI[/option]
[/dropdowns]
```
2. Markdown to HTML:
```html
<div class="rad-dropdowns-element" data-title="Title">
<div class="rad-element" data-version="snap-2-9" data-view="UI">Snap 2.9 UI</div>
<div class="rad-element" data-version="snap-2-9" data-view="CLI">Snap 2.9 CLI</div>
<div class="rad-element" data-version="deb-2-9" data-view="UI">Deb 2.9 UI</div>
<div class="rad-element" data-version="deb-2-9" data-view="CLI">Deb 2.9 CLI</div>
</div>
```
2. Final html:
```html
<div class="rad-dropdowns-element p-code-snippet">
   <div class="p-code-snippet__header">
      <h5 class="p-code-snippet__title">Title</h5>
      <div class="p-code-snippet__dropdowns">
         <select name="version" class="rad-dropdown-element p-code-snippet__dropdown"'>
            <option value="snap-2.9">snap 2.9</option>
            <option value="deb-2.9">deb 2.9</option>
         </select>
         <select name="view" class="rad-dropdown-element p-code-snippet__dropdown">
            <option value="UI">UI</option>
            <option value="CLI">CLI</option>
         </select>
      </div>
   </div>
   <div class="rad-element p-code-snippet__block" data-view="snap-2.9" data-view="UI">
      <p>Snap 2.9 UI</p>
   </div>
   <div class="rad-element p-code-snippet__block" data-view="snap-2.9" data-view="CLI">
      <p>Snap 2.9 CLI</p>
   </div>
   <div class="rad-element p-code-snippet__block" data-view="deb-2.9" data-view="UI">
      <p>Deb 2.9 UI</p>
   </div>
   <div class="rad-element p-code-snippet__block" data-view="deb-2.9" data-view="CLI">
      <p>Deb 2.9 CLI</p>
   </div>
</div>
```
### 2. Content RAD element
- the plugin looks for all the `[content]` elements in the article
- all `[content]` attributes will be converted to div data attributes
- an attribute can have more than one value comma separated (`,`)

Plugin markdown to html transformation steps:
1. BBCode:
```
[content version="snap-2.9,deb-2.9" view="UI"]
Content that shows only for snap-2.9/deb-2.9 and UI. 
[/content]
```
2. Final HTML:
```html
<div class="rad-element" data-versions="snap-2-9,deb-2-9" data-view="UI">
  Content that shows only for snap-2.9/deb-2.9 and UI. 
</div>
```

### 3. Tabs RAD element
- the plugin looks for all the `[tabs]` elements in the article
- the `[tabs]` `name` attribute will be the name of the criteria
- each `[tab]` element has a `value` element
- a `[tab]` element can also have an optional `icon` attribute; the `icon` attribute sets the tab icon.

Plugin markdown to html transformation steps:
1. BBCode:
```
[tabs name="view"]
[tab value="UI" icon="icon-name"]UI[/tab]
[tab value="CLI" icon="icon-name"]CLI[/tab]
[/tabs]
```
2. Markdown to HTML:
```html
<div class="rad-tabs-element" data-name="view">
  <div class="rad-tab-element" data-value="UI" data-icon="icon-name">UI</div>
  <div class="rad-tab-element" data-value="CLI" data-icon="icon-name">CLI</div>
</div>
```
3. Final HTML:
```html
<div class="rad-tabs-element p-button-group" data-name="view">
  <div class="p-button-group__inner">
    <div class="p-button-group__buttons">
      <div class="rad-tab-element p-button-group__button is-smaller is-selected" data-value="CLI">
        <i class="p-icon--icon-name"></i><span>CLI</span>
      </div>
      <div class="rad-tab-element p-button-group__button is-smaller" data-value="UI">
        <i class="p-icon--icon-name"></i><span>UI</span>
      </div>
    </div>
  </div>
</div>
```
