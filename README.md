# Welcome to ColorCrafter 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Overview  
This application allows you to generate two random colors: a **main color** and a **contrasting color**. You can copy these colors to the clipboard and use them wherever you need. Additionally, you can configure the color generation settings to:  
1. Choose the encoding format for color generation (e.g., HEX or RGB).  
2. Exclude specific colors (e.g., Red, Green, or Blue) from the generation process, making it suitable for users with difficulty perceiving certain colors.  

## Features  
- Generate a random **main color** and its **contrasting color**.  
- Copy colors to the clipboard with a single click.  
- Customize settings:  
  - Select the color encoding format (HEX or RGB).  
  - Exclude specific colors from being generated.  
- User preferences are stored persistently using **Async Storage**.  

## How It Works  

### Color Generation Logic  
The color generation logic is implemented in the custom hook `useColor`. This hook provides:  

1. **matchedColors**:  
   ```typescript  
   type Colors = {  
     mainColor: string;  
     secondColor: string;  
   };  
