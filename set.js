const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUkvVUR5Z2w4Mk5NSlBNdGxQbmJzeUk5ZlM3T2h5RS9hY3BKTU12VWdGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidE16OU1JaWplbGNCRTZLdEhSc0g3U1MyMHF5MzlwbkovbGZzTWtvUkRtaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnT09GbGYyWmsvdXZ1eHpRY2NUeDB0R0F5RUFBcWIycko4RDA5T0tMWFhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bG8zWDBURUx1THJoZFlJL1dnR3pPc2w3RmlManRyRkZFWS96QTJCY1dvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklHenA2Z1JnMkpxT2pEQVRtUWZNMVIrQTc2czhJV0FPTVlmNU5rQmtYMEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZmaHlYek91Wk54cXdtS0RXaHFDRjlvUXpySEVkd2RSVU1rcEF1cU1Ya1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUdFTm5rSFRvMTI2dlBVQ1hRMUhjZGpyTXJxaDQzT29VdzhPQjJ6QzBuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWIrRzUrZHVrdmtOTmVIbW5xWStybGg4YXgrdGFGb2xKem44WjVwRFh5bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhSa1FmdDk0SndPemk3OTBFOUkxdTBHYnhFMkJrNndFTk1OMG9DazhUZDR6bTVYU0YzVG92T2NOcnZYMW9CbTFnaXpFc1BUWlVFN1VuK1pDcjRDNUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6InNISkR1bSs0K1lIRkRXSERVaXRjY0o4czNDZUNVTFpURDJLUUhKc09VVmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc2ODczMzQ0MDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTRGOTU0OTlBNUE2QjNFNTlFRDRGMjA0RTRBN0Y5MDQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjU5MDM3NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjc2ODczMzQ0MDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzhCMEEzMEJBNjNFNzNGMDgyQjcxM0I0NzMwMzZDQkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjU5MDM3NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNmxPOEVyWW9TY09iRFZQemVib0NZUSIsInBob25lSWQiOiJiMWRiNDA5Mi04Yjk2LTRhZWItODAzNC01ZWNlNmMwMDIxMjMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2hqaDdxYnBpc1RRZUJZbmQ2WnplanpsS2VzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjloM2t5VjlvM1AzNTJSbHNoOWl6Tmd6ZzdIMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJNWTNKRUJHWiIsIm1lIjp7ImlkIjoiMjc2ODczMzQ0MDc6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoicHJpbmNlbWFzaGFtYmEwOSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUxJdmNFSEVKYkpzclVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUEVMcmhuWkdhZFlGNTAvaGdPMVBZK3NLem00SFNjTFhUYUtOM3YzT0dpVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYkJhcnJhTkpRM1ZQWjZiUHlSY2ZXeVc3T2o0SlJUZEpvVlArRFZwODZ2THFpMU1SVE1QeUlPc2lYT2NWanlGK292dk1WaEk5Nzc3Y09pOUkyK2FLRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjlyVVhmL2xKVURmTzczMWIzejZSVzRmVVAvTGQ2dU5ZZEcxUnhQMFJCNkhyM2ZzN3k4SDA4NlV6NHo4bjFyTDh3Mkw3SWEyc2tZR0M3K1lBVmJ1UUNnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2ODczMzQ0MDc6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVHhDNjRaMlJtbldCZWRQNFlEdFQyUHJDczV1QjBuQzEwMmlqZDc5emhvbCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjU5MDM3MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOaWoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
