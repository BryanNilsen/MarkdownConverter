# Markdown to HTML

## A JavaScript Exercise

Your task is to build a web application that will display a markdown file as HTML.

The web page should contain a text box, a button and an area to display HTML. When the user enters a URL into the text box and clicks the button, the application should fetch the file at the given URL, interpret it as a markdown file, generate HTML from the markdown file and display the HTML on the page.

To test your code, use the "raw" URL to this gist.

For this challenge we'll be using a limited subset of markdown, but feel free to incorporate more markdown features once you've finished.

## Phase One

### Headers

Headers in markdown are created by using one or more # at the beginning of a line. A single # should be converted to an H1 tag, two ## should be interpreted as an H2, and so on up to H6.

For example the following markdown...

```
#### An H4 looks like this
```

...should become...

#### An H4 looks like this

### Unordered Lists

Unordered lists in markdown are lines that start with a *. Convert unordered lists to UL and LI tags in HTML.

For example the following markdown...

```
* Thing One
* Thing Two
* Thing Three
```

...should become...

* Thing One
* Thing Two
* Thing Three


### Code blocks

Code blocks in markdown are surrounded by three back-ticks (```). In HTML code blocks should be wrapped in PRE tags. When you encounter a line that starts with three back-ticks, each line after should be in a PRE tag until you reach another line that starts with three back-ticks.

### Paragraphs

A blank line in a file denotes a paragraph boundary. The text between blank lines should be wrapped in P tags.

## Phase Two

### Ordered Lists

Each element in an ordered list is preceded by a number followed by a period. The number may be sequential or it may be the number 1 repeated.

For example the following markdown...

```
1. First
2. Second
3. Third
```

...should become...

1. First
2. Second
3. Third

...and...

```
1. First
1. Second
1. Third
```

...should become...

1. First
1. Second
1. Third

### Bolded Text

To make text bold surround it in double stars (**).

For example the following markdown...

```
That's a **bold move**!
```

...should become...

That's a **bold move**!

### Italicized Text

For text in italics, surround it with underscores (_) or single stars (*).

For example the following markdown...

```
This is _italics_ and *this is too*!
```

...should become...

This is _italics_ and *this is too*!

## Phase Three

### Hyperlinks

Hyperlinks are created by specifying the text of the link and the URL for the link. The text is in square brackets and is followed by the URL in parentheses.

Links can appear in any text throughout the page.

For example the following markdown...

```
Get some JavaScript help at [MDN](https://developer.mozilla.org/en-US/)
```

...should become...

Get some JavaScript help at [MDN](https://developer.mozilla.org/en-US/)

## Images

The syntax for images is similar to that of hyperlinks, but it starts with an exclamation point. The text in the square brackets is the "alt" text that is used by screen readers to describe images to those who cannot see them.



For example the following markdown...

```
![image of glasses](https://avatars1.githubusercontent.com/u/3890273?s=460&v=4)
```

...should become...

![image of glasses](https://avatars1.githubusercontent.com/u/3890273?s=460&v=4)