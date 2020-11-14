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
    "addcookies": [], // if an array is empty, anyone can use it
    "balance": [], // for example:
    "ban": ["adminRoleID", "otherRoleID", "lastRoleID"],
    "clearallwarnings": [],
    "clearwarnings": [],
    "eat": [], // put in as many or as little roles as you want
    "exp": [],
    "kick": [],
    "leaderboard": [],
    "moderate": [],
    "purge": [],
    "subcookies": [],
    "warn": [],
    "warnings": []
  }
}
```

You're basically all set! This bot works out of the box thanks to the JSON file databases.

---

<div align="center">

## Commands

```
[] - Optional
<> - required
```

|        Name        |                 Usage                  |                 Description                  |
| :----------------: | :------------------------------------: | :------------------------------------------: |
|        Ban         |       `+ban <mention> [reason]`        |                  Ban a user                  |
|        Kick        |       `+kick <mention> [reason]`       |                 Kick a user                  |
|        Warn        |      `+warn <mention> <warning>`       |                 Warn a user                  |
|      Warnings      |         `+warnings <mention>`          |         See all of a user's warnings         |
|   Clear Warnings   | `+clearwarnings <mention> <index(es)>` |           Clear specifiec warnings           |
| Clear All Warnings |      `clearallwarnings <mention>`      |       Clear all of someone's warnings        |
|       Purge        |       `+purge <amount (2-100)>`        |     Bulk delete messages from a channel      |
|      Moderate      |         `+moderate <mention>`          | Change a user's nickname to "Moderated User" |
|        Exp         |            `+exp [mention]`            |              View a user's EXP               |
|        Eat         |                 `+eat`                 |                 Eat a cookie                 |
|    Add Cookies     |    `+addcookies <mention> <amount>`    |            Add cookies to a user             |
|    Sub Cookies     |    `+subcookies <mention> <amount>`    |         Subtract cookies from a user         |
|      Cookies       |          `+cookies [mention]`          |            View a user's cookies             |
|    Leaderboard     |             `+leaderboard`             |     View the cookies and EXP leaderboard     |

</div>
