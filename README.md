# About
### ForgeQuest
We created an RPG game that interwines the typical quests that you would play through while staying on top of your schoolwork, physical wellbeing, and emotional wellness!

### Features (so far):
- Going on adventures to build your stats and gather spells corresponds to real life activities & locations
- Campus events are interwined with raids, a fun way to make use of your previous adventures as well as being involved with campus life.
- To track your stories, you'll slowly build a photo album by completeing in-game quests and raids.

Thank you,
for checking out our game!

- Ruslana, Yenmy, Robel, Natalie


# Dev

The Application is built with react native. To Start run one of the following in the client folder

- npm run android
- npm run ios
  - you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web
-

AWS - for the main bedrock/story engagement + Cloudflare - for event classification and image information
Data bricks - for the data irrigation LanceDB + Langchain

playright - webscapping for events happening

## Env
for react native to work for web run the following

```
npm config set legacy-peer-deps true
npx expo install react-native-web @expo/metro-runtime
```
