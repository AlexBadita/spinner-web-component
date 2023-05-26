# spinner-web-component
A web component that displys a spinner and blocks all interactions with the rest of the application or a component of it until the animation finishes.

It requires `jQuery` to work.

## Usage
To cover the entire application it's sufficient to add the following code inside the `body`:
```html
<!-- Displaying the spinner -->
<spinner-comp></spinner-comp>

<!-- Displaying the spinner with a message underneath -->
<spinner-comp>Loading...</spinner-comp>
```

To cover just a component of the application it must be used inside a `container` with `position: relative`:
```html
<div class="container">
  <spinner-comp></spinner-comp>
</div>
```
```css
.container {
  position: relative
}
```

## Properties
The following custom properties are available to customize the spinner:

| Property | Default | Desciption |
|----------|---------|------------|
|`circleColor`|`#FFF`|The color of the circle|
|`spinnerColor`|`#4b9cdb`|The color of the spinner (the moving part)|
|`duration`|`0`|The duration of the animation. If the value is `0` it will run indefinetly|
|`size`|`48`|The circle size (represented in `px`)|
|`width`|`5`|The thickness of the circle (represented in `px`)|
|`active`|`true`|`true` for displaying the spinner and `false` for hiding it|

If a property is used with an invalid value, the default will be used.

## Using a `script` to interact with the spinner
All properties can be edited from a `script`, except for the `active` property. Here is an exemple:
```html
<spinner-comp></spinner-comp>

<script>
  const spinner = document.querySelector("spinner-comp");
  spinner.duration = 5;
</script>
```

Additionally, there is one method to activate a spinner (`showSpinner()`) and another one to deactivate a spinner (`hideSpinner()`).

Exemple to activate a spinner from `script`, using a button:
```html
<spinner-comp></spinner-comp>
<button id="btn">Activate spinner</button>

<script>
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    document.querySelector("spinner-comp").showSpinner();
  });
</script>
```

Exemple to deactivate a spinner from `script`, using a button:
```html
<div class="container">
  <spinner-comp></spinner-comp>
</div>
<button id="btn">Dectivate spinner</button>

<script>
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    document.querySelector("spinner-comp").hideSpinner();
  });
</script>
```
