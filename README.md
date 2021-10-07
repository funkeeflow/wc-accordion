# wc-accordion 🏖
A vanilla, a11y ready web component for your basic accordion needs. Small, simple, nothing more.

This is mostly inspired by [this post][link-post] from Louis Hoebregts ([@Mamboleoo](https://twitter.com/mamboleoo)).

## Demo

Check out the [demo page][link-demo]. ☀️

## Usage

```bash
npm install wc-accordion
```
in your app entry point (e.g. `app.js`)
```js
import 'wc-accordion.js'
```
or import directly from **unpkg.com**
```html

<script type="module" src="https://unpkg.com/wc-accordion"></script>
```
Then just wrap your standard [\<details\>][detials] elements. Style the `<summary>` tag as you need. Take a wrapper class for your content and thats it!

```html
  <wc-accordion class="accordion">
    <details>
      <summary>Some details</summary>
      <div class="wrapper">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        </p>
      </div>
    </details>
    <details>
      <summary>Some details</summary>
      <div class="wrapper">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        </p>
      </div>
    </details>
    <details>
      <summary>Some details</summary>
      <div class="wrapper">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        </p>
      </div>
    </details>
  </wc-accordion>

```

## How to use a custom component name

To use a custom name for the element, import the default class and define the element yourself like so:

```js
import { Accordion } from 'wc-accordion'

customElement.define('my-accordion', Accordion);
```

```html
<my-accordion>
...
</my-accordion>
```

## Properties

| Property              | Type                   | Description                                      |
|-----------------------|------------------------|--------------------------------------------------|
| **close**               | `(index: any) => void` | Close a item by index |
| **closeAll**            | `() => void`           | Close all at once |
| **open**                | `(index: any) => void` | Open a item by index |
| **openAll**             | `() => void`           | Open all at once |

## Attributes
| Attributes            | Values                 | Description                                     |
|-----------------------|------------------------|-------------------------------------------------|
| **mode**                | `exclusive`, `normal`  | Exclusive will limit to only one open item at a time


## CSS Custom Properties

Use the following custom properties on the your `<detials>` elements to set animation timings and easing.

| Property              | Value                  |
|-----------------------|------------------------------|
| **--animation-duration**  | Duration of the animation    |
| **--animation-duration-start**  | Duration of the open animation    |
| **--animation-duration-end**  | Duration of the closing animation    |
| **--animation-easing**    | Animation ease (e.g. `ease-in`)      |

 **@media (prefers-reduced-motion)**

The component queries the CSS Media feature [prefers-reduced-motion][prefers-reduce-motion] and if set it will skip open and close animation all together.

## Development
Install dev dependencies

```bash
yarn install
```
Link local package
```bash
yarn run link
yarn link wc-accordion
```
Run dev server
```bash
yarn dev
```

[link-demo]: https://funkeeflow.github.io/wc-accordion/
[link-license]: https://github.com/funkeeflow/wc-accordion/blob/master/LICENSE
[link-post]: https://css-tricks.com/how-to-animate-the-details-element-using-waapi/

[prefers-reduce-motion]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

[detials]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
## Lincense

[MIT][link-license]
