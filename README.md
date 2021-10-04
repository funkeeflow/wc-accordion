# wc-accordion 🏖

A a11y ready web component for your basic accordion needs. Small, simple, nothing more.

## Demo

See the demo [here](link-demo) ☀️

## Usage

Just wrap your standard [\<details\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) elements. Style your summary as you need. Take a wrapper class for your content and thats it!

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

## Lincense

MIT
