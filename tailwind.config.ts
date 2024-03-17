import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: 'var(--primary-color-100)',
                    200: 'var(--primary-color-200)',
                    300: 'var(--primary-color-300)',
                    400: 'var(--primary-color-400)',
                    500: 'var(--primary-color-500)',
                    600: 'var(--primary-color-600)',
                    700: 'var(--primary-color-700)',
                    800: 'var(--primary-color-800)',
                    900: 'var(--primary-color-900)',
                },
                secondary: {
                    100: 'var(--secondary-color-100)',
                    200: 'var(--secondary-color-200)',
                    300: 'var(--secondary-color-300)',
                    400: 'var(--secondary-color-400)',
                    500: 'var(--secondary-color-500)',
                    600: 'var(--secondary-color-600)',
                    700: 'var(--secondary-color-700)',
                    800: 'var(--secondary-color-800)',
                    900: 'var(--secondary-color-900)',
                },
                neutral: {
                    100: 'var(--neutral-color-100)',
                    200: 'var(--neutral-color-200)',
                    300: 'var(--neutral-color-300)',
                    400: 'var(--neutral-color-400)',
                    500: 'var(--neutral-color-500)',
                    600: 'var(--neutral-color-600)',
                    700: 'var(--neutral-color-700)',
                    800: 'var(--neutral-color-800)',
                    900: 'var(--neutral-color-900)',
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        default: 'var(--primary-color-500)',

                    }
                }
            }
        }),
    ],
};
export default config;
