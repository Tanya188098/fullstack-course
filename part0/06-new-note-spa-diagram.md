sequenceDiagram

    participant browser
    participant server

    Note right of browser: User submits a new note

    Note right of browser: JavaScript prevents the default form submit

    Note right of browser: Browser creates a new note object<br/>with content and date

    Note right of browser: Browser adds the note to the notes list<br/>and rerenders the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: Browser stays on the same page<br/>and sends no further HTTP requests
