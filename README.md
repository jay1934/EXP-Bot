<div align="center">

# Currency/EXP Bot

[Installation](#Installation) • [How to Use](#How-to-Use) • [Commands](#Commands)

---

## Installation

</div>

##### Prerequisite

- To use this bot, Node.js 12.0.0 or newer must be [installed](https://nodejs.org/en/download/).

##### Downloading and installing steps

1.  **[Download](https://github.com/jay1934/EXP-Bot/archive/main.zip)** the `zip` file.

2.  Configure the Bot:

    - Run `npm i`
    - You will need to [create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) in the **[developers space](https://discordapp.com/developers/applications/me)**
    - Enable both Priviledged Intents

3.  Invite the Bot to your Server:

    - In your bot's application page, navigate to [OAUTH2](https://discord.com/developers/applications/771430839250059274/oauth2)
    - In the "scopes" section, select `bot`
    - In the "bot permission" section, select:

      - `ADMINISTRATOR`

      This will account for permissions needed on all three features.

    - Copy and paste the generated invite link!

4.  Get the Bot Online
    - Run `node index.js`
    - **The bot is now operational ! 🎉**

<br>

---

<div align="center">

## How to Use

</div>

First, you need to fill in all of the values in [`config.json`](/config.json). Most of these values require Discord Snowflakes. If you fon't know how to get those, check [this guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).

```js
{
  "logChannelID": "", // channel where ban/kick/mute/kick alerts will be sent
  "token": "", // your bot token (in the application dashboard)
  "permissions": { // each command accepts role IDs for who can use them
    "cmd1": [], // if an array is empty, anyone can use it
    "cmd2": [], // for example:
    "cmd3": ["adminRoleID", "otherRoleID", "lastRoleID"],
    "cmd4": [], // put in as many or as little roles as you want
    // ...
  }
}
```

You're basically all set! This bot works out of the box thanks to the JSON file databases.

---

<div align="center">

## Commands

See [`commands/help.js`](/commands/help.js)
