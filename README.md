![Driflux Image](projFiles/driflux.ico)

welcome to **Driflux** (*ew sounds like a kitchen sponge cleaner company*), a drag-and-drop game that’s **NOT** fun

<br>the game is all about dragging the right answers into place before time runs out<br>thats all there is

## features

- drag-and-drop answers (we already know this)
- combo streaks
- pop-up distractions (not really distractions but they are just... *there*)
- dynamic scoring based on how fast you answer. be quick or be sorry.
- flashy animations (not really)
- service workers for that sweet offline support (but good luck testing it locally)

## installation

1. download the game files from this repo.
2. open `index.html` in your browser.
3. play, or don't—up to you.

> OPTIONAL SHIT
run it on a local server because **service workers don't work on file://**

local server list:
- **vs code live server**: if you're using visual studio code, you can install the "live server" extension. it serves your project over `http://localhost`. right-click on `index.html` and select **open with live server**.
- **python http server**: if you have python installed, you can start a simple http server:
  - for python 3.x:
    ```bash
    python -m http.server 8000
    ```
  - for python 2.x:
    ```bash
    python -m SimpleHTTPServer 8000
    ```
  then, open `http://localhost:8000` in your browser.
- **node.js http server**: if you have node.js installed, you can install a simple http server via npm:
  ```bash
  npm install -g http-server

## future updates? lol

don't expect many updates. i'm calling it now: i won’t touch this again in the near future. life’s busy, and honestly, this project was just a fun little thing.

## license

this is open-source, so feel free to do whatever you want with it. if you break it, i won't be fixing it. you've been warned
