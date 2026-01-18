# Glossary

`<!DOCTYPE html>`
The required first line of every HTML file for telling the browser what version of html to use. A doctype of html will use the modern HTML5 standard. While a page will usually render properly without a doctype declaration, they should still always be included as some older browsers will not render pages following the modern specification without it (this is sometimes called "quirks" mode).

`<a>`
The anchor tag, used for linking to other pages. This tag should include an href attribute with the path to the page being linked (absolute or relative). For example:

`<a href="https://algoexpert.io">AlgoExpert</a>`
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a>

`<base>`
A tag for setting the document base URL, which will be used for all relative links on the page. For example:

<!-- This line goes in the <head> -->
<base href="https://algoexpert.io" />

<!-- This would go to https://algoexpert.io/frontend -->

`<a href="/frontend">FrontendExpert</a>`
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base>

`<body>`
The tag containing the content of the webpage. The <body> of the HTML file should be the second tag within the <html> tag, just below the <head>.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body>

`<br>`
The line break tag. This is an empty tag used to create a line break in text, such as for the introduction of an email or new lines in a poem. However, this tag should not be used just for spacing out elements as that can be accomplished with CSS. For example:

```html
<p>
  Dear User, <br />
  We hope you are enjoying FrontendExpert!
</p>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br>

`<em>`
The emphasis tag, usually rendered as italics by default in the browser. For example:

`<p>I <em>need</em> to study!</p>`
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em>

`<form>`
An HTML tag for a section of interactive inputs, used for submitting information to the server. Forms usually contain a variety of label-input pairs and a submit button.

For example, this is a valid HTML form:

```html
<form>
  <label for="username">Username:</label>
  <input
    type="text"
    id="username" />

  <label for="password">Password:</label>
  <input
    type="password"
    id="password" />

  <button>Submit</button>
</form>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form>

`<head>`

