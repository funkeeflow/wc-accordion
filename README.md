# wc-accordion 🏖
A vanilla, a11y ready web component for your basic accordion needs. Small, simple, nothing more.

This is mostly inspired by [this post][link-post] from Louis Hoebregts (@Mamboleoo).

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
Then just wrap your standard [\<details\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) elements. Style the `<summary>` tag as you need. Take a wrapper class for your content and thats it!

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

To use a custom name for the element, import default class and define the element your self like so:

```js
import { Accordion } from 'wc-accordion.js'

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



[link-demo]: https://funkeeflow.github.io/wc-accordion/
[link-license]: https://github.com/funkeeflow/wc-accordion/blob/master/LICENSE
[link-post]: https://css-tricks.com/how-to-animate-the-details-element-using-waapi/

## Lincense

[MIT][link-license]
