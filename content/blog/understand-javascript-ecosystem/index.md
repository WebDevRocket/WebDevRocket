---
title: Understand the whole JavaScript ecosystem (without losing your sanity) [2019]
date: "2019-10-30"
description: All the front-end tools and libraries, simply explained.
---

They were lost.

Totally lost.

They were seasoned developers, with 10+ years of experience. They were smart. They had strong engineering fundamentals. They were well used to the rapid pace of learning in programming.

But they were switching from back end to front-end.

"This is insane! There are 18 new technologies I have to learn! All at once!", my colleague counted all the frameworks, preprocessors, postprocessors, bundlers, loaders, runners, transpilers, and who-the-heck-knows-what-elses in our shiny new project. "And half of them seem to do exactly the same!"

You have felt this frustration, too.

We all had. A beginner or a pro - we all had.

But it doesn't have to be like that.

## Understanding JavaScript ecosystem doesn't have to be so damn frustrating!

The sheer number of competing tools isn't a problem  - choice is good and competition drives progress. It's the lack of clear-cut boundaries between them that challenges our sanity.

Two years after their transition to front-end, my colleagues still regularly mixed up the responsibilities of Karma and Jasmine; or Gulp and Webpack; or Sass and PostCSS; or Babel and core.js.

But if you forget about particular libraries, if you focus on the broad TYPES of tools and the common problems they solve, everything clicks into place. You won't mix up Gulp and Webpack anymore if you understand the difference between a task runner and a bundler.

And that's what this guide is about.

It describes all the types of tools in JavaScript ecosystem: their goals, usage scenarios, and how they overlap or complement each other.

It's the guide I wish we had when starting our first front-end project.

## How to read this guide

