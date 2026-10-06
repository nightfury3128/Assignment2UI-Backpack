# Smart Backpack

---

## About the Project
The idea behind this project came right before the class when I realised I forgot my laptop charger and the professor asked for a smart object, now as a forgetful college student who loves to travel but keeps on forgetting things like a deodarant or something else, a backpag which can tell me what I should carry before I even start making a list and here we are with the smart backpack. 

Obviously I don't think have the skills to make a fully smart backpack in the matters of three weeks so here are the assumptions I made: 

- **Weight/RFID sensing** inside each compartment, so the bag knows which items are present.
- **A reed switch on the laptop-compartment zipper**, so the bag knows when it's open.
- **A Bluetooth link to the user's phone**, so the bag knows how far away its owner is, and so the phone can display and announce whatever the bag is thinking.
- **A camera and battery of some sort** to make sure that item being put in is correct and the battery to power the display. 


---

## Design Work

The interface is built around four scenarios the bag is meant to help with:

| Scenario       | What the bag expects                                |
| -------------- | --------------------------------------------------- |
| **Normal Day** | iPad, lunch, water bottle                           |
| **Long Work**  | Laptop, lunch, water bottle, iPad, chargers        |
| **Travel Day** | Toothbrush, camera, iPad, chargers                  |
| **Gym Day**    | Clothes, deodorant, shoes, towel, water bottle     |

The four scenarios are something I have to pack for in a normal week (other than gym that was what I have seen my friends carry). The color chocie was from pintrest ("IMG_2927.JPG"). The design was made on a call with two of my friends from home and they were telling me throughout the entire thing what the UI should look like, what should the primary color be and eveyrthign related to it while we were talking about random stuff in between so the entire process took much longer than it should have but I think my design works pretty well. 

> **Early sketch:** `Backpag/1790005124.00402(1).jpg` in the repo root is the original hand-drawn concept sketch for the strap display and phone layout.

---


## Implementation

### Tech stack

- **[Svelte 5](https://svelte.dev/)** with runes (`$state`, `$derived`) — picked because it was the frame work we have used in class 
- **Vanilla CSS** scoped per component — no Tailwind, no component library because I did not want to over-complicate it 

### Code structure

```
Backpag/
├── index.html                  Vite entry point
├── package.json                Scripts: dev / build / preview
├── vite.config.js              Vite + Svelte plugin
├── svelte.config.js            Svelte compiler options
├── public/
│   ├── favicon.svg
│   └── write-up.html           Linked write-up page served statically
└── src/
    ├── main.js                 Mounts <App /> into #app
    ├── app.css                 Global tokens: colour palette, typography, resets
    ├── App.svelte              Three-column layout + header
    └── lib/
        ├── state.svelte.js     Single source of truth (bag contents, zipper,
        │                       weather, phone distance, battery, day type) +
        │                       mutator functions (addItem, setZipper, etc.)
        ├── BackpackUI.svelte   Strap display view
        ├── PhoneUI.svelte      Companion phone view
        └── TestingPanel.svelte Sensor simulator
```



## How to run the code (or visit https://assignment2ui-backpack.vercel.app/#writeup)

```bash
# clone
git clone https://github.com/nightfury3128/Assignment2UI-Backpack.git
cd Assignment2UI-Backpack

# install
npm install

# dev server (hot reload)
npm run dev

# production build + preview
npm run build
npm run preview
```

I have not designed for mobile because it is too congested 
---

## Future Work

Things I'd pick up next, roughly in order of how much they'd add:

- **Mobile layout for the mock-up.** Right now the three-column workspace locks to desktop widths. A stacked layout with tabs would let the write-up be read on a phone, which is where portfolio links usually get opened.
- **Calendar integration (real, not mocked).** The strap display's "Next event" card is static sample data. Hooking it to Google Calendar / iCloud via the phone would make the day-type auto-detect ("you have a flight today → Travel Day") actually work.
- **Haptic / audio design pass.** Right now "Find bag" is a labelled button that doesn't do anything. Pairing it with a short beep + screen flash would communicate the full interaction, even in the mock-up.

### Things I started but didn't finish

- **A Strap Adjustment Screen** — One of the things I wanted but I couldn't figure it in the time was a way to allow the users to adjust the strap and have it perfectly equal everytime which is something that I would love to have on every bag I own (which is two)


---

## AI Documentation

I used Chatgpt, Cursor and Claude (basically all LLMs) for the following: 

-**Chatgpt**- Forming the questionire for the interviews to make sure I ask the right question and overall make sure I am not missing features other people might like on the backpack. 

-**Cursor** - This was used for help me setting up svelete and making sure I was working on the right path, random debugging and also having it change my variable and files names to something better because I was using x,y,z and main.js.

-**Claude** - For grading the assignment before submitting to make sure I met all the requirements and get an idea for the grade I should expect, and for arraanging all files and helping me to push to github since the issue I had was: I made a UI folder which then I uploaded to github but then I intialised another repo inside a subfolder which broke git. 