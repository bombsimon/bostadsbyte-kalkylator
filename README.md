# Bostadsbyte-kalkyl (React + TypeScript)

One-shot-test med [ChatGPT 5][chatgpt] för att generera en bostadsbyte-kalkyl.
Jag har sedan tidigare ett Google Sheets-dokument där jag gjort denna beräkning
men tänkte testa lyckan med ChatGPT 5.

Efter att ChatGPT producerat en fungerande sida i en ensam fil som gick att
rendera inline i en Canvas bad jag om att få det omskrivet till React +
TypeScript och med en komplett app-layout. Utöver att `vite` inte lades till som
dependency och `React` inte importerades i `FileSync.tsx` så fungerade allt
first try!

Första committen innehåller endast ändringar gällande formattering.

## Usage

```bash
npm install
npm run dev
```

[chatgpt]: https://chatgpt.com/
