# Bostadsbyte-kalkyl (React + TypeScript)

[![Deploy](https://github.com/bombsimon/bostadsbyte-kalkylator/actions/workflows/deploy.yaml/badge.svg)](https://github.com/bombsimon/bostadsbyte-kalkylator/actions/workflows/deploy.yaml)

## What is this?

This is a tool that helps you calculate and visualize your economy when selling
and buying apartments. It's mainly intended as a tool when you already own an
apartment and plan to buy a new one, but can also be used for your first
apartment purchase.

Hopefully the site is self-explanatory regarding all the fields, but what's
important for you is to fill in your salary and capital, information about your
current apartment, and the new apartment. For every field you change, the
calculation will update in real-time showing you your costs, taxes, loans, etc.

### Features

The site is hosted at [bombsimon.github.io/bostadsbyte-kalkylator][site url]
which can be used by everyone. The information is stored in _your browser's
local storage_.

The site supports exporting and importing of its current state in JSON, which
can be used to back up or share your current calculation. You can also export
all the rows as a PDF.

## Development

This started as a test of [ChatGPT 5][chatgpt], which gave me the foundation for
this project. Ever since the first commit, I've been using [Claude] for every
feature. This is almost not written at all by a human, but completely generated
by asking for features.

### Running locally

```bash
npm install
npm run dev
```

[chatgpt]: https://chatgpt.com/
[Claude]: https://claude.ai/
[site url]: https://bombsimon.github.io/bostadsbyte-kalkylator
