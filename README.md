# discourse-rad-plugin

`discourse-rad-plugin` offers two custom bbcode tags to help adapting the documentation by the reader's desire:

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
[content versions="snap-2.9-UI,deb-2.9-UI"]
Content that shows only for snap-2.9/deb-2.9 and UI. 
[/content]
```

All this plugin does is converting these custom bbcodes to HTML. The docs website will need the javascript package to enable the RAD functionality on the page.

## How does the plugin work?

### 1. Multiple Dropdown RAD element
- the plugin looks for all the `[dropdowns]` elements in the discourse post
- the plugin iterates through each `[dropdowns]` tag and looks at all its `[options]`
- for each unique attribute name (fx. `version`, `view`), it creates a dropdown
- for each unique attribute value (fx. `snap-2.9` or `UI`) it creates a dropdown option for its corresponding dropdown name
- each content inside the `[option]` tag will be assigned a unique class by concatenating the values of the option values together, hyphen separated (fx. the content for the option `[option version="snap-2.9" view="CLI"]` will be `snap-2.9-CLI`). **This means that the option values are case-sensitive**
- option labels match the value of the option. The only transformation that happens is coverting `-` to `` (fx `snap-2.9` will show up at `snap 2.9`)
- the default values on page load will always be the first option values of each unique dropdown
Plugin markdown to html transformation steps:
1. Step 1 html:
```html
<div class="rad-dropdowns-element" data-title="Title">
<div class="rad-option-element" data-version="snap-2-9" data-view="ui">Snap 2.9 UI</div>
<div class="rad-option-element" data-version="snap-2-9" data-view="cli">Snap 2.9 CLI</div>
<div class="rad-option-element" data-version="deb-2-9" data-view="ui">Deb 2.9 UI</div>
<div class="rad-option-element" data-version="deb-2-9" data-view="cli">Deb 2.9 CLI</div>
</div>
```
2. Final html:
```html
<div class="rad-dropdowns-element p-code-snippet">
   <div class="p-code-snippet__header">
      <h5 class="p-code-snippet__title">Title</h5>
      <div class="p-code-snippet__dropdowns">
         <select name="version" class="rad-dropdown-version p-code-snippet__dropdown">
            <option value="snap-2.9">snap 2.9</option>
            <option value="deb-2.9">deb 2.9</option>
         </select>
         <select name="view" class="rad-dropdown-view p-code-snippet__dropdown">
            <option value="UI">UI</option>
            <option value="CLI">CLI</option>
         </select>
      </div>
   </div>
   <div class="rad-option-element p-code-snippet__block snap-2.9-UI">
      <p>Snap 2.9 UI</p>
   </div>
   <div class="rad-option-element p-code-snippet__block snap-2.9-CLI">
      <p>Snap 2.9 CLI</p>
   </div>
   <div class="rad-option-element p-code-snippet__block deb-2.9-UI">
      <p>Deb 2.9 UI</p>
   </div>
   <div class="rad-option-element p-code-snippet__block deb-2.9-CLI">
      <p>Deb 2.9 CLI</p>
   </div>
</div>
```
### 2. Content RAD element
- the plugin looks for all the `[content]` elements in the article
- the plugin looks for the `versions` attribute of the `[content]` tag and comma(`,`) separates the values and adds them to the list of classes of the element

Plugin markdown to html transformation steps:
1. Step 1 html:
```html
<div class="rad-element" data-versions="snap-2-9-UI,deb-2-9-UI">
  Content that shows only for snap-2.9/deb-2.9 and UI. 
</div>
```
2. Final html:
```html
<div class="rad-element snap-2-9-UI deb-2.9-CLI">
  Content that shows only for snap-2.9/deb-2.9 and UI. 
</div>
```
