```mermaid

sequenceDiagram
    participant user
    participant browser
    participant server

    user ->>browser: POSThttps://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note left of browser: User adds a new note using the SPA version of the app

    browser ->>server: SEND POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: The browser sends the  inputed data to the server without reloading the page

    server ->>browser: SERVER RETURNS POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    browser ->>user: Browser displays the added text and displays it to the user.

    Note right of browser: The browser executes the callback function that renders the notes

```