The tag containing metadata about the HTML document (i.e. anything that isn't displayed on the page). The `<head>` of the HTML file should be the first tag within the `<html>` tag.

The `<title>` is the only required tag within the `<head>`. This tag gives the page a title, which is used for the name of the tab in most browsers, and it gets used for search results in many search engines.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head>

`<hr>`
The horizontal rule tag. This is an empty tag used to create a thematic break between content, drawn as a horizontal line by default. For example:

```html
<p>Part 1</p>
<hr />
<p>Part 2</p>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr>

`<img>`
The image tag. This is an empty tag, and it should always include two primary attributes:

src: The path to the image, either relative or absolute.
alt: Alternative text to be used with screen readers or any time the image cannot be displayed.

```html
<img
  src="img/dog.png"
  alt="dog" />
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img>

`<li>`
The list item tag, used for individual elements in both unordered and ordered lists.

List items can also contain other lists to create nested lists. For example:

```html
<ol>
  <li>Step 1</li>
  <li>
    Step 2:
    <ol>
      <li>Substep 1:</li>
      <li>Substep 2:</li>
    </ol>
  </li>
  <li>Step 3</li>
</ol>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li>

`<link>`
A self-closing HTML tag for linking to external resources, usually CSS stylesheets. When linking to a stylesheet, <link> will take two attributes:

rel: The relationship to the other document. For CSS files, this should be stylesheet.
href: The path to the linked file, either relative or absolute.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link>

`<meta>`
An HTML tag for providing extra metadata about a webpage. Most meta tags will use a name and content pair for the type of metadata and its value.

These are some of the more common metadata tags:

```html
<!-- Sets the character encoding to utf-8 -->
<meta charset="utf-8" />

<!-- Allows for custom responsive CSS, rather than the default scaling behavior of small devices -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1" />

<!-- Sets the page author -->
<meta
  name="author"
  content="Conner Ardman" />

<!-- Sets the page description -->
<meta
  name="description"
  content="Ace the frontend interviews!" />
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta>

`<ol>`
The ordered list tag, used for a list where the order matters. By default, most browsers will show this as a numbered list.

The ordered list should contain any number of <li> tags. For example:

```html
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
  <li>Step 3</li>
</ol>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol>

`<p>`
The paragraph tag, usually used for blocks of text (although they can contain other elements that are part of the paragraph, such as images). For example:

```html
<p>Hello World!</p>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p>

`<pre>`
The preformatted text tag. This tag preserves whitespace, which can be useful when indentation and newlines need to be preserved. For example:

```html
<pre>
    *
   ***
  *****
 *******
*********
   | |
</pre>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre>

`<script>`

The HTML tag for adding JavaScript to the document. Usually the <script> appears in the <head> with no children. Instead of children, it usually has the src attribute set to the path of a JavaScript file.

By default, scripts block the browser from continuing to parse and render the rest of the DOM until the script has finished downloading and executing. However, there are two boolean attributes that can change this behavior:

defer: Fetch the script asynchronously without blocking the page. Only execute the script after the DOM has finished being parsed.
async: Fetch the script asynchronously without blocking the page. Whenever the script is ready, stop parsing the DOM and execute the script. This is usually only for scripts that do not need access to the DOM, because otherwise the behavior will be inconsistent based on how quickly the script downloaded.
Alternatively, scripts were traditionally placed at the bottom of the <body> to ensure the DOM finished loading before running the script. However, this is usually slower than using the defer attribute, since the script will not be downloaded until reaching the script tag at the end of the body.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script>

`<strong>`
The strong tag, usually rendered as bold by default in the browser. For example:

```html
<p><strong>Note:</strong> This is important!</p>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong>

`<table>`
An HTML tag for representing data with rows and columns. As a general rule, anything that could go in a spreadsheet probably also makes sense in a `<table>`

There are a variety of tags associated with tables, with these being some of the most common:

```html
<tr>
  : A single row in the table.
  <th>: A heading in the table. This should be used with the scope attribute of either row or col to choose what the content is a heading for.</th>
  <td>
    : A single piece of data in the table, also referred to as a cell.
    <thead>
      : A grouping tag for the heading of a table, usually containing a single
      <tr>
        with column headings.
        <tbody>
          : A grouping tag for the body of the table, used for containing the primary rows of data.
        </tbody>
        <tfoot>
          : A grouping tag for the footer of the table.
          <caption>
            : A caption or title for the table. For example, this is a valid HTML table:
          </caption>
        </tfoot>
      </tr>
    </thead>
  </td>
</tr>
```

```html
<table>
  <caption>
    AlgoExpert Products
  </caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">AlgoExpert</th>
      <td>5</td>
    </tr>
    <tr>
      <th scope="row">SystemsExpert</th>
      <td>5</td>
    </tr>
  </tbody>
</table>
```

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table>

## TODO

<ul>
The unordered list tag, used for a list where the order does not matter. By default, most browsers will show this as a bulleted list.

The unordered list should contain any number of <li> tags. For example:

<ul>
    <li>AlgoExpert</li>
    <li>SystemsExpert</li>
    <li>MLExpert</li>
    <li>FrontendExpert</li>
</ul>
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
@keyframes
A keyword for defining points within an animation timeline. An animation is made up of a variety of keyframes, and the browser will fill in the spaces between the keyframes based on the timing function. Keyframes are defined using this syntax:

@keyframes animation-name {
from {
property: value;
property: value;
}

50% {
property: value;
property: value;
}

to {
property: value;
property: value;
}
}
The from and to keywords are equivalent to 0% and 100% respectively.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes>
Absolute Unit
A unit whose value is not dependent on something else, so its size will be constant regardless of the context. In general, the px unit is the only one of these used on the web.

Accessibility
Building applications usable by as many people as possible. Oftentimes this means utilizing semantic HTML and ensuring the application works properly with various assistive technologies.

Accessibility Tree
A tree representation of the page focusing on information specific to accessibility. Each node in this tree contains information such as the role, state, name and description.

The accessibility tree is created from the DOM tree and kept in sync with it. Assistive technologies such as screen readers interact with the accessibility tree rather than directly with the DOM.

Learn more: <https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree>
Animations
A css module for animating properties, very similar to transitions, but with a bit more control. An animation is defined using keyframes as well as these properties:

animation-name: The name of the keyframes animation.
animation-duration: How long the animation should take.
animation-fill-mode: If the element should stay in its animated position after the animation completes or if it should move to the starting position of the animation before it begins, specified with the backwards and forwards values respectively or both to follow the rules of both values.
animation-direction: If the animation should play in normal or reverse order. A value of alternate can also be used to switch between normal and reverse, or alternate-reverse can be used to do the same, but starting with the reverse direction.
animation-iteration-count: How many times to run the animation, or infinite to run the animation indefinitely.
animation-play-state: If the animation is currently running or paused. This is particularly useful for pausing an animation using JavaScript.
animation-timing-function: How the animation should progress through the keyframes. This can take a variety of keyword values, such as linear and ease-in, or custom values using the cubic-bezier() or steps() functions.
animation-delay: How long to wait before starting the animation.
Alternatively, the animation property can be used as a shorthand for all of these values. The first time value will be used for the duration, and the second will be used for a delay. Other than that, the order usually will not matter assuming the animation-name is not using a conflicting keyword with another possible value.

For example after a two second delay, this would run the move animation over three seconds with the ease timing function. The animation would continue to run indefinitely, alternating the order each time.

animation: move 3s ease infinite alternate 2s;
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations>
API Key
A unique key used to identify an application to an API. These keys are sent with each request and thus should be considered public information when working on a public application.

Application Programming Interface
Oftentimes referred to by the abbreviation API, the interface by which programs agree to communicate with each other.

Array
A data structure for storing lists of information.

JavaScript arrays are mutable and can contain data of different types. While these are just standard objects, they have a special syntax for easily creating and updating them. For example:

const arr = [1, 2, 3];
console.log(arr[1]); // 2
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array>
Arrow Function
A more concise function syntax, particularly useful for replacing short anonymous functions. The basic syntax for an arrow function is:

(param1, param2) => {
doSomething(param1, param2);
return 'hello world';
}
However, if an arrow function only requires one line, then the curly braces and return keyword can be removed. Additionally, when these are used inline such as for a call to the array map function, the semicolon must be removed. Finally, if there is only one parameter, the parentheses around the parameter can also be removed. For example, this code will create an array with the values doubled:

[1, 2, 3, 4].map(num => num \* 2);
There are a few constraints to arrow functions which will be explored throughout the crash course. The most important of these is that arrow functions do not have their own this binding. Additionally, arrow functions cannot be used as constructors or generators.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>
async function
A function declared using the async keyword, causing the function to implicitly return a Promise and allowing for usage of the await keyword.

Asynchronous functions are primarily an alternative syntax to chaining calls to Promise.then.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function>
Atomic CSS
A CSS methodology based on the idea of minimizing any repeated declarations. Rather than creating classes based on components, Atomic CSS creates utility classes based on single declarations. For example, in Atomic CSS a "margin-12" class might be created that adds 12 pixels of margin, rather than including that declaration on all of the components needing 12 pixels of margin.

Attribute
Extra information provided to HTML elements, similar to function parameters.

Attributes use the syntax <tagname attribute="value">content</tagname>. The attribute name will always come after the tag name, with a space in between them. The quoted value will then be separated from the attribute name by an equals sign. For example, we can create an input of type "checkbox" with <input type="checkbox" />.

A small number of attributes are booleans rather than strings. Any value for a boolean attribute will be treated as true, so all of the following checkboxes would be disabled.

<input type="checkbox" disabled="disabled" />
<input type="checkbox" disabled="true" />
<input type="checkbox" disabled />

<!--
  This is still disabled, since the attribute is set.
  Of course we don't recommend this though as it is quite confusing to read.
-->
<input type="checkbox" disabled="true" />
Autoformatter
A program that automatically formats code based on a set of rules, making it easy to maintain stylistic consistency. Prettier is the most common autoformatter, but there are other alternatives as well.

await
A keyword indicating that JavaScript should wait for a Promise to settle before continuing execution of the code. Traditionally this is only available in async functions, but it can also be used at the top level of modules.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await>
BEM
The "Block, Element, Modifier" CSS methodology. This breaks CSS classes into three categories:

Blocks: Standalone elements with their own meaning. These are referenced simply by the name of the block such as class="menu".
Elements: Parts of a block without their own meaning. These are referenced by the name of the block, two underscores then the name of the element such as class="menu\_\_item".
Modifiers: Flags to change styles for blocks or elements, such as disabled or selected. These are prefixed by the class they modify and two dashes, and they are included in addition to that original class such as class="menu menu--disabled".
Block Element
An element with its display property set to block. These have a few key properties:

They start on new lines.
By default they span the entire width of their parent.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements>
Block Scope
The behavior of a variable that is only accessible inside of the block it was defined. Most of the time, the block will simply be the nearest pair of curly braces to the declaration.

border
A property used to create a border around the content and padding of an element. The border CSS property is a shorthand for border-color, border-style and border-width, which it takes as space separated values in any order. For example, border: 1px solid black would create a one pixel, solid black border.

A border-radius can also be used to create rounded corners on an element, regardless of if it has a border. This defines the radius of the corners, and a value of 50% is often used on square elements to create a circle.

Additionally, border-top, border-right, border-bottom and border-left can be used to set borders on a single side of an element.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/border>
Box Model
A box surrounding all elements on the document used for layout. From inside to out, this consists of the content, padding, border and margin.

Learn more: <https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model>
box-sizing
A CSS property for specifying how width and height should be calculated for the selected element. The default value is content-box for most elements, which sets the width and height to only control the size of the content. However, a value of border-box would include the size of the padding and border.

For example, if an element has width: 100px, padding: 12px, and border: 24px, then with box-sizing: content-box it would take up a total of 172px of width (note this includes padding and border twice to account for the left and right side). However, with box-sizing: border-box it would only take up a total width of 100px.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing>
Cascading
The order that stylesheets are used. These stylesheets can be grouped into three main categories:

User Agent Stylesheets: Contain browser defaults for styles, these get the lowest level of precedence.
User Stylesheets: Contain user preferences saved in the browser, which override user agent stylesheets.
Author Stylesheets: Contain the CSS code we write, these get the highest level of precedence (assuming !important has not been used).
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade>
Chunking
A process for preventing slow functions from clogging the call stack and thus making the entire page unresponsive. The core idea of chunking is to take large tasks and split them up into smaller ones.

In practice, chunking is usually achieved by using setTimeout after some number of iterations, forcing future chunks to move to the end of the task queue.

Class
A JavaScript syntax to emulate that of classical inheritance, although for the most part it is syntactic sugar on top of function constructors (classes are actually just functions under the hood).

An example class would look like this:

class Person {
static isHuman = true; // public static field
# age; // private instance field

constructor(name, age) {
this.name = name; // public instance field
this.#age = age;
}

// instance method
speak() {
console.log('Hello this is ' + this.name);
}

// instance getter function
get age() {
return this.#age;
}

// instance setter function
set age(value) {
this.#age = value;
}
}

const conner = new Person('Conner', 24);
conner.speak(); // logs "Hello this Conner"
console.log(conner.age); // calls getter function, logs 24
conner.age = 25; // Calls setter function
console.log(conner.#age); // Error cannot access private field
console.log(conner.name); // "Conner"
console.log(conner.isHuman); // undefined
console.log(Person.isHuman); // true
Classes can also extend other classes, which internally creates a prototype chain. In the class constructor, super can be used to call the parent constructor. super.method() can also be used in the class to call parent classes. For example:

class Child extends Person {
constructor(name, age, grade) {
super(name, age);
this.grade = grade;
}
}
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>
Class-Based Component
A JavaScript class that extends the React.Component class and acts as a React component.

All class-based components must implement a render method, which usually returns JSX similar to a functional component.

Instead of taking props as a parameter, all class-based components store their props in the this.props instance variable. Moreover, state is stored in this.state and updated using the this.setState method.

Class-based components cannot use hooks. Instead, they can implement a variety of lifecycle methods that work similar to hooks. These are some of the more common ones:

componentDidMount: Runs immediately after the component mounts. This method is usually used for setting up subscriptions.
componentDidUpdate: Runs immediately after the component updates due to a state or props change. A common use case for this method is for network requests that depend on props or state.
componentWillUnmount: Runs right before a component unmounts. This method is usually used for cleaning up any subscriptions.
shouldComponentUpdate: Similar to React.memo, determines if the component should re-render based on new props and new state values.
Learn more: <https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class>
Client
A machine or process that requests data or service from a server. In the case of the web, browsers are clients that request HTML pages from servers.

Note that a single machine or piece of software can be both a client and a server at the same time. For instance, a single machine could act as a server for end users and as a client for a database.

Client—Server Model
The paradigm by which modern systems are designed, which consists of clients requesting data or service from servers and servers providing data or service to clients.

Closure
A function along with a saved reference to the lexical environment it was defined in. Simply put, this means functions have access to all of the variables in scope at the time of definition, even if the parent function has returned.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
Component
A reusable independent piece of a user interface. In modern React, components are usually functional components, which are simply functions that return JSX.

Component Lifecycle
The different stages that an instance of a component goes through. There are three primary stages to the React lifecycle:

Mounting: The component renders for the first time.
Updating: The component re-renders whenever state changes or the props are updated by the parent component. A component can update many times without ever mounting again.
Unmounting: The component is removed from the DOM. This is the final stage of the lifecycle, and a component cannot update again once it has been unmounted. However, a new instance of the component can still be mounted.
Conditional Rendering
The process of changing the returned element of a component based on some condition. Conditional rendering can be achieved in a variety of ways, but the most common utilizes ternary operators or short circuit evaluation. This works because null, undefined, true and false all do not render anything. For example:

<React.Fragment>
{ myBool ? <h1>Hello World</h1> : null }
{ myOtherBool && <p>React is Awesome!</p> }
</React.Fragment>
Learn more: <https://reactjs.org/docs/conditional-rendering.html>
const
A keyword for declaring a constant value. Constants have the same behavior as variables declared with let, except they cannot be reassigned.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const>
Context
A way to pass values down a component tree without needing to pass props through every component (known as prop drilling). Contexts are generally useful for global state needed throughout an application or page, which would be inconvenient to pass as props to every element needing it.

Learn more: <https://reactjs.org/docs/context.html>
Controlled Component
A pattern of using React state to control the current state of an input, rather than allowing the native elements to control their own state (known as an uncontrolled component). For example, an input can be controlled via the value and onChange props (note that in React, onChange works the same as onInput). For example:

const [value, setValue] = useState('');
return <input value={value} onChange={e => setValue(e.target.value)} />;
Learn more: <https://reactjs.org/docs/forms.html#controlled-components>
Cookies
The simplest form of browser storage, comprised of string key-value pairs. Cookies are most often set by the server to store information such as the logged in user account, however they can also be created via the document.cookie JavaScript property.

CORS
The Cross-Origin Resource Sharing system for circumventing the same-origin policy when a cross-origin request is necessary. A server can allow cross-origin requests by including the Access-Control-Allow-Origin header.

Critical Rendering Path
The process the browser takes to convert frontend files into a user interface. This process has five primary steps:

Parse the HTML and create a DOM tree.
Parse the CSS and create a CSS Object Model tree.
Combine the DOM tree and CSSOM tree into a render tree, containing information about the nodes that are going to be rendered to the page.
Calculate the layout (width, height and location) of nodes based on the viewport size.
Paint the screen using the render tree and layout calculations.
Cross-Site Request Forgery Attack
A common security vulnerability, also known as CSRF, where an attacker sends a request to a server and is able to convince the server it was sent by their client. CSRF attacks can usually be prevented by using a CSRF token, a unique token given to the client that a forged request would not be able to replicate.

Cross-Site Scripting Attack
A common security vulnerability, also known as XSS, where an attacker is able to run code on a vulnerability site, thus circumventing the same-origin policy. There are a few common forms of cross-site scripting:

Persistent: A vulnerability that persists beyond a single session, usually from the attacker storing malicious code in the vulnerable database. A common example of this is leaving a comment with code that when appended to the page by the client is executed.
Non-persistent: A vulnerability that does not persist beyond a single session, usually when an attacker takes advantage of how the client processes a URL query parameter to execute malicious code on the client.
DOM-based: A vulnerability that happens exclusively on the frontend without any need for sending data to the server, thus making the attack harder to track.
CSS
Cascading Style Sheets is the primary styling language of the web. This language is used to describe the style and layout of HTML documents.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS>
CSS Framework
Pre-written code that can be used to simplify development. Oftentimes these include ready to use classes, pre-built components and responsive layout systems.

CSS Grid
A layout model used for creating responsive layouts of multiple rows and columns. An element can be made a grid container with display: grid, and all of its direct children will automatically be laid out as grid items in a single cell.

A rectangular subsection of a grid is known as a grid area. The dividers between each row and column are known as grid lines, and the rows and columns they create are called tracks.

For grid containers, these are some of the most common properties used to layout their grid items:

grid-template-columns: Determines the number of columns and their sizes. The unit fr can be used as a fractional unit here to create a responsive design.
grid-template-rows: Determines the number of rows and their sizes. The unit fr can be used as a fractional unit here to create a responsive design.
grid-template-areas: Creates names for grid areas that grid items can place themselves in.
justify-content: Determines how grid tracks are aligned along the inline-axis (row) with possible values including start, end, center, space-around, space-between, and space-evenly.
align-content: Determines how grid tracks are aligned along the block-axis (column) with possible values including start, end, center, space-around, space-between, and space-evenly.
align-items: Determines how grid items are aligned in columns (called the block-axis). Possible values include start, end, center, and stretch.
justify-items: Determines how grid items are aligned in rows (called the inline-axis). Possible values include start, end, center, and stretch.
place-items: A shorthand for both align-items and justify-items. If one value is given, it will apply to both. If two values are given, they will apply to align-items and justify-items respectively.
gap: Determines the amount of space between grid items. This can take one or two length values. If it is given two, they will be treated as a row gap and a column gap respectively. Alternatively, a row-gap and column-gap property can be specified to individually set the gap between rows and columns.
For grid items, these are some of the most common properties used to position themselves:

grid-column-start: Determines what column this item starts on, based on a line number.
grid-column-end: Determines what column this item ends on, based on a line number.
grid-column: A shorthand for both grid-column-start and grid-column-end specified in the format start / end.
grid-row-start: Determines what row this item starts on, based on a line number.
grid-row-end: Determines what row this item ends on, based on a line number.
grid-row: A shorthand for both grid-row-start and grid-row-end specified in the format start / end.
grid-area: Places the item in a grid-area based on a name created in grid-template-areas.
align-self: Overrides the align-items value used for the grid container.
justify-self: Overrides the justify-items value used for the grid container.
place-self: A shorthand for both align-self and justify-self in the same format as place-items.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout>
CSS Inheritance
How elements choose a value when none has been explicitly declared in any stylesheet. All properties are either inherited properties or non-inherited properties. Inherited properties will take their parent's value in the case no value has been set for the property. Non-inherited properties on the other hand will be set to initial in this case.

While the default groupings of inherited and non-inherited properties is usually all that's needed, this can be changed by using any of these values for any declaration:

inherit: The value should inherit from its parent, regardless of if it is normally an inherited property.
initial: The value should be set to the value defined in the CSS specification. Note this is oftentimes different from browser defaults.
unset: The value should be set to inherit if it is normally an inherited property, otherwise initial. This can be useful for "resetting" browser defaults from the user agent stylesheet.
revert: The value should revert back to the next stylesheet in the cascade. For author stylesheets, this would act as if the author did not write any declaration for the property, but it would still honor the user agent and user stylesheets as normal.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance>
Currying
The process of transforming a function to treat its parameters as a sequence of individual function calls that each take one parameter. For example, func(a, b, c) would become func(a)(b)(c).

Currying is achieved by creating functions that return other functions, taking advantage of closures. For example, a curried sum function would look like this:

function curriedSum(a) {
return function(b) {
return a + b;
};
}
This could then be used to create partial versions of this function, for example an "add four" function:

const addFour = curriedSum(4);
addFour(10); // 14
Custom Hook
A helper function that uses hooks. When hook code becomes redundant or too long to easily read, it can be helpful to move that code into a helper function. To denote that this helper function uses a hook itself, the name should be prefixed with use just like the built-in React hook functions.

Learn more: <https://reactjs.org/docs/hooks-custom.html>
Custom Properties
Also known as variables, these are used to keep track of repeated values in CSS. Custom properties always start with -- and can be included in any ruleset. However, most commonly they are defined on the :root ruleset so the variables will be accessible throughout the website. Custom properties are then used with the var() CSS function. For example, this code defines a custom property called --main-color and uses it for a background color:

:root {
--main-color: #00334C;
}

main {
background-color: var(--main-color);
}
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties>
Declaration
A CSS property-value pair in the form property: value;

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declarations>
Declaration Block
A group of declarations surrounded by {}, such as:

{
color: blue;
margin: 10px;
}
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declaration_blocks>
Destructuring Assignment
A JavaScript syntax for saving values from an array or object in variables. For example:

const [first, second] = [1, 2, 3];
console.log(first); // 1
console.log(second); // 2

const { name } = { name: 'Conner' };
console.log(name); // 'Conner'
When destructuring an object, fields can also be renamed, for example:

const { name: firstName } = { name: 'Conner' };
console.log(firstName); // 'Conner'
Destructuring can also be used in a function parameter, for example:

function printName({ name }) {
console.log(name);
}
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment>
Developer Tools
A set of tooling provided by the browser to simplify the process of debugging frontend code. For example, Chrome comes with the Chrome DevTools .

Document Object Model
The programming interface for interacting with an HTML document represented as a tree data structure. Each HTML element in the document is a node in the DOM tree, with nested content represented as children in the tree.

Dom Manipulation
Using JavaScript to change the content, structure or styles of the page. There are a lot of functions and properties related to dom manipulation, but these are some of the more common ones:

Getting Elements:

document.getElementById(id): Gets a single element based on its id attribute.
document.querySelector(cssSelector): Gets a single element based on a CSS selector. If multiple elements match the selector, returns the first one.
document.querySelectorAll(cssSelector): Gets all elements matching a CSS selector as a NodeList.
document.getElementsByTagName(tagName): Gets all elements with a specific HTML tag as an HTMLCollection.
document.getElementsByClassName(className): Gets all elements with a specific class as an HTMLCollection.
Setting Attributes:

element.style.property: Sets a CSS property using inline styles, although CSS classes should usually be preferred. The style object will only contain inline styles, not those set with CSS.
element.setAttribute('attribute', 'value'): Sets an HTML attribute to a specific value.
element.textContent: The text content of an element, including that of any children. Note: this is slightly different from element.innerText, which only gets text that is actually rendered and element.innerHTML which gets the entire HTML code as a string.
element.attribute: An alternative to the setAttribute function, attributes can be directly edited via their property name. For example, element.value would get the value attribute of the element.
element.classList: An object for updating CSS classes. Specifically, this contains 3 primary functions: add(className), remove(className) and toggle(className).
Adding And Removing Elements:

document.createElement(tagName): Creates a new HTML element.
document.createTextNode(text): Creates a text node as an alternative to setting textContent.
document.createDocumentFragment(): Creates a document fragment, which is useful for appending multiple elements at once after a loop.
element.appendChild(element): Appends an element to the end of the contents of another element.
element.append(node1, node2, ...): Appends 1 or more nodes (elements or text) to the end of the contents of another element.
element.prepend(node1, node2, ...): Prepends 1 or more nodes (elements or text) to the beginning of the contents of another element.
element.remove(): Removes the element from the DOM.
Sizes and Scrolling:

window.innerWidth: The width of the browser window.
window.innerHeight: The height of the browser window.
window.getComputedStyle(element): Gets styles as they are currently rendered on the page, converted to pixels.
element.clientHeight: The height of visible content and padding.
element.offsetHeight: The height of visible content, padding, borders and scrollbars.
element.scrollHeight: The height of all content and padding, including content scrolled out of view.
element.offsetTop: The distance from the outer top border of the element to the inner top border of the nearest positioned parent.
element.scrollIntoView(): Scrolls the container so the element is in view.
element.scrollTo(optionsObj): Scrolls the element to a specified top value in the options object. Additionally, behavior: 'smooth' will create a smooth transition.
Domain Name System
Oftentimes abbreviated as DNS, the process used for translating domain names to IP Addresses.

DRY Component
Short for don't repeat your code, a principle involving refactoring any repeated code into helper functions. In React, we follow DRY principles by moving shared interfaces into helper components and common hook logic into custom hooks.

Error Boundary
A React component that catches errors in child components, preventing the entire application from crashing from a single error.

Error boundaries must be class-based components in order to take advantage of two lifecycle methods:

static getDerivedStateFromError(error): Called during the render phase and updates the current state of the component.
componentDidCatch(error, errorInfo): Called during the commit phase for the purpose of side-effects related to the caught error.
For example, this would be a complete error boundary component:

class ErrorBoundary extends Component {
state = { hasError: false };

static getDerivedStateFromError(error) {
return { hasError: true };
}

componentDidCatch(error, errorInfo) {
logErrorToServer(error, errorInfo);
}

render() {
if (this.state.hasError) {
return this.props.fallback;
}

    return this.props.children;

}
}
Learn more: <https://reactjs.org/docs/error-boundaries.html>
Event Delegation
The process of using a single event listener on a parent element to manually delegate events to children, rather than using event listeners on each child.

Event delegation takes advantage of event propagation. For example, after clicking on a button, that event will bubble up to the parent container.

In the event a container has many children that all have similar event listeners, event delegation can make substantial performance improvements by lowering the total number of active event listeners. The event.target property can then be used to determine which child was the source of the event.

Event Loop
The concurrency model within JavaScript. This is a constantly running loop within the browser, roughly following this algorithm:

Remove one task from the task queue.
Execute code until the call stack is empty.
Execute microtasks one at a time until the microtask queue is empty.
Render any changes to the DOM.
Go to step one.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop>
Event Propagation
The process by which an event travels through the DOM to call event listeners on nested elements. Event propagation consists of 3 phases:

Capturing: The event travels down from the root of the document to the event target.
Target: The event fires on the event target.
Bubbling: The event travels up from the event target to the root of the document.
At any point in the propagation process, an event listener can call event.stopPropagation(), which will stop the propagation process.

Event-Driven Programming
A programming paradigm where code runs as a response to events, usually initiated by the user.

To create an event listener, use element.addEventListener(eventName, callback, useCapture). If the third argument is true, the callback will fire during the capturing phase rather than the default bubbling phase.

Additionally, addEventListener can be called with an options object as the third parameter instead of the useCapture boolean. This object can contain the following possible values:

capture: The same as the boolean argument option; true for capturing, false for bubbling.
once: If true, automatically removes the event listener after the event fires once.
passive: If true, indicates to the browser that event.preventDefault() will not be called. This is useful for the browser to optimize performance, particularly with mobile scrolling events such as touchstart and touchmove to indicate to the browser that scrolling will not be cancelled.
signal: An AbortSignal, usually coming from an AbortController. If the signal's abort() method is called, the event listener will be removed.
To remove an event listener, call element.removeEventListener(eventName, callback, useCapture) or element.removeEventListener(eventName, callback, optionsObj) with the exact same parameters as were used to create the event listener.

Favicon
Also called a favorite icon, the icon for a webpage. Browsers usually show these in a variety of places, such as next to the tab name. Favicons are created using the <link> tag. For example:

<link rel="icon" href="favicon.png" />
fetch
A JavaScript function for making network requests.

fetch(url) returns a pending Promise. Once the network request completes, the promise will either resolve or reject. Any response other than a network error will result in a resolved Promise. The url parameter can be either a string or a URL object.

This function can also take an options object as a second parameter. These are some of the more common options to use:

method: The request method as a string, such as 'GET' or 'POST'.
body: The body of the request, oftentimes used to pass FormData.
headers: Headers to be added to the network request, oftentimes by creating a Headers object, although a standard object can be used as well.
signal: An AbortSignal, usually coming from an AbortController. If the signal's abort() method is called, the request will be aborted.
When the request comes back from the server, the Promise returned by fetch will resolve to a Response object. This object has a variety of properties and methods for interacting with the network response. These are some of the most useful ones:

response.text(): Returns a Promise with a text representation of the response body.
response.json(): Returns a Promise with an object representation of the response body.
response.status: A number representation of the response status code. A successful request will be in the 200-299 range, most commonly 200.
response.ok: A boolean representation of the response status code. A successful request in the 200-299 range will be true, everything else evaluates to false.
response.headers: A Headers object containing the headers included with the response.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/fetch>
Flexbox
A layout model, also known as the Flexible Box Layout Module, particularly useful for building responsive designs with row or column layouts. An element can be made a flex container with display: flex, and all of its direct children will automatically be laid out as flex items.

For flex containers, these are some of the most common properties used to layout their flex items:

flex-direction: Determines which direction is the main-axis, either row or column. Additionally, row-reverse and column-reverse can be used to reverse the order of flex items.
justify-content: Determines how elements are positioned along the main-axis with possible values of flex-start, flex-end, center, space-around, space-between, and space-evenly.
align-items: Determines how elements are positioned along the cross-axis (the one not selected by flex-direction). Possible values are flex-start, flex-end, center, baseline, and stretch.
flex-wrap: Determines if flex items can wrap to new lines with possible values of wrap and nowrap. wrap-reverse can also be used to wrap flex items with the lines in reverse order.
align-content: Determines how lines are positioned along the cross-axis when flex items are wrapping on multiple lines. Possible values are flex-start, flex-end, center, space-around, space-between, and stretch.
flex-flow: A shorthand for flex-direction and flex-wrap.
gap: Determines the amount of space between flex items. This can take one or two length values. If it is given two, they will be treated as a row gap and a column gap respectively. Alternatively, a row-gap and column-gap property can be specified to individually set the gap between rows and columns.
For flex items, these are some of the most common properties used to position themselves:

align-self: Overrides the align-items value used for the flex container.
flex-basis: Sets the initial size of the flex item along the main-axis (essentially this will act as width for the row axis and height for the column axis).
flex-grow: Determines if the flex item is able to grow into extra space. If the value is 0, the flex item will not grow. Otherwise, it will take up as much extra space as possible, with larger grow values taking more space proportionally. For example, if item A has a value of 1 and item B has a value of 2, then item B will take up twice as much extra space as item A (Note this does not mean it will be twice as large, only that it will take twice as much of the extra space).
flex-shrink: Determines if a flex item is able to shrink in the case that the flex items are too large for the container. Flex items with a value of 0 will not shrink. Otherwise they will all shrink proportionally based on their values, similar to flex grow. The higher the value, the more the flex item will potentially shrink.
flex: A shorthand property for flex-grow, flex-shrink, and flex-basis in that order.
order: Moves the flex-item to a different location amongst the other flex items rather than using the order defined in the DOM. All flex items default to having a value of 0. This means a value of -1 would move an item before all other items that have not changed their order. Likewise, a value of 1 would place the item at the end.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout>
Function Constructor
A function intended to be used to construct an object using the new operator.

When the new operator is used, a new object is created automatically. The prototype of the new object is then set to the prototype property of the constructor function (remember functions are just objects). Finally, the constructor function is called with the new object bound to this.

By default the prototype property of the function will simply be an object with its constructor property set to the function itself. However, this can be changed, for example:

function Person(name) {
this.name = name;
}

// This object will become the [\[Prototype\]] of
// any objects resulting from a new Person() call
Person.prototype = {
constructor: Person,
isHuman: true
}

const clement = new Person('Clement');
console.log(clement.isHuman); // true, comes from the prototype object.
Function Scope
The behavior of a variable that is accessible anywhere inside of the function it was defined.

Gatsby
A JavaScript framework with the primary use case of static-site generation. In addition to static-site generation, Gatsby also includes a wide variety of other features that simplify development and improve performance, similar to Next.js.

Learn more: <https://www.gatsbyjs.com/>
Generator
An iterable object created by using a generator function.

A generator function is defined using function\*. Then each yield results in another item being added to the iterable generator object.

The generator object has three methods:

next(value): Returns an object with the next value in the iterator and a done boolean. Optionally passes a value back into the generator function.
return(value): Adds a passed in argument to the iterable results and ends iteration.
throw(error): Throws an error, stopping code execution unless the error is caught.
For example:

function\* genNumbers() {
const x = yield 1;
yield x + 2;
yield 3;
}

const generatorObj = genNumbers();
console.log(generatorObj.next().value); // 1
console.log(generatorObj.next(3).value); // 5
console.log(generatorObj.return(7).value); // 7
console.log(generatorObj.next().value); // undefined
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator>
GraphQL
A query language for querying APIs by describing the format of the requested data. GraphQL has major benefits in only sending necessary data on the network and potentially combining requests for multiple resources into a single request.

Heading Tags
HTML tags represented by <h1> through <h6>. <h1> is the top level heading, while <h2> is a secondary subheading and so on. For example:

<h1>Main Heading</h1>
<h2>Secondary Heading</h2>
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
Hoisting
The process by which the JavaScript engine moves variable declarations to the top of their scope, allocating memory for them before reaching the line of code where they are declared. For variables declared with var, they are initialized to undefined until reaching the line of code that initializes the variable. For variables declared with let or const, the variable is not initialized and thus cannot be accessed before the line of code that initializes it. For example:

console.log(varNum); // undefined
console.log(letNum); // reference error

var varNum = 5;
let letNum = 5;

console.log(varNum); // 5
console.log(letNum); // 5
Learn more: <https://developer.mozilla.org/en-US/docs/Glossary/Hoisting>
Hook
A JavaScript function used to "hook" into React features such as state and the larger component lifecycle. The names of hooks always begin with use, and they cannot be called conditionally.

HTML
HyperText Markup Language is the primary language of the web, containing the content and structure of a website.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML>
HTTPS
The HyperText Transfer Protocol Secure is an extension of HTTP that's used for secure communication online. It requires servers to have trusted certificates and uses the Transport Layer Security (TLS), a security protocol built on top of TCP, to encrypt data communicated between a client and a server.

Hypertext Transfer Protocol
Oftentimes abbreviated as HTTP, a common network protocol used for sending requests and responses on the web.

HTTP requests generally have three components: the request line, headers and a body (although the body is optional for some request methods). The request line includes the method, path and HTTP version. Headers contain key value pairs of extra information for the server. The body contains the contents of the request, such as new data being uploaded in a post request. For example, a GET request to AlgoExpert's home page might look like this:

GET / HTTP/1.1

host: <www.algoexpert.io>
accept: text/html
HTTP responses follow the same general format as requests, but in the top line (referred to as a status line), there is no method or path. Instead, this line contains a status code and message. For example, the status code of 200 with a message of OK will be included in the response to a successful GET request.

HTTP/1.1 200 OK

content-type: text/html

<!DOCTYPE html>
<html>
...
</html>
Image Sprite
A group of images all included in a single image file. These images are usually split on the client using the CSS background-image property along with background-position. The primary benefit of sprites is to reduce the total file size and the number of files the client needs to download, which can decrease page load times.

Immediately Invoked Function Expression
Also called an IIFE, a function that is immediately called after its definition. This can be useful for a variety of purposes, most notably to create a function scope to isolate code with.

There are a few ways to define an IIFE, but the most common is using an anonymous or arrow function. This function is then wrapped in parentheses, which causes it to be treated as an expression. Finally, () is added to call the function. For example:

(function() {
console.log('Wahoo!');
})();
Learn more: <https://developer.mozilla.org/en-US/docs/Glossary/IIFE>
IndexedDB
A browser API for storing complex objects. IndexedDB uses object stores, which are similar to tables in relational databases. Each object in the object store must then have a unique key used to identify it.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API>
Inline Element
An element with its display property set to inline. These have a few key properties:

They start immediately after the content before them, without a new line.
They span the width of their content.
width and height properties have no effect on them.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements>
Inline-Block Element
An element with its display property set to inline-block. These have a few key properties:

They start immediately after the content before them, without a new line.
They span the width of their content by default, but this can be changed.
ITCSS
The "Inverted Triangle" CSS methodology. This methodology is mostly focused on the order of CSS code, rather than having opinions on naming conventions. The primary idea here is to have generic styles first, which should have the largest reach across elements and the least specific selectors. The exact layers of the triangle can be changed to fit the needs of a specific project, but a general structure looks like this:

Settings: Global variables affecting the entire website.
Tools: Mixins and functions for use with preprocessors.
Generic: High level generic styles, usually to reset browser defaults for consistency across browsers.
Elements: Defaults for elements using type selectors.
Objects: The most generic classes, oftentimes for larger containers.
Components: Classes for individual UI components.
Trumps: !important overrides for when they are needed.
JavaScript
The primary programming language of the web, primarily used for adding functionality to websites. JavaScript is a general purpose multi-paradigm programming language with dynamic typing.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
JavaScript Engine
A program used to execute JavaScript code.

These engines can differ a lot in implementation across browsers, but for the most part they contain two primary components:

Heap: Used for memory allocation to store objects. This can be thought of as a largely unstructured data store.
Call Stack: A stack data structure used to keep track of the currently executing function. Each function call pushes a stack frame onto the stack, which contains information about the function and its local variables. When a function ends, it is popped off the stack. When the stack is empty, there is no code currently running.
JavaScript Framework
A collection of pre-written JavaScript code that provides some additional structure to a project. It is often said that frameworks are more "opinionated" than libraries, or that frameworks generally call your code as opposed to your code calling a library.

JavaScript Library
A collection of pre-written JavaScript code, usually in the form of functions that can be called throughout other projects to simplify the development process.

JavaScript Runtime Environment
The larger environment that JavaScript is executed in. In the browser, this environment provides access to a variety of web APIs. These APIs include the functions for timers, HTTP requests, DOM manipulation and much more.

JSON Web Token
A standard for signed JSON tokens, oftentimes referred to by its abbreviation JWT. JSON Web Tokens have three sections:

A header with information about the encryption algorithm used.
The payload data.
The signature, which is created by the server using a secret key so that it can determine if it has been tampered with.
JSX
Short for JavaScript XML, a JavaScript syntax extension for inlining XML and HTML in JavaScript. For example, this code could be compiled into standard JavaScript function calls to create a heading element:

const h1 = <h1>Hello World</h1>;
Learn more: <https://reactjs.org/docs/introducing-jsx.html>
Key Prop
A prop passed to each element in a list to help React keep track of those elements. Key props should be unique identifiers. By passing key props, if the list changes, React can easily know which elements need to be mounted, updated, and unmounted. For example, when rendering an array of messages from the server, message IDs could be used as a key prop:

return (
{
messages.map(message => {
return <p key={message.id}>{message.text}</p>;
});
}
);
Learn more: <https://reactjs.org/docs/lists-and-keys.html>
let
A keyword for declaring a block-scoped variable that cannot be accessed before initialization.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let>
Lexical Environment
An internal data structure used for keeping track of identifiers (variable and function names) and their values. A lexical environment stores all of the locally available identifiers as well as a reference to the parent environment.

Lexical Scoping
The scoping system in JavaScript that ensures all code blocks have access to all identifiers in their parent environment. When an identifier is not defined locally, JavaScript will look to the parent environment for it. If it is still not found there, it will look in grandparent's environment and so on before looking in the global environment.

Lifting State Up
A common React pattern of moving shared state up to the lowest common ancestor component in the tree. This allows for a single component to keep track of the state and pass the current value and setter function down through props.

Learn more: <https://reactjs.org/docs/lifting-state-up.html>
Local Storage
Part of the web storage API, a system for storing information in the browser without any expiration date. Values can be added to local storage with localStorage.setItem('key', 'value'), and the value can be retrieved with localStorage.getItem('key').

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage>
Loose Equality
The most basic equality operator in JavaScript using ==. Loose equality compares values regardless of types following these steps:

If both values are either null or undefined, return true.
Convert all booleans to numbers. True converts to 1 and false converts to 0.
If comparing a number to a string, convert the string to a number.
If comparing an object to a string, convert the object using its toString() or valueOf() methods.
If the types are the same, follow the same rules as strict equality.
In general, strict equality should be preferred due to it being easier to predict. However, loose equality can be useful for checking against null and undefined at once with value == null.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality>
Map
A built-in JavaScript class for holding key-value pairs. While similar to standard objects, maps have a few key differences:

Map keys can be of any type, while object keys must be strings or symbols.
Maps maintain insertion order for iteration, while objects do not.
Maps cannot easily be converted to JSON, while objects can.
Objects oftentimes utilize the prototype chain for inheritance, while Maps cannot do this.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map>
margin
A property used to create extra space around an element. The margin CSS property is a shorthand for margin-top, margin-right, margin-bottom and margin-left in that order.

A value of auto can also be used to allow the browser to choose margins, which will usually center block elements horizontally.

Adjacent horizontal margins will be added together to determine the space between elements. Vertical margins on the other hand will usually be collapsed, meaning only the larger margin value will be used.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/margin>
Microtask Queue
A queue data structure, similar to the task queue, used for storing microtasks.

Microtasks are primarily used for callback functions passed to promise.then(), promise.catch() and promise.finally() as well as their async/await equivalents. Additionally, microtasks can be manually queued using the queueMicrotask() function.

Microtasks can be considered to have a higher priority than standard tasks, since the entire microtask queue must be empty before the browser will move on to a task.

Mobile First Design
Building websites or applications with mobile devices as the primary use case, then scaling them up to larger devices with responsive CSS. In general, it is easier to scale a design up to larger screens than to scale it down to smaller screens. Along with the massive growth of mobile browsing, this makes mobile first design a great development workflow.

Module
JavaScript code that runs in isolation, without polluting the global namespace.

Traditionally modules were implemented using immediately invoked function expressions, but in modern JavaScript there is a type="module" attribute that can be added to script tags. This attribute will have a few key effects:

Identifiers at the top level will be scoped to the file rather than globally.
The file will be in strict mode by default.
The await keyword can be used at the top level.
The script will be deferred by default.
Modules can then access each other by using the import and export keywords. For example:

// File 1:
export const num = 10;

// File 2:
import { num } from 'file1.js';
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules>
Next.js
A JavaScript framework built around React. The primary use case for Next.js is server-side rendering, but it also includes a wide variety of other tools to simplify development and improve performance.

Learn more: <https://nextjs.org/>
Null Coalescing
Also referred to as nullish coalescing, an operator using ?? for providing a default value if a value is null. If the value on the left side of the operator is not null or undefined, that value is used. Otherwise, the value on the right side of the operator is used. For example:

const num = null ?? 1234; // 1234
const num2 = undefined ?? 1234; // 1234
const num3 = 5678 ?? 1234; // 5678
const num4 = '' ?? 1234; // ''
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator>
OAuth
Open Authorization, a common standard for service authorization. Services can use OAuth to allow users to give other services specific API access to portions of their accounts.

Object
The base non-primitive data structure of JavaScript used to store key-value pairs. Object keys are usually strings, but they can also be symbols. Values on the other hand can be any type.

Objects are usually declared with the object literal syntax such as:

const website = {
name: 'AlgoExpert',
domain: 'algoexpert.io'
};
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects>
OOCSS
The "Object-Oriented" CSS methodology. This is based on object-oriented programming principles, which can be applied to CSS class design by treating UI components as objects. Styles are then given one of two categories:

Structure: "Invisible" properties such as width and margin.
Skin: "Visible" properties such as color and border.
Along with separating structure and skin into classes, OOCSS also makes a clear distinction between content and containers. The idea here is that containers should function the same, regardless of the content inside of them. Moreover, content should not depend on the container it is nested within.

Optional Chaining
A JavaScript operator using ?. for reading object properties without throwing an error if the object is null. For example, person?.company?.website will act the same as person.company.website, however if any values in the chain are null or undefined, it will return undefined rather than throwing an error.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
padding
A property used to create extra space within an element, between the content and border. The padding CSS property is a shorthand for padding-top, padding-right, padding-bottom and padding-left in that order.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/padding>
Paradigm
A style of programming. Oftentimes languages are built with a specific paradigm in mind, but JavaScript is known as a multi-paradigm language, because it allows for programming in a variety of paradigms. Some of the major paradigms of JavaScript include:

Event-driven: Functions can be made to respond to events, such as when a user clicks on an element or scrolls down the page.
Functional: Functions can be written as "pure functions", meaning functions that always have the same output for a given set of arguments and never produce side effects. Additionally, JavaScript supports first-class functions and higher-order functions. This means that functions can be treated as normal values, passed as arguments to other functions and returned from functions.
Object-oriented: Objects can be created as custom data stores and they can be made to inherit from each other.
Imperative: Programs can be written by explicitly describing the control flow, such as with loops and conditionals.
Declarative: Programs can be written by describing the desired output with implicit control flow. Oftentimes this is associated with functional programming (e.g. using the forEach function to loop over an array instead of a for loop).
Portal
A built-in method for rendering React elements into a DOM node outside of the parent React tree.

A portal is created by using the ReactDOM.createPortal function, which takes in a React element as the first parameter and the DOM node as the second parameter. The element will be appended to that DOM node, but it will still act the same as any other element in the original React tree (it can still take props, read from context providers and have events bubble up).

Learn more: <https://reactjs.org/docs/portals.html>
position
A CSS property for setting how the browser should position an element in the document. This defaults to static, but can take a variety of values:

static: The default value, the element follows the flow of the document.
fixed: The element is positioned relative to the viewport and removed from the normal flow of the document. The top, left, right and bottom properties can then be used to move the element.
relative: The element is positioned in the same place as it would be with static, however, it can be repositioned with top, left, right and bottom relative to its natural position on the document.
sticky: The element will act similar to a relative positioned element, but once it scrolls off screen it will stay fixed to the screen, essentially acting as position: fixed. This is particularly useful for menu bars that need to "stick" to the top of the screen as the user scrolls.
absolute: By default, this will act the same as fixed, except the element will be positioned relative to the document instead of the viewport. This means that, as the page is scrolled, it will move with the page rather than stay at the same viewport location. However, if any element above it in the DOM, oftentimes referred to as an ancestor, has a position value other than static, then it will be positioned relative to that nearest positioned ancestor.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/position>
Preprocessor
A program that converts code of another syntax into CSS that the browser can understand. Usually these add new features to CSS to make the code easier to read, write and maintain.

Primitive
The most basic data types of a language. In JavaScript, there are 7 primitive types:

Number: Numeric values, including integers and decimal values.
BigInt: Integers too large to store in a number.
Boolean: A binary value of true or false.
String: A sequence of characters.
Symbol: A dynamically generated unique value.
Null: A nonexistent value.
Undefined: A value that has not been set.
JavaScript has a typeof operator that can get the type of a value as a lowercase string. However, do be aware that this function does have some special casing. For example, typeof function will return "function" even though functions are just objects.

Learn more: <https://developer.mozilla.org/en-US/docs/Glossary/Primitive>
Promise
An object used for asynchronous operations. These objects have a state of either pending, fulfilled or rejected.

A Promise is created with the Promise() constructor, which takes in a callback function, oftentimes called the executor. This callback function has two callback functions as parameters:

resolve(value): Fulfills the Promise and sets its value.
reject(error): Rejects the Promise and sets an error message.
The Promise object has three primary functions:

then(fulfilledFn rejectedFn): Calls fulfilledFn if the Promise is fulfilled and rejectedFn if it is rejected. Returns a new fulfilled Promise with the return value of the callback function.
catch(rejectedFn): Calls rejectedFn if the Promise is rejected. returns a new fulfilled Promise with the return value of the callback function.
finally(callback): Calls the callback function whenever the Promise is settled (fulfilled or rejected).
Since these functions all return a new Promise, they can be chained together, such as promise.then(doX).then(doY).catch(handleError).finally(doZ).

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>
Props
A JavaScript object passed as a parameter to functional components, containing all of the key-value pairs that were passed as attributes to the component. For example, given this JSX:

<MyComponent message="hello" number={42} />
The MyComponent function would take in props with two key-value pairs:

function MyComponent(props) {
console.log(props.message); // "hello"
console.log(props.number); // 42
return <h1>Hello World!</h1>;
}
Learn more: <https://reactjs.org/docs/components-and-props.html>
Prototypal Inheritance
The inheritance model used in JavaScript. The key difference between prototypal inheritance and classical inheritance is that in prototypal inheritance objects only inherit from other objects, rather than using class blueprints.

Prototype Chain
The chain of inheritance created through object prototypes. When a property does not exist on an object, JavaScript will look to its prototype. If it doesn't exist on that object, it will look to its prototype and so on until the chain ends with a null prototype.

Internally, the prototype is stored on the [\[Prototype\]] property, but we cannot directly access this property. Instead, we have a few alternative ways to get and set prototypes:

obj.**proto**: Although being deprecated, this property was the original way to get and set the prototype of an object and is still useful for debugging.
Object.getPrototypeOf(obj): Returns the prototype object of obj.
Object.setPrototypeOf(obj, proto): Sets the prototype object of obj to proto.
Object.create(proto): Creates a new object with the prototype set to proto.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain>
Pseudo Class
An addition to a CSS selector for selecting based on the current state of the element. These start with :, so for example button:hover would select buttons currently hovered over.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes>
Pseudo Element
An addition to a CSS selector for selecting a specific portion of the element. These start with ::, so for example p::first-letter would select the first letter of paragraphs.

::before and ::after are special pseudo elements that insert children before or after the content of the element, allowing for styling before or after the content. This is oftentimes used with the CSS content property, but not always.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements>
React
A JavaScript library developed by Facebook for building user interfaces. React uses a component-based architecture to create interfaces with an intuitive declarative approach.

Learn more: <https://reactjs.org/>
React DevTools
An official React browser extension for debugging React.

React Element
The internal object representation of a node in the React tree. React elements can represent either DOM nodes or React components.

Learn more: <https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree>
React Router
A React library for declaratively controlling page routing from the client-side.

Learn more: <https://reactrouter.com/>
React.createContext
A react function for creating a context object. This function takes in a default value, which will be used if there is no matching context provider in a tree. For example, this would create a context that could be used to keep track of a user's selected theme:

const ThemeContext = createContext({
mode: 'dark'
});
This context would then have a provider component, which must be above any components in the tree that wish to use the context. The value prop will be passed as the value to all children using the context. For example:

return (
<ThemeContext.Provider value={{mode: 'dark'}}>
{props.children}
</ThemeContext.Provider>
);
Learn more: <https://reactjs.org/docs/context.html#reactcreatecontext>
React.forwardRef
A function used by a custom component to forward a ref attribute on to a child element. The forwardRef function is a higher-order component function, meaning it takes in a component and returns a new one. In this case, it takes a component that has a second parameter for the ref. For example:

function Parent() {
const ref = useRef(null);
return <Child ref={ref}>This child has a ref</Child>;
}

const child = forwardRef(function (props, ref) {
return <div ref={ref}>{props.children}</div>;
});
Learn more: <https://reactjs.org/docs/forwarding-refs.html>
React.Fragment
A React container component that renders its children without adding any additional DOM nodes. This can be used for returning multiple adjacent elements without wrapping them in an unnecessary element. For example:

<React.Fragment>

  <h1>Hello World</h1>
  <p>React is awesome!</p>
</React.Fragment>
Fragments can also be created by using an empty tag, rather than the Fragment export from React. For example:

<>

  <h1>Hello World</h1>
  <p>React is Awesome!</p>
</>
Learn more: https://reactjs.org/docs/fragments.html
React.lazy
A React function for dynamically importing components, creating a potential performance boost when certain components are included in a module but not necessary for the initial render. The lazy function takes in a callback function that is run when the component is used, and this function should return a call to the import function. For example:

const LazyComponent = react.lazy(() => import('./MyComponent'));
Learn more: <https://reactjs.org/docs/react-api.html#reactlazy>
React.memo
A React higher-order component that takes in a component and returns a memoized version of that component. If the props have not changed, wrapping a component in React.memo will cause it to avoid re-rendering. This function can optionally also take in a second callback function as a parameter to determine when the component should re-render with more fine control. For example, this component will only need to re-render when the number prop changes:

function areEqual(oldProps, newProps) {
return oldProps.number === newProps.render;
}

const MemoizedComponent = React.memo(myComponent, areEqual);
Learn more: <https://reactjs.org/docs/react-api.html#reactmemo>
React.Profiler
A React component for tracking how often a component renders. The Profiler requires two props:

id: A unique identifier.
onRender: A callback function to run after the component renders (during the commit phase).
For performance reasons, the Profiler is ignored in production mode.

Learn more: <https://reactjs.org/docs/profiler.html>
React.StrictMode
A React component for putting a component in strict mode. Strict mode has two primary benefits for assisting in debugging:

It provides warnings when using deprecated functions or lifecycle methods.
It double-invokes some functions, such as functional components. This helps find potential bugs related to side-effects in functions that should not have side-effects.
Learn more: <https://reactjs.org/docs/strict-mode.html>
React.Suspense
A react component for specifying a fallback interface while a child component is preparing to render (such as waiting for a lazy import). The Suspense component takes a fallback prop of a React element, and its children prop is a suspending component. For example:

<React.Suspense fallback={<LoadingIndicator />}>
<LazyComponent />
</React.Suspense>
Learn more: <https://reactjs.org/docs/react-api.html#reactsuspense>
ReactDOM
A package used with React to work as the bridge between React elements and the actual DOM in the browser. The most frequently used ReactDOM function is the render function, which adds a component to the DOM. For example:

ReactDOM.render(

  <h1>Hello World</h1>,
  document.getElementById('root')
);
Learn more: https://reactjs.org/docs/react-dom.html
Recoil
A JavaScript state-management library built for React. Recoil uses atoms, which are global pieces of state that any component can subscribe to.

Learn more: <https://recoiljs.org/>
Reconciliation
The algorithm used by React to determine the "diff" between two trees of React elements. After each state update, React runs the reconciliation algorithm to determine what has changed, and that changelog is sent to the rendering function (in the case of the browser, this is from React DOM) which can update the page using the information.

Learn more: <https://reactjs.org/docs/reconciliation.html>
Redux
A JavaScript state-management library often used with React. Redux uses reducer functions to create a global store that any component can read from.

Learn more: <https://redux.js.org/>
Ref
A React value specific to an instance of a component that persists between renders, but updating the value does not cause a re-render (unlike state). Refs are oftentimes used to reference the DOM node associated with the component, which can be achieved with the ref attribute.

Learn more: <https://reactjs.org/docs/refs-and-the-dom.html>
Relative Unit
A unit whose value is dependent on something else. These are the most frequently used relative units:

em: Relative to the font size. For example, if the font size is 14px, then 1.5em would be 21px. If the em unit is used to set font size, it will be relative to the parent's font size.
rem: Relative to the root element's font size. By default, this is usually 16px, but it can be overridden by the user stylesheet. Moreover, the author stylesheets can change this by setting a font size on the html selector or the :root pseudo class. For example, by default 1.5rem will be 24px.
%: A percentage, usually of the parents value for the same property. For example, a width of 50% would be half the size of the parent element's width.
vw: A percentage of the width of the viewport, for example 50vw would be half of the width of the viewport.
vh: A percentage of the height of the viewport, for example 50vh would be half of the height of the viewport.
ch: The number of characters on a line, based on the size of the "0" character in the element's font. This can be useful to prevent paragraphs from spanning more than ~70 characters in width, which can become hard to read.
requestAnimationFrame
A JavaScript function for calling a callback function before the next browser repaint. These are oftentimes used for animations to update the animation every frame.

For example, requestAnimationFrame(myFunction); would call myFunction before the next repaint.

This function returns an ID, and the callback can be cancelled by calling cancelAnimationFrame(animationFrameID);.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame>
REST
The Representational State Transfer API architectural style. An API using REST is usually referred to as a RESTful API and must follow these constraints:

Client-server model: There must be a clear distinction between the client and the server, which can be developed independent of each other.
Stateless: The server does not maintain session state, so the client must send all information required to complete a request with the request.
Cacheable: The server should clearly define which responses can be cached by the client.
Layered system: If a layered system is used, the client should not need to know which server it is connected to.
Uniform interface: The interface should be consistent, following these rules:
Resource identification in requests: Requests should identify resources, but these resources can follow a different representation than that used on the backend.
Resource manipulation through representations: The client should have enough information about a requested resource to edit that resource.
Self-descriptive messages: Responses include messages describing how to manipulate the resource, usually as a MIME type.
Hypermedia as the engine of application state: Responses should include links to future request options.
Code on demand (optional): Optionally, the server can send code to the client to be executed by the client.
Rest Operator
A JavaScript operator using ... for condensing multiple elements into a single array. This uses the same syntax as the spread operator, but functionally is essentially the opposite.

Rest syntax can be used in both arrays and objects to get all of the values not being destructured. For example:

const arr = [1, 2, 3, 4];
const [first, second, ...rest] = arr; // rest is [3, 4]

const obj = { key1: 1, key2: 2, key3: 3, key4: 4 };
const { key1, key2, ...rest } = obj; // rest is { key3: 3, key4: 4 }
};
Moreover, rest syntax can be used for function parameters to accept an infinite number of arguments, which are accessible as an array. For example:

function myFunc(...myArguments) {
console.log(myArguments);
}

myFunc(1, 2, 3, 4); // logs [1, 2, 3, 4]
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters>
RPC
The Remote Procedure Call API architectural style. In this style, the server provides an interface for the client to call certain functions on the server.

Ruleset
A selector followed by a declaration block for styling elements matching the selector with the declarations in the declaration block. Rulesets follow this syntax:

selector {
property: value;
property: value;
}
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets>
Same-Origin Policy
A browser policy limiting the ability of a page from reading resources from different origins. Two resources are from the same origin only if they have the same protocol, host, and port.

Selector
A pattern used at the beginning of a ruleset for choosing which elements will be affected by the declarations. There are a variety of different selector types:

Type selector: Selects all of the elements of a specific HTML tag. For example, h1 would select all <h1> elements.
Class selector: Selects all elements with a specific HTML class attribute. Class selectors are prefixed with a ., so for example .foo would select all HTML elements with the attribute class="foo".
ID selector: Selects an element with a specific HTML ID attribute. ID selectors are prefixed with a #, so for example #bar would select the HTML element with the attribute id="bar".
Attribute selector: Selects all elements with a specific HTML attribute set to a specific value. These are surrounded by [] and use a = as a delimiter between the attribute name and value. For example, [type="submit"] would select all elements with a type attribute set to "submit".

Excluding the value will select all elements with the attribute set to any value. For example, [type] would select all elements with the type attribute set, regardless of the value.

Attribute selectors can also use special syntax for basic pattern matching within the value. There are a variety of options here, but these are some of the more common ones:
[href*="algoexpert.io"] would select all elements with an href attribute with the text "algoexpert.io" at any location.
[href$="algoexpert.io"] would select all elements with an href attribute with the text "algoexpert.io" at the end of the value.
[href^="https://algoexpert.io"] would select all elements with an href attribute with the text "<https://algoexpert.io>" at the beginning of the value.
Combinator: Combines multiple selectors to select elements based on their location in the DOM. There are a few types of combinators:
Descendant combinator: Represented by a single space, in the format selector1 selector2. Selects all elements that match selector2 and are a descendant of an element matching selector1. A descendant does not need to be a direct child (e.g. the selected element's grandparent could match selector1).
Child combinator: Represented by >, in the format selector1 > selector2. Selects all elements that match selector2 and are a direct child of an element matching selector1.
Sibling combinator: Represented by ~, in the format selector1 ~ selector2. Selects all elements that match selector2 and are a sibling of an element matching selector1. The element matching selector2 must come after the element matching selector1.
Adjacent sibling combinator: Represented by +, in the format selector1 + selector2. Selects all elements that match selector2 and have an element matching selector1 directly before them in the DOM.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors>
Semantic HTML
HTML that clearly describes the content of the page. HTML loses its semantic meaning when tags are misused, or generic tags (namely <div> and <span>) are overused instead of semantic tags.

Semantic HTML includes the usage of semantic grouping tags, which give meaning to different sections of the page. These are some of the most commonly used semantic grouping tags:

<article>: Self contained, independently distributable content.
<section>: Thematic grouping of content, not self contained.
<header>: Introductory content.
<main>: Main content, limited to one per page.
<nav>: A section of links, oftentimes for the primary navigation of the page.
<aside>: Non-vital content indirectly related to main content. The page would make sense without this content.
<footer>: Footer of the document, oftentimes containing copyright information.
Server
A machine or process that provides data or service for a client, usually by listening for incoming network calls.

Note that a single machine or piece of software can be both a client and a server at the same time. For instance, a single machine could act as a server for end users and as a client for a database.

Server-Side Rendering
A method of rendering an application where the server generates the final HTML page, rather than giving the client an empty HTML file and the scripts needed to generate the page. Server-side rendering can create significant performance improvements while also helping with search-engine optimization.

Session Storage
Part of the web storage API, a system for storing information in the browser that expires at the end of a session. Values can be added to session storage with sessionStorage.setItem('key', 'value'), and the value can be retrieved with sessionStorage.getItem('key').

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage>
Set
A built-in JavaScript class for holding unique values of any type. Values are considered unique if they are different primitives or references to different objects (this means that two different objects with the same contents are considered unique from each other). Values in Sets are kept in insertion order for when the Set is iterated over.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set>
setInterval
A JavaScript function for calling a function repeatedly over an interval.

For example, setInterval(myFunction, 1000); would call myFunction every second (however this could take longer if other code needs to finish running).

This function returns an ID, and the interval can be cancelled by calling clearInterval(intervalID);.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/setInterval>
setTimeout
A JavaScript function for delaying execution of a callback function.

For example, setTimeout(myFunction, 1000); would call myFunction after 1 second (however this could take longer if other code needs to finish running).

This function returns an ID, and the timeout can be cancelled by calling clearTimeout(timeoutID);.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/setTimeout>
Short Circuit Evaluation
A method of utilizing the evaluation order of JavaScript to conditionally run code. This usually uses the && operator, because for it to return true, both the left and right expressions must be true. Since the browser runs code from left to right, if it encounters false on the left side, it does not even run the code on the right side. Thus, this can be used to conditionally run code. For example:

true && myFunc(); // calls myFunc()
false && myFunc(); // doesn't call myFunc()
Less commonly, short circuit evaluation can also be used with the || operator. Since this operator only needs one expression to be true, if the left side is true then the right side will not be evaluated. This is essentially the opposite of the behavior with &&. For example:

true || myFunc(); // doesn't call myFunc()
false || myFunc(); // calls myFunc()
SMACSS
The "Scalable and Modular Architecture For CSS" methodology, usually pronounced as "smacks". This splits CSS into five different categories, each of which get their own file:

Base: Page defaults, usually just type selectors.
Layout: Major structural layout of the page, using ID and class selectors. The classes are usually prefixed with l- or layout-. For example, a navigation element might have the class l-nav.
Module: Smaller reusable components, usually using class selectors without any name prefixes.
State: Specific states for layouts or modules, such as disabled or selected states, usually using class selectors again.
Theme: Style rules for layouts and modules related to a theme, oftentimes based on user preferences such as a dark mode.
SOAP
The Simple Object Access Protocol used for APIs. This protocol provides a specific XML based format for clients and servers to communicate with.

Specificity
The algorithm used by the browser to determine which CSS declarations to use when an element is selected by two rulesets with the same property.

Specificity is roughly calculated by counting the number of each selector type involved in a selector and multiplying by a weight. These weights are as follows:

Inline Styles: 1000
IDs: 100
Classes: 10
Pseudo-Classes: 10
Attributes: 10
Elements: 1
Pseudo-Elements: 1
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity>
Spread Operator
A JavaScript operator using ... for expanding iterables into individual elements. For example myFunction(...myArray) would pass each value in myArray as individual arguments to myFunction.

The spread syntax can also be used to combine two arrays, for example, [...arr1, ...arr2] would make a single array with all of the values of both arrays. Similarly, objects can be spread as well. For example, {key: 'value', ...otherObj} would add all of the fields from the other object into this object. Moreover, {...obj} can be used as a shallow clone of an object, since it creates a new object with the same fields.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>
Stacking Context
A group of elements positioned together on the z-axis. Stacking contexts can be nested within other stacking contexts, and z-index values are used to determine the layering of elements with the same stacking context parent.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context>
State
Data specific to an instance of a component that persists between renders and causes re-renders when changed.

Static-Site Generation
Similar to server-side rendering, a method of rendering an application where the server generates the final HTML pages, rather than giving the client an empty HTML file and the scripts needed to generate the page. The key distinction between static-site generation and server-side rendering is that static-site generation creates all possible HTML files at build time, whereas server-side rendering creates a new HTML file for each server request.

Strict Equality
A JavaScript equality operator using ===. Strict equality compares both values and types following these steps:

If either value is NaN, return false.
If the values have different types, return false.
If both values are null or both values are undefined, return true.
If both values are objects, return true if they are the same object. False otherwise.
If both values are of the same primitive type, return true if the values are the same. False otherwise.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality>
Style Guide
A document describing the preferred coding style for a project or organization used to promote clean and consistent code. Many style guides, such as the Google JavaScript Style Guide , are open source.

Symbol
A primitive value in JavaScript used for unique values.

A symbol is created using the Symbol(description) function, which returns a unique symbol. Even if two symbols have the same description, they will still be considered unique.

While symbols created using the Symbol(description) function are completely unique, symbols can also be created using Symbol.for(key). This works the same way, except two calls to this function with the same key will return the same symbol, based on a global symbol registry.

Learn more: <https://developer.mozilla.org/en-US/docs/Glossary/Symbol>
SyntheticEvent
The object type passed to React event handler functions. Synthetic events generally work the same as native events, but with more consistency across browsers.

Learn more: <https://reactjs.org/docs/events.html>
Tag
The primary method of marking up content using HTML. Tags use the syntax <tagname>content</tagname>.

For example, paragraphs use the p tag, so we could create the paragraph "Hello World" with <p>Hello World</p>.

The left side tag, such as <p>, is referred to as the opening tag. The right side tag, such as </p> is referred to as the closing tag. Everything inside of the tags is the content, which will actually be rendered on the page. The combination of the opening tag, content and closing tag are referred to as a complete element.

Some tags don't have any content, so we call these empty tags or self-closing tags. These either use the opening tag syntax or <tagname />.

For example, horizontal rules use the hr tag, so we could create a horizontal rule with either <hr> or <hr />.

Task Queue
A queue data structure for storing asynchronous callbacks to be added to the call stack. This queue is also known as the "Message Queue", "Callback Queue" or "Macrotask Queue".

Web APIs move callbacks into the task queue, where they wait for the call stack to be empty before executing.

Template Literal
Strings created using backticks ``that allow for inlining expressions rather than needing concatenation. Inlined expressions use the syntax ${expression}. For example,`Hello ${name}` would have the same output as 'Hello' + name.

Template literals also allow for tagging to write a function that defines custom behavior for the template literals. Tagging can be read about further in the MDN documentation, but it doesn't tend to be used too often.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals>
this
A JavaScript keyword for referencing the context in which the current code is running.

The value of this is determined at runtime. In the browser, it will follow these general rules:

At the top level of a file (the global context), this refers to the global object, which is the window.
In a standard function without strict mode, this refers to the global object, which is the window.
In a standard function in strict mode, this is undefined.
In an object method, this refers to that object.
In a constructor function, this refers to the object being constructed.
When using event listeners, the object being listened to will be bound to this, assuming a standard function was used. For example, element.addEventlistener('click', func) would bind element to this inside of func.
Arrow functions do not create their own this context, instead they retain the value of the enclosing context.

JavaScript provides three functions for binding the value of this to functions:

func.bind(thisArg): Returns a new function with thisArg bound to this.
func.call(thisArg, x, y): Calls func(x, y) with thisArg bound to this.
func.apply(thisArg, [x, y]): Calls func(x, y) with thisArg bound to this.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this>
Transitions
A css module for smoothly transitioning between values when a value is changed. Transitions can be defined with a combination of these properties:

transition-property: The name of the CSS property to transition.
transition-duration: How long the transition should take.
transition-timing-function: How the transition should progress. This can take a variety of keyword values, such as linear and ease-in, or custom values using the cubic-bezier() or steps() functions.
transition-delay: How long to wait before starting the transition.
Alternatively, the transition property can be used as a shorthand for all of these values. The first time value will be used for the duration, and the second will be used for a delay. Other than that, the order does not matter.

For example, this would set the width to smoothly transition linearly over one second, two seconds after the value is changed:

transition: width 1s linear 2s;
Learn more: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions>
Transmission Control Protocol
Oftentimes abbreviated as TCP, a network protocol used to establish a connection between two computers on the internet. TCP is the primary mechanism by which HTTP requests are delivered.

TypeScript
A superset of JavaScript adding static typing. The primary purpose of using TypeScript is to prevent bugs related to incorrect types and to improve the development workflow. Since browsers only understand standard JavaScript, TypeScript is compiled back into JavaScript.

Learn more: <https://www.typescriptlang.org/>
useCallback
A React hook for memoizing a function. This function works the exact same as useMemo, except rather than memoizing the return value of a function, it memoizes the entire function. This can be useful for a variety of reasons, such as if a callback is passed into a dependency array that requires it to not change on every render. For example:

const callback = useCallback(() => console.log(x, y), [x, y]);
Learn more: <https://reactjs.org/docs/hooks-reference.html#usecallback>
useContext
A React hook for using a context. The useContext function takes in a context object created with createContext, and it returns the value from the first context provider of that context above it in the tree. For example:

const theme = useContext(ThemeContext);
console.log(theme.mode); // 'dark'
Learn more: <https://reactjs.org/docs/hooks-reference.html#usecontext>
useEffect
A React hook for performing side effects around the component lifecycle. The useEffect hook takes in a callback function and an optional dependency array.

If no dependency array is provided, the callback function will run on every render. If there is a dependency array provided, the callback function will only run on mount or when an item in that array has changed (note that objects must be new objects to be considered to have changed). To avoid bugs related to effects using stale values from previous renders, the dependency array should contain all values that the callback uses that could change between renders.

The callback function can also return a cleanup function, which will run on unmount and before the main effect function runs on any re-renders. For example:

useEffect(() => {
console.log('count changed');

return () => console.log('cleanup count changed effect');
}, [count]);
Learn more: <https://reactjs.org/docs/hooks-effect.html>
useImperativeHandle
A React hook for customizing the value provided to a parent component when using a ref. The useImperativeHandle hook takes in a ref as the first parameter, followed by a callback function and an optional dependency array.

The return value of the callback function will act as the current value of the ref. If any item in the dependency array changes between renders, the callback function will be invoked again to recalculate the current value.

Since useImperativeHandle requires a ref on a custom component, it should always be used with React.forwardRef. For example:

forwardRef(function (props, ref) {
const [count, setCount] = useState(0);

useImperativeHandle(ref, () => {
return {
resetCount: () => setCount(0)
};
});

return (
<button onClick={() => setCount(count + 1)}>
Increment
</button>
);
}
Learn more: <https://reactjs.org/docs/hooks-reference.html#useimperativehandle>
useLayoutEffect
A React hook for performing side effects around the component lifecycle in the same way as useEffect. The only difference between the two functions is that useLayoutEffect works synchronously, meaning the effects always finish running before the browser paints. This hook should only be used for effects that will make visual changes to the DOM, because otherwise the synchronous nature will give worse performance than useEffect without any benefits.

Learn more: <https://reactjs.org/docs/hooks-reference.html#uselayouteffect>
useMemo
A React hook for memoizing a value. The useMemo function takes in a function that returns a value to be memoized and a dependency array. The useMemo function then returns the memoized value, and it only calls the passed in function to recalculate the value if an item in the dependency array changes. For example:

const value = useMemo(() => slowFunction(x, y), [x, y]);
Learn more: <https://reactjs.org/docs/hooks-reference.html#usememo>
useReducer
An alternative React hook for creating stateful components, oftentimes used for more complex state. The useReducer function takes in a reducer function and the initial state. It returns an array with two elements: the current state value and a dispatch function.

The reducer function takes in the previous state and an action object as parameters, then it returns the new state. Usually the action object will have a type property, which will be used in a switch statement. For example:

function reducer(state, action) {
switch (action.type) {
case 'increment':
return {count: state.count + action.num};
case 'decrement':
return {count: state.count - action.num};
default:
throw new Error('Unknown action type');
}
}
The dispatch function will then take in an object, which will be passed as the action to the reducer function. For example:

const [state, dispatch] = useReducer(reducer, {
count: 0
});

return (
<button onClick={() => dispatch({
type: 'increment',
num: 1
})}>Increment</button>
);
Learn more: <https://reactjs.org/docs/hooks-reference.html#usereducer>
useRef
A React hook for creating a ref. The useRef hook takes in an initial value and returns a ref. The ref is simply an object with a current property set to the current value.

const div = useRef(null);
return <div ref={div}>This div has a ref</div>;
Learn more: <https://reactjs.org/docs/hooks-reference.html#useref>
useState
A React hook for creating stateful components. The useState function takes in an initial state value (or a function that returns that initial value), and it returns an array with two elements: the current state value and a setter function. For example:

const [number, setNumber] = useState(42);
Learn more: <https://reactjs.org/docs/hooks-state.html>
var
A keyword for declaring a function-scoped variable that is automatically initialized to undefined when it is hoisted.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var>
Virtual DOM
A "virtual" representation of the DOM kept by React internally. Since this data structure is not tied to the actual DOM, it is much quicker to update than the DOM.

Learn more: <https://reactjs.org/docs/faq-internals.html>
WAI-ARIA
The "Web Accessibility Initiative - Accessible Rich Internet Applications" specification for accessible HTML created by the World Wide Web Consortium (W3C). Oftentimes referred to as just ARIA, this contains a set of HTML attributes that can be added to provide extra information to the accessibility tree.

ARIA attributes are usually grouped into three main categories:

Roles: What the element is doing, used to define the purpose of the element. These can be broken down into a few main subgroups:
Landmark: Major content areas, navigational landmarks.
Structure: Document structure information.
Widget: Interactive elements.
Window: Sub-windows in the browser.
Live Region: Regions with dynamically changing content.
Properties: Extra meaning and characteristics of the element, such as labels.
States: Current state of the element, such as if it is disabled.
Learn more: <https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics>
WeakMap
A built-in JavaScript class for holding key-value pairs similar to the Map class. There are two primary differences between Map and WeakMap:

WeakMap can only have objects as keys, primitive values cannot be added as keys.
WeakMaps hold "weak" references to objects, meaning that they do not prevent the objects from being garbage collected. If no other references to an object exist, it can be garbage collected and automatically removed from the WeakMap. As a result, WeakMaps cannot be iterated over.
Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap>
WeakSet
A built-in JavaScript class for holding unique values similar to the Set class. However, a WeakSet acts just like a WeakMap, meaning that the values must all be objects, and references to those objects are "weakly" held.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet>
Web Worker
A browser API for running scripts in a separate thread from the main execution thread.

A worker object is created with the Worker(filePath) constructor function. The argument to this function is a path to another JavaScript file that will run in a separate thread.

Workers can send messages back and forth with the main thread via the postMessage(message) method and the onmessage event. For example:

// main JavaScript file
const worker = new Worker('worker.js');
worker.postMessage('hello');
worker.addEventListener('message', (event) => {
console.log(event.data); // 'world'
});

// worker.js
postMessage('world');
addEventListener('message', (event) => {
console.log(event.data); // 'hello'
});
In general, most workers are dedicated workers, meaning they can only communicate with the script that created them. However, a SharedWorker can also be created to share a worker with multiple tabs or iframes. That said, SharedWorkers still do not have widespread support across browsers.

Learn more: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API>
