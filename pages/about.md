---
title: About
layout: page-sidebar
permalink: /about

eyebrow: Kankoda
subtitle: The design foundation behind all Kankoda sites.
title-color: blue

image: /assets/headers/kankoda.jpg

description: The Kankoda Design System is the shared foundation for all Kankoda sites.

sidebar-menu:
  title: On This Page

back-link:
  title: Home
  url: /
---

The Kankoda Design System has the layouts, includes, styles and scripts that are shared by the [Kankoda](https://kankoda.com) website and its product sites. This page uses the `page-sidebar` layout, which lists the page's headings in a side menu.

## What it contains

The foundation is made up of a few folders:

* `_includes/kankoda` has components, like buttons, cards, and license tiers.
* `_layouts` has the base layouts, like the blog, page, post, and side menu layouts.
* `_sass/kankoda` has variables and styles.
* `js/kankoda` has scripts that are bundled into a single file.

See the [home page](/) for a showcase of all components.

## How to use it

Add a layout to the front matter of a page, then use the includes in its content.

```liquid
{% raw %}{% include kankoda/components/faq-list items=site.data.faq %}{% endraw %}
```

This renders the questions in a data file as a list:

{% include kankoda/components/faq-list items=site.data.faq %}

## How to sync it

Run the `sync-to` script to sync the foundation to another site. It copies files that are newer than in the target, and removes files that no longer exist.

```bash
./sync-to ../My-Site
```

## How to customize it

A site can override any of the variables in its own `_sass/_site.scss` file.

```scss
:root {
  --bg-blue: rgba(231, 239, 252, 0.7);
  --wrapper-width-wide: 1250px;
}
```

## Side menu

The side menu is sticky, and highlights the current section as you scroll. It's hidden on small screens. A page can customize the menu in its front matter:

```yaml
sidebar-menu:
  title: On This Page

back-link:
  title: Home
  url: /
```

## Contact

Feel free to reach out by [email]({{ site.urls.email }}), or on [Bluesky]({{ site.urls.bluesky }}) and [Mastodon]({{ site.urls.mastodon }}).
