---
title:  Writing with the post layout
date:   2026-11-05 06:00:00 +0100
tags:   design components

assets: /assets/blog/26/1105/
image:  /assets/blog/26/1105/image.svg
---

This sample post shows how various content is rendered by the post layout. The headings in the post are listed in the side menu, which follows along as you scroll.

## Text

Paragraphs can have **bold** and *italic* text, `inline code`, and [links](/). A second sentence makes this paragraph long enough to wrap on most screens, which makes it easier to see the line height.

> This is a quote, by nobody in particular.

## Images

![A sample image]({{ page.image }})

Images that are alone in a paragraph use the full width, and have some space around them.

## Code

Code blocks have a title bar with the language, and a button that copies the code.

```swift
struct SampleView: View {

    let title: String

    var body: some View {
        Text(title)
            .font(.headline)
    }
}
```

```yaml
sidebar-menu:
  title: On This Page
```

## Tables

| Name  | Type   | Default |
|-------|--------|---------|
| title | String | -       |
| count | Int    | 2       |

## Conclusion

This is where a real post would have a conclusion.