I encourage you to read this guide end-to-end to make sure there are no gaps in your understanding. (I've discovered I had quite a few when I was writing this guide.) I know, though, that the JavaScript ecosystem is MASSIVE - so feel free to just skim the headers or use the table of contents below and pick only what you find interesting.

I've created also a **companion PDF cheat sheet for this guide** [TK: link to LP]. If you prefer a concise bird's-eye view over the full discussion, grab it **HERE** [TK: link to my LP].

## Table of contents

### [JavaScript](#javascript-1)
- [Polyfills / shims](#polyfills--shims)
- [Transpilers](#transpilers)
- [Linters](#linters)
- [Code formatters (beautifiers / prettifiers)](#code-formatters-beautifiers--prettifiers)
- [Static type checkers](#static-type-checkers)
- [Feature detection](#feature-detection)
- [Package managers](#package-managers)
- [Modules](#modules)
  
### [CSS](#css-1)
- [Preprocessors](#preprocessors)
- [Autoprefixers](#autoprefixers)
- [Linters](#linters-1)
- [Normalizers / resets](#normalizers--resets)
- [Feature detection / feature queries](#feature-detection--feature-queries)
- [CSS methodologies](#css-methodologies)
- [CSS Modules / scoped styles](#css-modules--scoped-styles)
- [CSS in JS](#css-in-js)
  
### [Dev and build tools](#dev-and-build-tools-1)
- [Minification](#minification)
- [Concatenation / bundling](#concatenation--bundling)
- [Code splitting](#code-splitting)
- [Tree shaking / dead code elimination](#tree-shaking--dead-code-elimination)
- [Task runners](#task-runners)
- [Module loaders](#module-loaders)
- [Bundlers](#bundlers)
- [Source maps](#source-maps)
- [Live reloading / hot reloading / hot module replacement (HMR)](#live-reloading--hot-reloading--hot-module-replacement-hmr)
- [Starter kits](#starter-kits)
- [Generators](#generators)
- [CLIs](#clis)

### [Testing](#testing-1)
- [Test frameworks](#test-frameworks)
- [Assertion / expectation libraries](#assertion--expectation-libraries)
- [Mock frameworks](#mock-frameworks)
- [Test runners](#test-runners)
- [Browser automation / end-to-end testing libraries](#browser-automation--end-to-end-testing-libraries)
- [Headless browsers](#headless-browsers)

## JavaScript

### Polyfills / shims

#### What is a polyfill / shim?

A polyfill is a code snippet that provides placeholder implementation of a JavaScript or DOM API that is not available in the target browser. For example, if your target browser doesn't natively support `Array.isArray()` method, you could provide it yourself, by augmenting the `Array` object at runtime like this:

```js
Array.isArray = function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
```

Because polyfills are executed at runtime, in the target browser, you can plug missing API methods via polyfill (for example `Object.assign` or `Array.from`) but you can't polyfill new JavaScript syntax constructs which the target browser doesn't understand (for example arrow functions or spread operator). [For syntax extensions you need a _[TRANSPILER](#transpilers)_].

A shim has a similar meaning as a polyfill but is a more general term. You can say that a polyfill is a specialized kind of shim - "a shim for a browser API". The term "shim" is falling out of use, all of the currently popular libraries call themselves "polyfills".

#### Why you may need polyfills?

Browser vendors add new JavaScript and DOM APIs to their engines in a different order and at a different time. If you relied only on what's natively available in your target browsers, you'd have to settle for a lowest common denominator, which would severely limit the number of new features you can use (especially if you need to support older browsers).

Polyfills allow you to "level the field" and use the most up-to-date APIs, no matter which browsers you target and to try out features that are still in proposal stage and are not yet implemented in any browser.

#### Popular polyfill libraries:

The most popular polyfill library is [core.js](https://github.com/zloirock/core-js). It includes polyfills for a wide array of ES2015 - ES2019 and proposal features. [Babel](https://babeljs.io/) [see _[TRANSPILERS](#transpilers)_ section] provides its own, integrated polyfill package  - [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/) - but it also uses [core.js](https://github.com/zloirock/core-js) under the hood.

### Transpilers

#### What is a transpiler?

A transpiler is a "source-to-source" compiler, translating source code in one high-level language to the equivalent source code in another high-level language (or in a different version of the same language). It allows you to write your program in a different syntax than your target runtime environment (a browser) would normally force you to use.

You can think of transpilers as complementary to _[POLYFILLS](#polyfills--shims)_. While polyfills can augment APIs at runtime, transpilers can augment (or completely transform) the language syntax at compile time.

#### Why you may need a transpiler?

The first and the most popular reason to use a transpiler is the same as for _[POLYFILLS](#polyfills--shims)_ - to "level the field" and be able to use the most up-to-date (or even experimental) JavaScript syntax, no matter which browsers you target. [But you'll still need a _[POLYFILL](#polyfills--shims)_ to "plug" the missing APIs.]

You may also want to use a transpiler if you prefer to write your code in a different language than JavaScript (which for now is the only option for web browsers). There are many languages, with different syntax and programming paradigms, that can be transpiled to JavaScript.

#### Popular transpilers:

The most popular JavaScript-to-JavaScript transpiler is [Babel](https://babeljs.io/). It covers all versions of JavaScript, from ES2015 up to the most recent proposal-stage syntax.

Some of the popular "other-language-to-JavaScript" transpilers are [TypeScript](https://www.typescriptlang.org/), [Elm](http://elm-lang.org/), [Reason](https://reasonml.github.io/), [ClojureScript](https://clojurescript.org/), [PureScript](http://www.purescript.org/), [Dart](https://www.dartlang.org/), and [CoffeeScript](http://coffeescript.org/).

### Linters

#### What is a linter?

A linter is a static code checker. It can find syntax errors, detect problematic code patterns (for example a code that is never run because of a `return` statement), and check the style of the code.

A linter does not fix the code - only checks it. However, linters often come with additional tools that can correct simple style errors (add or remove spaces, fix brace position etc.). [There are also more specialized tools to reformat the code - see _[CODE FORMATTERS](#code-formatters-beautifiers--prettifiers)_ section]

#### Why you may need a linter?

A linter helps maintain consistent code conventions across the whole project (especially valuable for bigger teams). [You may alternatively use a _[CODE FORMATTER](#code-formatters-beautifiers--prettifiers)_ to achieve this.]

A linter can also prevent many syntax and structural bugs that in a compiled language would be caught by the compiler but in JavaScript, due to its dynamic nature, would "hide" till that particular branch of code is executed.

#### Popular linters:

The most popular linters are [ESLint](https://eslint.org/) (for JavaScript) and [TSLint](https://palantir.github.io/tslint/) (for TypeScript).

### Code formatters (beautifiers / prettifiers)

#### What is a code formatter?

A code formatter rewrites your code to enforce a consistent code style.

This may seem similar to the goals of a _[LINTER](#linters)_, but a _[LINTER](#linters)_ only warns you about inconsistencies (which you must correct yourself), while a  code formatter automatically corrects (rewrites) your code.

Code formatters are concerned only with the code "style" - they don't detect (or fix) problematic code patterns - so it still makes sense to use a _[LINTER](#linters)_ together with a code formatter.

#### Why you may need a code formatter?

A code formatter frees a programmer from the burden of fixing code style by hand (what a _[LINTER](#linters)_ forces you to do). It can even clean up the whole existing code base.

Code formatters are also more aggressive about clean code layout than _[LINTERS](#linters)_. For example, code formatters break arrays or long lists of function parameters into multiple, neatly aligned lines, while _[LINTERS](#linters)_ don't see "untidy" parameter lists as an error.

A potential drawback of using a code formatter is that everything happens automatically and transparently, so you may feel you have less control over the layout of your code.

#### Popular code formatters:

The most popular (and most powerful) code formatter is [Prettier](https://github.com/prettier/prettier). It supports JavaScript and several other related syntaxes, for example TypeScript, JSON, JSX, or GraphQL.

### Static type checkers

#### What are static type checkers?

JavaScript is a dynamically typed language. A simple JavaScript function like this: `const sum = (a, b) => a + b` allows you to either sum numbers: `sum(10, 20) === 30` or concatenate strings: `sum("10", "20") === "1020"`. You can also mix arguments of different types: `sum(10, "20") === "1020"`, which can lead to unexpected results if you don't remember all the quirks of JavaScript type coercion: `sum(10, true) === 11`.

However, if you explicitly declare that you plan to add only numeric values: `const sum = (a: number, b: number) => a + b`, a type checker will find and tell you about all invalid combinations like `sum(10, "20")`. It will also do a deeper analysis - check variable names, structure of complex objects and so on. For example, take a look at this code:

```js
interface Square {
  width: number;
  height: number;
}
const area = (square: Square) => square.x * square.y;
const someSquare = { widht: 10, height: 20 };
console.log(area(someSquare));
```

There are 2 errors you might miss but the type checker will find: in the body of the `area` function `x` and `y` are used mistakenly instead of `width` and `height` and there is a typo in the `someSquare` object (`widht` instead of `width`).

JavaScript doesn't natively support type annotations, so type checkers must do their analysis at "compile" time and the annotations must be removed before the code can be run in a browser. You can think of a static type checker as of something in-between a _[LINTER](#linters)_ and a _[TRANSPILER](#transpilers)_. It statically analyzes code like a _[LINTER](#linters)_, then it transforms annotated code back into plain JavaScript like a simple _[TRANSPILER](#transpilers)_.

Type checkers and _[LINTERS](#linters)_ look for different kinds of errors, though, so it makes sense to use both together.

#### Why you may need static a type checker?

People are divided over static type checkers. Type checkers automatically prevent the whole class of bugs and type annotations act as a living documentation, very helpful for bigger teams. However, the price to pay is more verbose and less flexible code. People argue that writing unit tests - which you should do anyway to ensure correctness of the program logic - already provides both of these benefits.

On the other hand, static type checkers provide several tooling-related benefits that unit tests alone don't: better code navigation and auto-completion, more powerful refactoring capabilities or highlighting errors in realtime in your IDE.

#### Popular static type checkers:

The most popular JavaScript static type checkers are [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/).

You could notice that I put [TypeScript](https://www.typescriptlang.org/) also in the _[TRANSPILERS](#transpilers)_ section. This is because [TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript (for example it adds an Enum data type) - so technically it is a _[TRANSPILER](#transpilers)_ not a "pure" type checker like [Flow](https://flow.org/). The additions are so cosmetic, though, that most people treat [TypeScript](https://www.typescriptlang.org/) as a "JavaScript with types" not as a new language.

It is also worth noting that many of the non-JavaScript languages that transpile to JavaScript (for example [Elm](http://elm-lang.org/)) are also typed.

### Feature detection

#### What is a feature detection?

Because different browsers support new JavaScript APIs to a varying degree, you may want to detect at run time what's available, so you can use all the fancy modern features in new browsers and provide a fallback or a simplified user experience in older ones.

Feature detection libraries let you reliably discover which features are available in the current browser and query this information from your JavaScript code, so you can conditionally load different script or execute different code path.

Most feature detection libraries can also detect CSS features, but the native _[CSS FEATURE QUERIES](#feature-detection--feature-queries)_ (available in all modern browsers) make this obsolete.

#### Why you may need feature detection?

_[POLYFILLS](#polyfills--shims)_ and _[TRANSPILERS](#transpilers)_ "plug" most of the missing APIs, which often makes feature detection obsolete. However, some APIs can't be _[POLYFILLED](#polyfills--shims)_ (for example Vibration API) or you may want to aggressively optimize the size of your code and avoid loading _[POLYFILLS](#polyfills--shims)_ in a browser that supports necessary features natively. Therefore, there are still valid use cases for feature detection libraries, even if you use _[POLYFILLS](#polyfills--shims)_.

#### Popular feature detection libraries:

The most popular feature detection library is [Modernizr](https://modernizr.com/).

### Package managers

#### What is a package manager?

Even the simplest modern JavaScript app uses many external frameworks and libraries. These frameworks and libraries, in turn, depend on even more libraries, and each of them has many different versions.

A package manager is a tool to control this tree of dependencies. It allows you to declare in a special config file which libraries your app requires (and in which versions), and then download them all with a single command, in correct versions, together with all their dependencies.

A package manager maintains a central, online repository of all available packages and their versions, so you don't have to worry where the package is hosted and how to download it - you only specify the package name and version and it all happens automatically.

You can also search such repository to discover new libraries (popular package managers provide robust search engines for their repositories) as well as publish your own library to the repository, to share it with the world.

#### Why you may need a package manager?

When your app depends on many small libraries, manually tracking, finding, and downloading all of them (and their dependencies; and dependencies of these dependencies…) is close to impossible. A package manager takes care of this for you, which enables you to compose your app from modular, reusable parts. [This may seem similar to JavaScript _[MODULES](#modules)_, but _[MODULES](#modules)_ work at a lower, more internal level, while package managers work at a library / framework level].

Package managers are also fundamental for big, team projects. A package manager makes it easy to freeze and synchronize dependencies between all the team members' machines and between various environments (development, stage, production etc.). It also makes easy to keep libraries' versions up to date in long-living projects.

#### Popular package managers:

The most popular JavaScript package managers are [NPM](https://www.npmjs.com/) and [YARN](https://yarnpkg.com). Both use the same file format to describe dependencies (`package.json`), so they are compatible.

Both popular package managers ([NPM](https://www.npmjs.com/) and [YARN](https://yarnpkg.com)) can, in addition to managing dependencies, run also simple commands, so they overlap a bit with _[TASK RUNNERS](#task-runners)_. Although much less advanced than a full-blown _[TASK RUNNER](#task-runners)_ like [Gulp](https://gulpjs.com/), when paired with a modern _[BUNDLER](#bundlers)_ like [Webpack](https://webpack.js.org/), package manager capabilities are often sufficient, making a _[TASK RUNNER](#task-runners)_ obsolete.

### Modules

#### What are JavsScript modules?

Modules allow you to split your code base into small, independent units, easy to maintain and compose.

Modules also let you hide the implementation details of these units. You can expose some of the module's functions or classes to its clients, while keeping other "private", internal to the module.

Finally, modules work as namespaces, allowing you to use your own and 3rd party "units" without worrying about naming collisions or accidentally overriding other unit's code.

This may seem similar to _[PACKAGES](#package-managers)_, but a _[PACKAGE](#package-managers)_ has broader scope: library / framework vs class / function. (BTW: most _[PACKAGES](#package-managers)_ also internally use modules to organize their code bases).

#### Why you may need modules?

Without encapsulation provided by modules, any reasonably sized code base would be a nightmare to maintain.

Modules enable you to split your code base into small chunks that you can keep, reason about, develop, test, and modify independently, without worrying about accidental collisions or unpredictable interactions between the code inside various chunks.

Modular code also facilitates teamwork: several developers can easily work on different chunks of the code base at the same time, without worrying about the clashes with other team members.

#### Popular JavaScript module formats:

For a long time, JavaScript didn't have official, native modules implementation. As a result, several custom formats (and corresponding _[MODULE LOADERS](#module-loaders)_) gained and lost traction during the years.

Historically, the most important ones were [AMD](https://github.com/amdjs/amdjs-api) (Asynchronous Module Definition), [UMD](https://github.com/umdjs/umd) (Universal Module Definition), [System.register](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemjsregistername--deps-declare), and [Common JS](https://nodejs.org/docs/latest/api/modules.html).

Nowadays, JavaScript finally has a native modules specification ([ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)). It is not yet fully supported by all browsers (though the support is growing fast), but it is well supported by all popular _[BUNDLERS](#bundlers)_, so this is the format you should use in a modern project. (Alternatively, you can use [Common JS](https://nodejs.org/docs/latest/api/modules.html), which is format adopted by [Node.js](https://nodejs.org/en/), and therefore also supported by all modern bundlers - although [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) should be your default choice.)

## CSS

### Preprocessors

#### What is a preprocessor?

A CSS preprocessor is a "source-to-source" compiler (conceptually similar to a JavaScript _[TRANSPILER](#transpilers)_), which enhances CSS syntax or replaces it with an alternative one.

CSS is a simple, declarative language, with limited capabilities of splitting code into smaller chunks, calculating values programmatically, or extracting reusable code fragments. Many people also consider CSS syntax verbose.

Preprocessors extend CSS with capabilities like variables, functions (mixins), or ability to calculate values programmatically. They also simplify CSS syntax, allowing omitting semicolons or braces, nesting and referencing selectors etc.

A plain CSS code:

```css
.modal {
  border-radius: 8px;
  box-shadow: 4px 4px 2px rgba(0,0,0,.2);
}
.modal button {
  border-radius: 8px;
  box-shadow: 4px 4px 2px rgba(0,0,0,.2);
  background-color: #80df80;
}
.modal button:hover {
  background-color: #a0ffa0;
}
```

The same code using preprocessor:

```less
=panel()
  border-radius: 8px
  box-shadow: 4px 4px 2px rgba(0,0,0,.2)
$color-primary: #80df80

.modal
  +panel()
  button
    +panel()
    background-color: $color-primary
    &:hover
      background-color: $color-primary + #202020
```

#### Why you may need a preprocessor?

Due to limited CSS syntax, it's hard to write as maintainable aduplication in CSS. A CSS preprocessor solves this by providing constructs (variables, functions, nested selectors) to split your CSS into small, reusable chunks.

Such reusability supports teamwork, especially on bigger projects with a lot of CSS - when code is split into small, independent chunks, it's easier to work on them in parallel.

It also promotes consistency: variables, mixins, and similar constructs allow you to declare your basic styles (colors, typography etc.) once and reuse them throughout your style sheet, instead of copy-pasting direct, hardcoded values everywhere.

#### Popular preprocessors:

The most popular CSS preprocessors are [Sass](https://sass-lang.com/), [Less](http://lesscss.org/), and [Stylus](http://stylus-lang.com/).

### Autoprefixers

#### What is an autoprefixer?

Browser vendors introduce new CSS features gradually. When a feature is in an early stage, it is prefixed with a vendor-specific prefix (`-webkit-`, `-moz-`, `-ms-`, etc.) until a browser fully adopts the official specification. Using such a feature cross-browser becomes cumbersome, because you have to manually maintain prefixes for all the browsers you support.

A CSS autoprefixer does this automatically for you. You write only one, canonical property name like this:

```css
a {
  display: flex;
}
```

and an autoprefixer rewrites it into something like this:

```css
a {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex
}
```

It may seem similar to what _[CSS PREPROCESSORS](#preprocessors)_ do, but an autoprefixer is rather a *post*processor, as it doesn't compile one source code into a different one but decorates / extends valid CSS - so it makes sense to use both a _[PREPROCESSOR](#preprocessors)_ and an autoprefixer.

#### Why you may need an autoprefixer?

First of all, an autoprefixer frees you from tracking the current state of CSS syntax in various browsers, which is a major pain in the neck when done manually.

What's more, an autoprefixer not only tracks when vendor prefixes are needed, but it also tracks when they are no longer necessary, so you don't have to worry about outdated properties left forgotten in your CSS code.

Your CSS code is also cleaner and more maintainable, as it contains only a single, canonical version of each property instead of several ones (prefixed differently but with the same, duplicated values).

#### Popular autoprefixers:

[PostCSS](http://postcss.org/) is "The" CSS autoprefixer everyone uses.

[PostCSS](http://postcss.org/) started as an autoprefixer but it has grown into a whole ecosystem over time. It has plugins which offer many of the _[PREPROCESSOR](#preprocessors)_ features, _[CSS MODULES](#css-modules--scoped-styles)_, _[CSS LINTER](#linters-1)_ ([stylelint](https://stylelint.io/)), latest CSS syntax _[TRANSPILATION](#transpilers)_ ([cssnext](http://cssnext.io/)), and a grid framework ([LostGrid](http://lostgrid.org/)).

Thus, it's hard to fit [PostCSS](http://postcss.org/) into a single tool category. Some [PostCSS](http://postcss.org/) users don't even use a _[PREPROCESSOR](#preprocessors)_ anymore. Autoprefixing, though, is still [PostCSS](http://postcss.org/)' core and most widely used functionality.

### Linters

#### What is a CSS linter?

A CSS linter checks the syntax of your CSS files in a similar way like _[JAVASCRIPT LINTERS](#linters)_ check you code. It can catch syntax errors, duplicated or overridden rules, and enforce stylistic conventions (whitespace, notation, patterns for selectors, etc.).

As with _[JAVASCRIPT LINTERS](#linters)_, a CSS linter doesn't fix codecan correct simple syntax errors.

#### Why you may need a CSS linter?

Same as with _[JAVASCRIPT LINTERS](#linters)_, CSS linter is useful to maintain consisting coding conventions (especially in a team context), and to detect some hard to manually find problems like overrides.

#### Popular CSS linters:

The most popular CSS linter is [stylelint](https://stylelint.io/). It can understand not only plain CSS syntax but also several _[PREPROCESSORS](#preprocessors)_ like [Sass](https://sass-lang.com/) or [Less](http://lesscss.org/).

### Normalizers / resets

#### What is a CSS normalizer?

When you style a page, you don't specify values for each and every CSS property available. You rely on the browser to provide reasonable defaults for most of the properties. Unfortunately, due to inconsistencies and bugs, these defaults vary among browsers. In effect, you have either to live with your page looking differently in different browsers, or to track and iron out all the inconsistencies manually.

CSS normalizers and resets do such tracking and ironing out for you.

A CSS reset is a CSS snippet which sets the default styles for all the HTML elements, so they look identical in all browsers.

A CSS normalizer is conceptually similar to a CSS reset but less brute force. Modern browsers have pretty reasonable defaults, so there's no need to level everything to the ground zero. A CSS normalizer retains many of the browser defaults, ironing out only known bugs and non-standard quirks. Because of this, a normalizer is smaller than a reset and doesn't clutter your debugging tools so much.

#### Why you may need a CSS normalizer?

With a CSS normalizer it's easier to style you page consistently for a wide array of browsers without spending so much time learning about their quirks.

Also, similarly like a _[CSS AUTOPREFIXER](#autoprefixers)_, a well maintained normalizer tracks changes to browsers' behaviour, so it makes it easier for you to stay up to date.

#### Popular CSS normalizers:

The most popular CSS normalizer is [Normalize.css](https://necolas.github.io/normalize.css/).

### Feature detection / feature queries

#### What is CSS feature detection?

Similarly as with JavaScript, different browsers support different subsets of modern CSS features. Browsers, by default, ignore CSS properties they don't understand, so often it isn't a problem. If a browser doesn't understand `border-radius`, it'll just render the element with square corners and nothing terrible will happen. More complex CSS features, though, cannot be simply ignored. If a browser ignores grid-based layout (`display:grid`), you'll end up with a broken page.

Feature detection allows you to check, at runtime, if a browser supports given feature, and style your page accordingly. This can be done in two ways: using JavaScript _[FEATURE DETECTION](#feature-detection)_ library or using native CSS feature queries (`@supports` directive), available in most modern browsers.

A JavaScript _[FEATURE DETECTION](#feature-detection)_ libraries work by adding special CSS classes to the main `<html>` element. They show the availability (or no availability) of a given feature, for example `<html class="grid">` or `<html class="no-grid">`. You can then use these classes in your CSS like this:

```css
.grid .my-photos {/* lay out your photos list using grid */}
```

With native CSS feature queries you can achieve identical effect without JavaScript, using the `@supports` directive:

```css
@supports (display: grid) {
  .my-photos {/* lay out your photos list using grid */}
}
```

[Don't mistake CSS feature queries with CSS media queries. Media queries (`@media` directive) are used to implement responsive design

#### Why you may need CSS feature detection?

Modern browsers are continuously pushing CSS capabilities forward. It'd be a pity not to use all the newest CSS goodness, pretty well supported by most modern browsers, just because you have to support also some legacy or niche browser. On the other hand, you don't want your page to break completely in such an old browser. Instead, you want your page to gracefully degrade, looking less flashy but still neat and functional.

CSS feature detection gives you the tools to implement such a graceful degradation (or progressive enhancement). You can prepare a basic version of your page, understood by all the browsers you support, and then enhance it with more flashy features when you detect that a browser supports them. This way, you don't break the experience for users with legacy browsers, but also don't degrade the experience for the majority of your users with new browsers.

#### Popular CSS feature detection libraries:

The most popular JavaScript-based CSS feature detection library is [Modernizr](https://modernizr.com/) (it provides both CSS and _[JAVASCRIPT FEATURE DETECTION](#feature-detection)_). Although, if your target browsers allow it, a better option is to use native CSS feature queries.

### CSS methodologies

#### What are CSS methodologies?

CSS rules are cascading (that is, a style set for some HTML element applies also to all its children, and their children, and so on). This is powerful, but it also makes easy to accidentally break the styling of some element deep down the HTML tree while changing the styling of this element's parent or grand-parent. Such hard to control style interactions cause serious debugging and maintenance headaches, especially for bigger projects and teams.

Similar problems may occur because of CSS class name collisions. If you name both product list items and user list items as `class="item"`, then changes in one of the lists will wreak havoc on the other.

CSS methodologies aim to solve this problem by isolating (encapsulating) CSS rules, so they apply only to a well defined, narrow scope and do not cascade nor collide. They do this by setting strict conventions for naming and applying CSS selectors. For example, in the [BEM methodology](http://getbem.com/) you prefix every class name with the name of the component (block) the class is used in (`class="product-list__item"` and `class="user-list__item"`), so class names never collide nor cascade between different blocks.

#### Why you may need a CSS methodology?

Teamwork without a solid CSS class naming convention is hard. It's impossible to verify if a CSS class you're adding doesn't collide with any other classes in the whole project (including those being added at the same time by your teammates).

Even if you work alone, it is impossible to remember all the CSS class names in any reasonably sized project - and impractical to search them all every time you add a new class.

Methodologies like [BEM](http://getbem.com/) are also a perfect fit for modern component-oriented front-end architectures. In a component-oriented approach, a component is an independent, standalone unit, so it makes sense to keep also the component styles independent, scoped per component. _[CSS MODULES](#css-modules--scoped-styles)_ and similar approaches slowly make CSS methodologies obsolete, though, by enforcing similar encapsulation directly through the code instead of just a convention.

#### Popular CSS methodologies:

There are plenty of CSS methodologies. Probably the most popular one is [BEM (Block, Element, Modifier)](http://getbem.com/). Some other popular methodologies are [SMACSS (Scalable and Modular Architecture for CSS)](http://smacss.com/), [OOCSS (Object Oriented CSS)](http://oocss.org/), [SUIT CSS](http://suitcss.github.io/) and Atomic CSS (used for example by [Tailwind CSS](https://tailwindcss.com/)).

### CSS Modules / scoped styles

#### What are CSS modules?

CSS modules are similar to _[CSS METHODOLOGIES](#css-methodologies)_. Their aim is to isolate CSS rules so they don't cascade or collide in uncontrollable ways [see _[CSS METHODOLOGIES](#css-methodologies)_ section for full explanation]. They do it differently, though. Instead of relying on a naming convention, they enforce CSS isolation by automatically modifying CSS selectors at build time (for example, by automatically prefixing CSS class names with a file or a component name).

#### Why you may need CSS modules?

CSS modules provide the same benefits as _[CSS METHODOLOGIES](#css-methodologies)_: easier and less error prone maintenance of your code, especially in big, team projects [see _[CSS METHODOLOGIES](#css-methodologies)_ section for full explanation]. They have two advantages over _[CSS METHODOLOGIES](#css-methodologies)_, though.

First, they enforce isolation through the code, not convention, so it's impossible to break it by mistake. Also, class prefixes are generated automatically, so they can't be mistyped or accidentally duplicated.

Second, class prefixes are added at build time, so they don't pollute your source code. You don't have to manually create long, complicated classes like `class="product-list__item"`. In your source code it's just a simple `class="item"`, the `product-list` prefix is added automatically during build.

A drawback of such approach is that it requires a build system or a framework, while isolation by convention works even in plain HTML. But it's hard to imagine a modern front-end app without any framework or build system, so the problem is rather theoretical.

#### Popular CSS modules implementations:

There are a few different implementations of the concept of isolated CSS. The most popular one is still the "original" [CSS Modules](https://github.com/css-modules/css-modules) specification, (with its implementation in [Webpack CSS Loader](https://github.com/webpack-contrib/css-loader)). There is also an interesting newcomer, gaining a lot of popularity recently: LinkedIn's [CSSBlocks](https://css-blocks.com/).

Scoped styles are also natively implemented in several popular web frameworks, for example Vue ([https://vue-loader.vuejs.org/guide/scoped-css.html](https://vue-loader.vuejs.org/guide/scoped-css.html)) and Angular ([https://angular.io/guide/component-styles](https://angular.io/guide/component-styles)).

An interesting approach to CSS isolation is also the concept of _[CSS IN JS](#css-in-js)_, gaining popularity recently in the React community.

### CSS in JS

#### What is CSS in JS?

CSS in JS can be thought of as a further evolution of _[CSS MODULES](#css-modules--scoped-styles)_. The goals of CSS in JS and _[CSS MODULES](#css-modules--scoped-styles)_ are similar: to isolate CSS rules so they don't cascade or collide in uncontrollable ways, and to do it programmatically instead of by convention [see _[CSS METHODOLOGIES](#css-methodologies)_ and _[CSS MODULES](#css-modules--scoped-styles)_ sections for full explanation].

The approach to implementation is different, though. While _[CSS MODULES](#css-modules--scoped-styles)_ keep CSS code separate and rely on specialized tools like _[CSS PREPROCESSORS](#preprocessors)_ to enhance  CSS capabilities, CSS in JS approach generates and enhances CSS via JavaScript (and mixes CSS and JS code together in a single file).

#### Why you may need CSS in JS?

CSS in JS gives you all the same benefits as _[CSS METHODOLOGIES](#css-methodologies)_ and _[CSS MODULES](#css-modules--scoped-styles)_, but with two huge additional benefits:

First of all, CSS is embedded together with your JavaScript code, which promotes creating small, isolated, and reusable components.

Second, instead of relying on limited functionality of tools like _[CSS PREPROCESSORS](#preprocessors)_ to manipulate your CSS code, CSS in JS gives you full power of an advanced programming language - JavaScript. For example, instead of special constructs for CSS variables, you can just use normal JS variables and constants; instead of mixins you can use full power of JavaScript functions; instead of values interpolation you can use all the JS string manipulation methods, including template stings; and so on.

#### Popular CSS in JS implementations:

CSS in JS is a relatively new approach, so the ecosystem around it is still in flux. However, [Styled Components](https://www.styled-components.com/) are rapidly growing in popularity, and are quickly becoming a dominant CSS in JS implementation.

Some other popular CSS in JS implementations are [JSS](http://cssinjs.org/), [Aphrodite](https://github.com/Khan/aphrodite), [emotion](https://emotion.sh/), and [Radium](https://formidable.com/open-source/radium/).

## Dev and build tools

### Minification

#### What is minification?

All the code in the browser (JavaScript, CSS, HTML) is interpreted, not compiled - that means that it is transferred from the server to the browser not in a byte-code format, but in a human-readable text format.

Such a human-readable format is unnecessarily verbose, resulting in larger file sizes. Minifiers (also called uglifiers) translate human-readable identifiers (JS variable and function names, CSS class names, etc.) into more compact, "mangled" versions, remove all the whitespace and comments, and so on.

For example, a code like this:

```js
const itemPrice = 123;
const valueAddedTax = 0.2;
const numberOfItems = 3;

// total price of all items in the cart
const totalPrice = itemPrice * (1 + valueAddedTax) * numberOfItems;
```

After minification turns into something like this:

```js
const a=123;const r=.2;const v=3;const b=a*(1+r)*v;
```

#### Why you may need minification?

All the web application code (JS, CSS, HTML) is transferred over a wire, so the smaller the source code, the faster page load times will be.

Also, the smaller the source code, the faster a browser will parse it, resulting in shorter page rendering times and the app becoming interactive quicker.

#### Popular minification tools:

Nowadays, minification process is usually handled by a _[BUNDLER](#bundlers)_ like [Webpack](https://webpack.js.org/) or a _[TASK RUNNER](#task-runners)_ like [Gulp](https://gulpjs.com/). All the modern _[BUNDLERS](#bundlers)_ and _[TASK RUNNERS](#task-runners)_ have necessary minifiers either already built-in or available as plugins, so the only thing you have to do is to consult their documentation on how to turn minification on and fine-tune its configuration.

For rare cases when you need a standalone minifier, many of the popular minifiers like [UglifyJS](http://lisperator.net/uglifyjs/), [cssnano](https://cssnano.co/), or [HTMLMinifier](https://github.com/kangax/html-minifier) offer also command-line and programmatic APIs.

### Concatenation / bundling

#### What are concatenation and bundling?

Concatenation and bundling are techniques to make a web page load faster by serving one (or a few) big files instead of hundreds of small ones. Few big files load faster than many small ones because of two reasons:

- a browser has to make fewer HTTP requests
- bigger files can be better optimized (for example, compression works better on bigger files), which means that less data has to be transferred

Concatenation simply "glues" all the files of a given type (for example all JS files or all CSS files) together.

Bundling can be thought of as a more advanced version of concatenation. Modern bundlers understand various types of _[JAVASCRIPT MODULES](#modules)_, and instead of just merging all the files together, they "glue" them intelligently based on "import" statements in your code. They can also mix different types of files, for example they allow you to import CSS from a JS file, and much more. [See the _[BUNDLERS](#bundlers)_ section for more detailed discussion on what modern bundlers can do.]

#### Why you may need concatenation and bundling?

A few big files can be better optimized and load faster than many small ones. On the other hand, it's impossible to develop a reasonably sized app, especially in a team setting, without splitting it into hundreds of small files.

Bundling your code before deploying your app to production gives you the best of both worlds: great development experience without compromising page loading times and frustrating your users.

#### Popular concatenation and bundling tools:

Concatenation and bundling is such a basic process, that there are no standalone tools for it. It is typically handled either by a _[TASK RUNNER](#task-runners)_ like [Gulp](https://gulpjs.com/) or a _[BUNDLER](#bundlers)_ like [Webpack](https://webpack.js.org/) (which, despite the name "bundler", does much more than only bundling - see the full discussion in the _[BUNDLERS](#bundlers)_ section).

### Code splitting

#### What is code splitting?

Code splitting works together with _[BUNDLING](#bundlers)_. The goal of code splitting is to divide your bundle into a couple of smaller bundles, for example a separate bundle for your own code and vendor code, or a separate bundle for each of your application "screens".

#### Why you may need code splitting?

As discussed in the _[BUNDLING](#bundlers)_ section, one big file results in faster loading times than many small ones, so it may seem counter-intuitive why, after concatenating all our files into a single bundle, we want to split it again into smaller chunks.

There are two reasons to do this.

First one is to reduce app loading times by not loading unused code. In case of bigger apps, consisting of several "screens", a user seldom visits all of them in a single session. Loading only the code for the "screens" user actually visits, reduces the amount of code sent to the browser. This makes the app load faster, despite making more HTPP requests.

Second reason is to better utilize caching. Some parts of your code, for example your web framework, are updated much less frequently than your app logic. When you bundle everything together into one file, everything is removed from the cache every time you change anything in your code. When you split your bundle into a couple of chunks (for example, less frequently updated "vendor" chunk and more frequently updated chunk with your app logic), only the updated chunk is invalidated, all other chunks are still served from the cache. This, again, results in less code being sent to the browser, and in shorter loading times, despite making more HTTP requests.

#### Popular code splitting tools:

Again, as with _[MINIFICATION](#minification)_ and _[BUNDLING](#bundlers)_, code splitting is an integral part of a build process, done by a _[BUNDLER](#bundlers)_, so there are no standalone tools for it.

### Tree shaking / dead code elimination

#### What is tree shaking?

The goal of tree shaking is to remove unused code from the _[BUNDLE](#bundlers)_.

Modern apps use a lot of libraries and frameworks. These libraries often have huge APIs, with a lot of methods, of which you typically use only a few. If you just concatenate all the libraries together, the resulting bundle tends to get pretty big. Tree shaking does a deep analysis of your "import" statements and removes all the unused parts of the code, which results in much smaller _[BUNDLE](#bundlers)_.

Dead code elimination is a broader term than tree shaking. It refers to all the possible ways of finding unused code, not only import statement analysis (for example, finding code "hidden" behind the `return` statement). The two terms are often used interchangeably, though.

#### Why you may need tree shaking?

The sole goal of tree shaking is reducing the bundle size, so the browser has less code to load and parse. This results in faster app loading and startup times.

#### Popular tree shaking tools:

Tree shaking is a deeply integrated step of a _[BUNDLING](#bundlers)_ process, therefore it is done internally by a _[BUNDLER](#bundlers)_.

### Task runners

#### What is a task runner?

Build process of modern web apps consists of several steps, for example _[TRANSPILATION](#transpilers)_, _[CSS PREPROCESSING](#preprocessors)_, _[MINIFICATION](#minification)_, _[BUNDLING](#bundlers)_ and so on. There are also many development-related processes like _[LINTING](#linters)_ or _[RUNNING UNIT TESTS](#test-runners)_. These processes have to be orchestrated into a single, consistent build pipeline.

Task runners let you write parameterized code snippets (tasks), that:

- execute various steps of your build process (_[TRANSPILE](#transpilers)_ your JavaScript files, _[PREPROCESS](#preprocessors)_ your CSS files, start your unit tests, and so on)
- can be combined together (for example, the result of _[TRANSPILATION](#transpilers)_ task can be passed to a _[MINIFICATION](#minification)_ task, which then can be passed to _[CONCATENATION](#concatenation--bundling)_ task)
- can be run with different parameters or in different combinations (for example, you may _[MINIFY](#minification)_ your code for production, but not for development)

Such Lego-like building blocks let you easily create complex build pipelines for all your various use cases. What's more, many of the tasks are so common that they are already available as built-in or 3rd party plugins, which simplifies creating your build pipeline even further.

#### Why you may need a task runner?

You'll have a hard time trying to orchestrate your build process manually. Especially in a team setting, where ability to keep your build process in sync between all the devs an run it from Continuous Integration server is crucial.

A task runner lets you fully automate the whole process, commit your tasks to Git, and share them with your teammates and a CI server.

Task runners are getting out of favor, though, as their functionality can be replaced by a _[PACKAGE MANAGER](#package-managers)_ / _[BUNDLER](#bundlers)_ combo.

Modern _[BUNDLERS](#bundlers)_, apart from actual _[BUNDLING](#bundlers)_, can also handle all the other build and development process steps, often even better than task runners. And they don't require you to write any code - only a simple, declarative config file.

Add to this that modern _[PACKAGE MANAGERS](#package-managers)_ can run simple command line tasks - not as powerful as task runners, but  sufficient to run your _[BUNDLER](#bundlers)_ on various environments - and the task runner becomes obsolete.

#### Popular task runners:

The most popular task runner is [Gulp](https://gulpjs.com/). Another popular one was [Grunt](https://gruntjs.com/) but [Gulp](https://gulpjs.com/) made it fall out of favor.

### Module loaders

#### What is a module loader?

For a long time JavaScript didn't have native _[MODULES](#modules)_, and they are still not supported by all browsers (hello Internet Explorer).

Module loaders solve this problem by faking a _[MODULE](#modules)_ system. They wrap all your modules in special function calls to simulate "import" statements, and to isolate them from each other when they are later _[CONCATENATED](#concatenation--bundling)_ and sent to the browser as a single file.
	
You can think of module loaders as a _[POLYFILL](#polyfills--shims)_ for _[JAVASCRIPT MODULES](#modules)_.

#### Why you may need a module loader?

You need a module loader when you want to use _[JAVASCRIPT MODULES](#modules)_, but when you target a browser that doesn't support them natively.

_[BUNDLERS](#bundlers)_ made module loaders obsolete, though. They wrap _[JAVASCRIPT MODULES](#modules)_ during _[BUNDLING](#bundlers)_, in a similar way as module loaders. And they are much more powerful. For example, they let you import not only JavaScript, but also CSS or SVGs.

#### Popular module loaders:

Some of the most popular module loaders were [Browserify](http://browserify.org/), [RequireJS](http://requirejs.org/), and [SystemJS](https://github.com/systemjs/systemjs).

### Bundlers

#### What is a bundler?

The original and still the main role of a bundler is to _[BUNDLE](#bundlers)_ your app code together to reduce the number of files sent to the browser [see _[BUNDLING](#bundlers)_ section for a full discussion].

Modern bundlers have grown to be much more than that, though. Through a simple, declarative config file, they can orchestrate all the steps of your build process (_[MINIFICATION](#minification)_, _[TREE SHAKING](#tree-shaking--dead-code-elimination)_, _[CSS PREPROCESSING](#preprocessors)_ etc.) as well as your development process (_[LINTING](#linters)_, _[HOT MODULE RELOADING](#live-reloading--hot-reloading--hot-module-replacement-hmr)_, and so on).

Apart form JavaScript, bundlers can also process all other types of assets you can find in a web app: CSS files, images, etc. They can even automatically generate the main `index.html` file and serve your app during local development.

#### Why you may need a bundler?

Modern bundlers have accumulated so many crucial responsibilities that nowadays the question should be: "How can you live without one?".

A bundler is a central point for both your build process and your development process. What's more, modern bundlers like [Parcel](https://parceljs.org/) or the newest version of [Webpack](https://webpack.js.org/), do most of the common stuff "automagically", with zero configuration.

As discussed in the _[TASK RUNNERS](#task-runners)_ section, you'll have a hard time trying to orchestrate your build process manually, especially in a team setting. Modern bundlers are much better at this than a _[TASK RUNNER](#task-runners)_, though. They integrate deeper with the build process, have simpler configuration, are faster, and provide better development experience (_[HOT RELOADING](#live-reloading--hot-reloading--hot-module-replacement-hmr)_ etc.).

#### Popular bundlers:

The first bundler, and still the most popular by a wide margin, is [Webpack](https://webpack.js.org/). Two other popular bundlers are [Parcel](https://parceljs.org/) and [Rollup](https://rollupjs.org/).

### Source maps

#### What is a source map?

Your JavaScript and CSS code is _[TRANSPILED](#transpilers)_, _[PREPROCESSED](#preprocessors)_, _[CONCATENATED](#concatenation--bundling)_, _[MINIFIED](#minification)_, and so on - in other words, seriously mangled. In effect, the code you see in browser dev tools or a debugger no longer resembles your original source files and is not human-readable.

A source map is a special file, generated during the build process. It contains mappings between corresponding lines in the resulting, processed file and the original source file. Source maps are not intended to be read by a human. They are used by the tools like debuggers to show you code snippets and line numbers from your original source files instead of the mangled ones.

#### Why you may need a source map?

Source maps make debugging of _[TRANSPILED](#transpilers)_ and _[MINIFIED](#minification)_ code possible. Without source maps the output of a debugger or browser dev tools would be unreadable. Also, all the stack traces would always point to a single _[BUNDLE](#bundlers)_ file, so you'd have a hard time finding in which of your source files the error occured. 

#### Popular source map tools:

Nowadays, most of the tools responsible for "mangling" your code (_[TRANSPILERS](#transpilers)_, _[CSS PREPROCESSORS](#preprocessors)_, _[MINIFIERS](#minification)_, etc.) can generate relevant source maps. 

Modern _[BUNDLERS](#bundlers)_ like [Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/) automate the process of generating all the necessary source maps, so if you are using a _[BUNDLER](#bundlers)_ you just have to tell it via its config file which source maps do you want.

### Live reloading / hot reloading / hot module replacement (HMR)

#### What is hot reloading?

Javascript, CSS, and HTML are dynamic - when you edit the code and refresh the page, your changes are immediately visible. However, this is no longer happening when you use modern build pipeline (_[TRANSPILATION](#transpilers)_, _[CSS PREPROCESSING](#preprocessors)_, _[BUNDLING](#bundlers)_, and so on). In such a case, your code has to go through several build steps before the page can be refreshed.

The goal of live reloading is to make this process dynamic again. Live reloading watches for file changes and automatically runs the build process and refreshes the page in the browser after each change.

Hot reloading takes this idea a step further. It not only rebuilds and refreshes the page after each change to the source code, but it also preserves the page state. For example, imagine that you have a box on your page that is initially collapsed, and you have to click to expand it. After live reload, the page will reset to its initial state and the box will be collapsed again. After hot reload, the box will stay expanded, so you can see the changes to the box immediately, without clicking.

Hot reloading works via hot module replacement (HMR) - a feature provided by most modern _[BUNDLERS](#bundlers)_. Hot module replacement works by wrapping all kinds of modules (Javascript components, CSS files, and so on) in a special API, which can dynamically unload and reload a single module in the browser, without affecting other modules.

#### Why you may need hot reloading?

Hot reloading speeds-up the development tremendously.

First of all, there's less to reload (only a single, small module), so rebuilding, reloading, and parsing the new code in the browser is almost immediate.

Second, hot reloading preserves the state of your application, so you can play with the layout or styling of deeply "hidden" components without having to fill forms, navigate tabs, or expand accordions again and again, after each and every small tweak.

Hot reloading is such a powerful feature of the Javascript ecosystem - with such a great impact on developer experience - that other ecosystems, for example mobile, are recently striving to replicate it.

#### Popular hot reloading tools:

Hot module replacement (HMR), which hot reloading is based on, is an integral part of _[BUNDLERS](#bundlers)_ like [Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/), so you don't have to use any external tools for hot reloading.

You may have to use some additional plugins, though, to help your _[BUNDLER'S](#bundlers)_ _[HMR](#live-reloading--hot-reloading--hot-module-replacement-hmr)_ work correctly with your favorite framework or state management library.

Historically, there were also standalone live reloading tools, for example [Browsersync](https://browsersync.io/) or [LiveReload](http://livereload.com/), but they cannot match the level of integration _[BUNDLERS](#bundlers)_ provide and have fallen out of favor.

### Starter kits

#### What is a starter kit?

You can think of a starter kit as a template or a scaffolding for your project.

A starter kit usually consists of a basic folder structure for your project with a fully configured build and development pipelines (a _[BUNDLER](#bundlers)_ or a _[TASK RUNNER](#task-runners)_, running all the _[TRANSPILERS](#transpilers)_, _[PREPROCESSORS](#preprocessors)_, _[MINIFIERS](#minification)_, etc.; handling different development and production builds; running tests; and so on). Such a pre-configured project template can be copied or cloned from a Git repo, to serve as an initial scaffolding for your app.

#### Why you may need a starter kit?

Front-end app ecosystem is complex. It takes time and knowledge to configure robust build and development pipeline (properly optimized for production, using all the development goodness like _[HOT RELOADING](#live-reloading--hot-reloading--hot-module-replacement-hmr)_, and so on). Similarly, it takes time and knowledge to configure your application's stack well (a framework, routing, state management, testing, server side rendering, etc.).

With a starter kit, you don't have to struggle with all this configuration. You just clone a template and you're done. This is invaluable if you don't have a ton of experience. And even if you have, you still get considerable time-savings, especially if you do a lot of small projects or quick prototypes.

However, starter kits have two drawbacks:

- They are usually too universal. They try to cater to a broad range of use cases, which makes their configuration bloated and hard to understand. You may, of course, delete parts of the configuration you don't need, but this requires knowledge and time - which goes against the main reasons of using a starter kit.
- They are one-off solutions. After copying the initial configuration you get no support from a starter kit to keep your configuration up to date.

[_[GENERATORS](#generators)_ and _[CLIs](#clis)_ address these shortcomings]

#### Popular starter kits:

Starter kits come in various sizes and shapes. Because they are not very flexible, there are as many different starter kits as there are different technology stacks. For an example of how a popular starter kit looks like, check [React Starter Kit](https://reactstarter.com/) and [MEAN.io](http://mean.io/).

### Generators

#### What is a generator?

A generator is conceptually similar to a _[STARTER KIT](#starter-kits)_ in that is creates the configuration and initial structure of your app for you. The difference is that instead of providing a static template, it builds the configuration interactively. It allows you to omit some parts of the config, or to select between several alternatives (e.g. which of several available _[CSS PREPROCESSORS](#preprocessors)_ do you want to use).

Many generators, in addition to generating the initial project scaffolding, can also generate templates for components, unit tests and so on during development.

In theory, generators can also be re-run, which allows you to keep your initial config up-to-date (if you haven't modified it manually). In reality, though, you usually do modify it, so this seldom works smoothly [see how _[CLIs](#clis)_ solve this problem].

#### Why you may need a generator?

Generators address the main concern with _[STARTER KITS](#starter-kits)_ - a bloated config. While starter kits are an all-or-nothing deal, generators let you fine-tune the config according to your needs. 

#### Popular generators:

The most popular generator is [Yeoman](http://yeoman.io/). What's interesting, [Yeoman](http://yeoman.io/) is not a generator for a particular tech stack, but rather a framework to build generators. It has a repository of hundreds of different generators for various technology stacks and you can also create and publish your own.

### CLIs

#### What is a CLI?

A CLI allows you to create a scaffolding for your app similarly to a _[GENERATOR](#generators)_, but keeps this scaffolding hidden. You can extend the config (for example install additional libraries) but you can't edit it. Because the configuration is hidden, CLI maintains full control over it and can automatically update it when a newer, better version becomes available, without breaking any of your additions.

If what CLI allows you to extend is not enough for you, you can "eject" - unhide the config and edit it manually. This gives you full flexibility, similar to a _[STARTER KIT](#starter-kits)_, but at the cost of opting-out from further automatic updates.

CLIs are the current state of the art, displacing _[STARTER KITS](#starter-kits)_ and _[GENERATORS](#generators)_. However, modern _[BUNDLERS](#bundlers)_ like [Parcel](https://parceljs.org/) or [Webpack](https://webpack.js.org/) compete with CLIs to some degree, by offering zero-configuration defaults.

#### Why you may need a CLI?

The biggest strength of a CLI is its ability to auto-update. This allows you to keep up with the newest best practices without much effort on your side.

Another good thing is that the config is hidden. This makes it easier to reason about your extensions to the config, because they are not mixed with the part maintained by the CLI (which is usually pretty complex).

#### Popular CLIs:

CLIs are integrated much tighter with a particular tech stack than _[GENERATORS](#generators)_ or _[STARTER KITS](#starter-kits)_. The three most popular CLIs are CLIs for the three currently most popular front-end frameworks: [Create React App](https://github.com/facebook/create-react-app), [Angular CLI](https://cli.angular.io/) and [Vue CLI](https://cli.vuejs.org/).

## Testing

### Test frameworks

#### What is a test framework?

A test framework provides the syntax and structure for your tests. Typically it allows you to define your individual tests (`it`, `test`), organize them into bigger suites (`describe`), and manage the test setup (`beforeEach`, `beforeAll`). It also executes your _[ASSERTIONS](#assertion--expectation-libraries)_ (a.k.a. expectations) and decides if a given test passed or failed.

A bare-bone test framework provides only a minimal set of basic _[ASSERTIONS](#assertion--expectation-libraries)_, though. For a more robust and expressive choice of _[ASSERTIONS](#assertion--expectation-libraries)_ you need an _[ASSERTION LIBRARY](#assertion--expectation-libraries)_.

Also, when you test a web app that relies on the DOM, you have to run your test code inside a web browser (real or fake). A bare-bone test framework doesn't provide such an environment - this is the domain of _[TEST RUNNERS](#test-runners)_.

Many of the modern test frameworks are not bare-bone, though. For example, [Jasmine](https://jasmine.github.io/) has a robust _[ASSERTION LIBRARY](#assertion--expectation-libraries)_ already built-in, and [Jest](https://jestjs.io/) is both a test framework and a test runner. That's why there's so much confusion around which tool is responsible for what.

#### Why you may need a test framework?

To be able to write your tests. A test framework is the only piece of puzzle that is obligatory. All the rest, like an _[ASSERTION LIBRARY](#assertion--expectation-libraries)_, a _[MOCK FRAMEWORK](#mock-frameworks)_, or a _[TEST RUNNER](#test-runners)_ are optional, depending of what your needs are and how feature-complete your test framework is.

#### Popular test frameworks:

The most popular tests frameworks are [Jest](https://jestjs.io/), [Jasmine](https://jasmine.github.io/), and [Mocha](https://mochajs.org/).

### Assertion / expectation libraries

#### What is an assertion library?

A typical test consist of three steps: a setup, an action, and assertions (expectations), like this:

```js
test('clicking on a todo marks it as completed') {
  // setup
  const todo = renderTodo({ completed: false });

  // action
  todo.simulate('click');

  // expectations
  expect(todo.attr('class').split(' ').includes('completed')).toEqual(true);
};
```

A generic `toEqual` assertion (built-in into every _[TEST FRAMEWORK](#test-frameworks)_) is sufficient to describe any expectations you may have. It is not very readable, though.

Consider how we could progressively improve expectations from the above example:

```js
// generic equality expectation
expect(todo.attr('class').split(' ').includes('completed')).toEqual(true);

// more specialized expectation (inclusion of item in an array)
expect(todo.attr('class').split(' ')).toInclude('completed');

// domain-specific expectation (DOM / CSS related)
expect(todo).toHaveClass('completed');

// custom expectation (tailored to your application)
expect(todo).toBeCompleted();
```

An assertion library extends the basic set of assertions provided by a test framework and gives you an API for creating your own custom ones, so you can write such expressive expectations as above.

#### Why you may need an assertion library?

The sole goal of an assertion library is to make your tests more readable and expressive. In a long living project, especially in a team setting, this is something you should be serious about.

#### Popular assertion libraries:

Similarly like with _[TEST RUNNERS](#test-runners)_ and _[MOCK FRAMEWORKS](#mock-frameworks)_, situation here is fuzzy, because many popular _[TEST FRAMEWORKS](#test-frameworks)_ have robust assertion libraries already built-in (for example [Jasmine](https://jasmine.github.io/) and [Jest](https://jestjs.io/)).

The most popular stand-alone assertion library is [Chai](https://www.chaijs.com/).

### Mock frameworks

#### What is a mock framework?

A mock framework allows you to fake the dependencies of your code under test. For example, if your code uses a library that sends emails, you can substitute this library with a fake one. This will allow you to pretend that emails were sent and to check what was inside an email, without having to set-up a real email server. 

Mocking allows you to decouple your tests from the hard to set-up or slow dependencies, and to split your tests into smaller and more focused units. This makes your tests easier to write and faster to run.

#### Why you may need a mock framework?

In theory, you could create all your mocks by hand - a framework is not necessary to use mocks in your tests. You'd have to write a lot of repetitive, boilerplate code, though. Using a framework saves you a lot of work and makes your tests simpler.

An additional benefit is that the way you create mocks is standardized, which is helpful in a team setting.

#### Popular mock frameworks:

Again, as with _[ASSERTION LIBRARIES](#assertion--expectation-libraries)_ and _[TEST RUNNERS](#test-runners)_, many popular _[TEST FRAMEWORKS](#test-frameworks)_ - for example [Jasmine](https://jasmine.github.io/) and [Jest](https://jestjs.io/) - have robust mock frameworks already built-in.

The most popular stand-alone mock framework is [Sinon.JS](https://sinonjs.org/).

### Test runners

#### What is a test runner?

When testing a plain Javascript code all you need to run your tests is a Javascript runtime (like, for example, Node.js). When you test a front-end app, though, things get more complicated. A front-end app interacts with the DOM and various web browser APIs, so it won't run in a plain Javascript runtime - it needs a  browser-like environment (a real one or simulated).

A test runner manages such a browser-like environment. It can automatically instantiate a browser (a full one, a _[HEADLESS](#headless-browsers)_ one, or a simulated one like [jsdom](https://github.com/jsdom/jsdom)), inject your test code into it, and then extract your test results so they can be displayed outside of a browser (for example in a console).

#### Why you may need a test runner?

In theory, you don't need a test runner to run your tests inside a real browser. You just have to create a dummy HTML file which will load your tests via `<script>` tag and open this file in a browser. Such a solution is very inflexible and limited, though.

Because a test runner automatically injects and extracts your tests and their results, it allows you to run your tests not only in a browser window, but practically from everywhere: from console, Continuous Integration server or directly from your editor.

A test runner can also run your tests not only in a real browser, but also in a _[HEADLESS](#headless-browsers)_ one, so you don't have to clutter your screen with browser windows and can easily run your tests on environments without Graphical User Interface (which simplifies your Continuous Integration server setup).

#### Popular test runners:

Again, like with _[ASSERTION LIBRARIES](#assertion--expectation-libraries)_ or _[MOCK FRAMEWORKS](#mock-frameworks)_, some _[TEST FRAMEWORKS](#test-frameworks)_ already have a test runner built-in (for example [Jest](https://jestjs.io/)). They are not as powerful as standalone test runners, but for many use cases they are pretty sufficient.

The most popular standalone runner is [Karma](https://karma-runner.github.io/).

[What adds even more to the overall confusion, [Karma](https://karma-runner.github.io/) feature set overlaps also with _[BUNDLERS](#bundlers)_: it can _[TRANSPILE](#transpilers)_ code via [Babel](https://babeljs.io/) and _[LIVE-RELOAD](#live-reloading--hot-reloading--hot-module-replacement-hmr)_ it. In theory, it can be used as a standalone, self-contained solution to build and execute your tests. Modern _[BUNDLERS](#bundlers)_ like [Webpack](https://webpack.js.org/) are much more advanced, though, so nowadays people seldom use [Karma](https://karma-runner.github.io/) this way.]

### Browser automation / end-to-end testing libraries

#### What is a browser automation library?

A browser automation library fakes user interaction with a web page. It provides a programmatic API to load a page and then to simulate various user actions like mouse clicks or keyboard input. It can also read the contents of the page, so you can programmatically verify the outcomes of those simulated user interactions. Under the hood, a browser automation library can use either a real browser or a _[HEADLESS](#headless-browsers)_ one.

Although many browser automation libraries focus on end-to-end testing (they even call themselves end-to-end testing libraries, not automation libraries) don't confuse automation library with a _[TEST RUNNER](#test-runners)_. A _[TEST RUNNER](#test-runners)_ runs your unit tests "inside" a browser-like environment, while a browser automation library lets your end-to-end tests control the app running in a browser from the "outside", like a real user would do.

#### Why you may need a browser automation library?

Browser automation libraries are used mostly for end-to-end testing.

They are useful also for all use cases when you don't have control of the app internals and must treat it as a black-box, like a real user does - for example web crawling or screen scraping.

#### Popular browser automation libraries:

There's a lot of confusion here, because the scope of different automation libraries differs widely.

Some libraries, like [Selenium](https://www.seleniumhq.org/) and [Puppeteer](https://developers.google.com/web/tools/puppeteer/) are general purpose. They allow you to simulate user actions and read the content of the page, but they don't care if you'll use it for testing, scraping, or whatever else.

Some libraries, like [Cypress](https://www.cypress.io/), focus solely on testing, and come with a test framework and assertion library already bundled.

Finally, there are libraries like [CodeceptJS](https://codecept.io/), which focuses only on providing specialized testing syntax on top of existing, general purpose automation libraries like [Selenium](https://www.seleniumhq.org/) or [Puppeteer](https://developers.google.com/web/tools/puppeteer/) (which [CodeceptJS](https://codecept.io/) allows you to choose).

There are also narrowly-specialized libraries like [Protractor](https://www.protractortest.org/), which focuses on end-to-end testing for apps written in [Angular](https://angular.io/) framework.

The two most popular libraries nowadays are general purpose ones: [Selenium](https://www.seleniumhq.org/) and [Puppeteer](https://developers.google.com/web/tools/puppeteer/). [Selenium](https://www.seleniumhq.org/) is the long standing king of the hill of browser automation. [Puppeteer](https://developers.google.com/web/tools/puppeteer/), a relative newcomer, has gained a lot of traction because of its speed and official Google Chrome team support. [Puppeteer](https://developers.google.com/web/tools/puppeteer/) works only with Chrome, though, while [Selenium](https://www.seleniumhq.org/) can automate many different browsers, so it is still a goto solution if you need a cross-browser testing capability.

### Headless browsers

#### What is a headless browser?

A headless browser is a full-featured web browser running without the Graphical User Interface. It provides an API, so it can be controller programmatically from a script or test code instead of mouse or keyboard input.

As opposed to simulated browsers like [jsdom](https://github.com/jsdom/jsdom) or [Zombie.js](http://zombie.js.org/), a headless browser is based on a real browser's engine (the most popular engine among headless browsers is Chromium).

#### Why you may need a headless browser?

A headless browser is useful primarily for testing. It can be used by _[TEST RUNNERS](#test-runners)_ and _[BROWSER AUTOMATION LIBRARIES](#browser-automation--end-to-end-testing-libraries)_, and it simplifies the configuration for Continuous Integration servers (a CI server doesn't have to provide a GUI).

There are also different use cases for a headless browser, for example web crawling or page scraping - in short, all situations where you need a fully-featured browser engine to run or parse some page but you want to control its behavior programmatically. You seldom use a headless browser directly, though. Usually you use a _[BROWSER AUTOMATION LIBRARY](#browser-automation--end-to-end-testing-libraries)_ like [Puppeteer](https://developers.google.com/web/tools/puppeteer/), which uses headless browser under the hood.

#### Popular headless browsers:

For a long time, the most popular headless browser was [PhantomJS](http://phantomjs.org/) (based on Chromium engine). But when the Google Chrome team officially released [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome), it became obsolete and its development was suspended. [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) is now the most popular headless browser.

## You are now armed - go forth and kick butt!

Congratulations - you've made it! You have read (or at least skimmed-through) this guide.

You are now armed to conquer any JavaScript stack.

You can now face a project with 18 new technologies and plow through it like a bulldozer.

You can now stay up to date with all the newest JavaScript libraries  without losing your sanity.

GO FORTH AND KICK BUTT!!!

## Call to action

Wouldn't it be nice to have a **compressed version of this guide** [TK: insert link] in handy, so you can quickly check it anytime you need?

That's why I made also a **companion PDF cheat sheet** [TK: insert link] for this guide. It contains the same information as this post, condensed into X [TK: insert correct number] printable pages of easy to scan bullet-points.

Go get it **HERE**! [TK: insert link]