```mermaid

sequenceDiagram
    participant user
    participant browser
    participant server

    user ->>browser: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: User visits the single-page app version of the notes app

    browser ->>server: REQUEST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: The browser sends a request to the server for this page

    server ->>browser: SERVER RETURNS POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    browser ->>user: Browser displays the returned page to the user

```
s