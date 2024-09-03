# Woxom AI Website Requirements

## Overview

I am rewriting our site using Vuetify and integrating a chat bot. Our current page can be found at [https://www.woxomhealth.com/](https://www.woxomhealth.com/).

This repo contains some scaffolding of the rebuild. It’s a project using npm/vite/vue/vuetify. To see the current state of the project, run the following command:

```bash
npm run dev
```

The chat bot on the bottom right does not work, but I will provide code from another project to make this work. Working chat bot code can be seen in action at [https://dev-www.woxomai.com/](https://dev-www.woxomai.com/).

Just provide a fake email address, it’s just a proof of concept. Be aware that the bot takes about 10 seconds to get the initial response (this is a lambda cold start).
![img.png](./requirements/img.png)
[README.md](README.md)
I will provide the methods that make this work, and they will need to be bound to elements in the new pop-up chat dialog.

## Additional Requirements

1. Going to the website with no path in the URI (`https://localhost:3000`) should display the home page. Currently, the home page must be selected.
2. Create and add a simple logo.

![img.png](./requirements/woxomai.png)
3. Copy the Home, Health Life, Supplemental, and About pages from the example website.
4. Integrate chat code with the chat widget.
5. Style the chat widget better than it is currently styled.
6. Send the first request for a new chat conversation upon page load (to hide the cold start delay).
7. Keep the chat button visibly disabled until the first message arrives. Once the first message comes in, enable the chat button.

![img.png](./requirements/chatbox.png)
8. Remove footer bar.
9. Remove the search bar.

