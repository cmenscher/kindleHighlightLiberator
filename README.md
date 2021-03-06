# The Kindle Highlights Liberator
This Javascript bookmarklet allows you to gather all of your Kindle ebook highlights from https://kindle.amazon.com/your_highlights and save them as a JSON file.

To use this bookmarklet...

1. Add a bookmark for any page to your bookmarks bar, even this one!

2. Right click that bookmark and select "Edit..."

3. Paste the contents of khl_bookmarklet.min.js into the "Location" field.

4. Login to https://kindle.amazon.com and click the "Your Highlights" link.

5. Once loaded, click the bookmarklet.

You should see a nice progress report at the top of the page, and at the end of the highlights processing you will be prompted to save a .json file to your machine. Easy peasy, lemon squeezy. I haven't tested this with an account with only one page of highlights. Theoretically it will work, but I have no way of testing that since I have over 1,000 in my account. Please let me know if you run into problems!

A couple of other notes:

- This has only been tested in Chrome for OSX. Let me know if it doesn't work on your browser of choice, but it will need to be modern as the JSON download functionality relies on HTML5 support.

- You might run into weirdness if you have highlights with strange characters or even HTML tags. Amazon has put **very** little work into the Kindle Highlights page, which outputs symbols and characters (including raw < and >) without converting to safe formats like HTML character entities.  Seriously, if you highlight HTML code in your books you'll break the rendering of the highlights page.

This bookmarklet might break at some point if Amazon decides to change the structure of https://kindle.amazon.com/your_highlights. **However, this page has remained virtually unchanged since at least 2010.** (It's still using jQuery 1.2.6 for chrissakes.) It's this insulting lack of motivation to provide readers with rich tools for managing and interacting with their Kindle highlights that inspired me to create this bookmarklet.  Well, that and the fact that Readmill (http://readmill.com) took down their own bookmarklet...which was our last best hope of managing and sharing marginalia from Kindle eBooks.