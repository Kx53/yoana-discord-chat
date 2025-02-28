
# Yoana Discord Chat
**Part of Yoana Project**

AI Discord Bot using **Discord.js**, **Node.js**, **JavaScript**, and **OpenAI API**. Host the application on a Home Server running **Ubuntu Server**.

---

## Installation

### 1. Clone this repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Kx53/yoana-discord-chat.git
```

### 2. Create a `.env` file
Create a `.env` file in the root of your project and add the following variables:
```env
TOKEN=ENTER_YOUR_DISCORD_BOT_TOKEN
OPENAI_KEY=ENTER_YOUR_OPENAI_API_KEY
```
Replace `ENTER_YOUR_DISCORD_BOT_TOKEN` with your Discord bot token and `ENTER_YOUR_OPENAI_API_KEY` with your OpenAI API key.

### 3. Install Dependencies
Make sure you have **Node.js** installed, then run the following command to install all dependencies:
```bash
npm install
```

### 4. Start the Bot

- **For Linux/Ubuntu Servers**: Use the provided shell script to run the bot:
  ```bash
  ./start.sh
  ```
  This script uses `screen` to run the bot in the background.

- **For Windows**: You can run the bot with the following command:
  ```powershell
  node index.js
  ```
  Alternatively, you can create your own PowerShell script for easier execution.

---

## Usage

Once the bot is running, it will connect to Discord and respond to commands based on the OpenAI API. You can interact with it through your Discord server.

---
