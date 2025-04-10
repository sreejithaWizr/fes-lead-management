
// import type { Config } from "tailwindcss";

// export default {
// 	darkMode: ["class"],
// 	content: [
// 		"./pages/**/*.{ts,tsx,js,jsx}",
// 		"./components/**/*.{ts,tsx,js,jsx}",
// 		"./app/**/*.{ts,tsx,js,jsx}",
// 		"./src/**/*.{ts,tsx,js,jsx}",
// 	],
// 	prefix: "",
// 	theme: {
// 		container: {
// 			center: true,
// 			padding: '2rem',
// 			screens: {
// 				'2xl': '1400px'
// 			}
// 		},
// 		extend: {
// 			colors: {
// 				border: 'hsl(var(--border))',
// 				input: 'hsl(var(--input))',
// 				ring: 'hsl(var(--ring))',
// 				background: 'hsl(var(--background))',
// 				foreground: 'hsl(var(--foreground))',
// 				primary: {
// 					DEFAULT: '#0095FF',
// 					foreground: '#FFFFFF',
// 				},
// 				secondary: {
// 					DEFAULT: '#F5F8FA',
// 					foreground: '#1A1A1A',
// 				},
// 				destructive: {
// 					DEFAULT: 'hsl(var(--destructive))',
// 					foreground: 'hsl(var(--destructive-foreground))'
// 				},
// 				muted: {
// 					DEFAULT: 'hsl(var(--muted))',
// 					foreground: 'hsl(var(--muted-foreground))'
// 				},
// 				accent: {
// 					DEFAULT: 'hsl(var(--accent))',
// 					foreground: 'hsl(var(--accent-foreground))'
// 				},
// 				popover: {
// 					DEFAULT: 'hsl(var(--popover))',
// 					foreground: 'hsl(var(--popover-foreground))'
// 				},
// 				card: {
// 					DEFAULT: 'hsl(var(--card))',
// 					foreground: 'hsl(var(--card-foreground))'
// 				},
// 				sidebar: {
// 					DEFAULT: '#FFFFFF',
// 					foreground: '#1A1A1A',
// 					selected: '#E6F4FF',
// 				},
// 				status: {
// 					potential: '#E7F7E9',
// 					potentialText: '#23A336',
// 					inactive: '#F3F3F3',
// 					inactiveText: '#757575',
// 					enrolled: '#E6F4FF',
// 					enrolledText: '#0095FF',
// 					prospective: '#FFF4E5',
// 					prospectiveText: '#FF9500',
// 				}
// 			},
// 			borderRadius: {
// 				lg: 'var(--radius)',
// 				md: 'calc(var(--radius) - 2px)',
// 				sm: 'calc(var(--radius) - 4px)'
// 			},
// 			keyframes: {
// 				'accordion-down': {
// 					from: {
// 						height: '0'
// 					},
// 					to: {
// 						height: 'var(--radix-accordion-content-height)'
// 					}
// 				},
// 				'accordion-up': {
// 					from: {
// 						height: 'var(--radix-accordion-content-height)'
// 					},
// 					to: {
// 						height: '0'
// 					}
// 				},
// 				'fade-in': {
// 					from: {
// 						opacity: '0'
// 					},
// 					to: {
// 						opacity: '1'
// 					}
// 				},
// 				'fade-out': {
// 					from: {
// 						opacity: '1'
// 					},
// 					to: {
// 						opacity: '0'
// 					}
// 				},
// 				'slide-in': {
// 					from: {
// 						transform: 'translateX(-100%)'
// 					},
// 					to: {
// 						transform: 'translateX(0)'
// 					}
// 				}
// 			},
// 			animation: {
// 				'accordion-down': 'accordion-down 0.2s ease-out',
// 				'accordion-up': 'accordion-up 0.2s ease-out',
// 				'fade-in': 'fade-in 0.3s ease-out',
// 				'fade-out': 'fade-out 0.3s ease-out',
// 				'slide-in': 'slide-in 0.3s ease-out'
// 			}
// 		}
// 	},
// 	plugins: [require("tailwindcss-animate")],
// } satisfies Config;


const plugin = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./app/**/*.{ts,tsx,js,jsx}",
		"./src/**/*.{ts,tsx,js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				proxima: ['"Proxima Nova"', "sans-serif"], // ✅ Proxima Nova globally
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "#0095FF",
					foreground: "#FFFFFF",
				},
				secondary: {
					DEFAULT: "#F5F8FA",
					foreground: "#1A1A1A",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "#FFFFFF",
					foreground: "#1A1A1A",
					selected: "#E6F4FF",
				},
				status: {
					potential: "#E7F7E9",
					potentialText: "#23A336",
					inactive: "#F3F3F3",
					inactiveText: "#757575",
					enrolled: "#E6F4FF",
					enrolledText: "#0095FF",
					prospective: "#FFF4E5",
					prospectiveText: "#FF9500",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-out": {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				"slide-in": {
					from: { transform: "translateX(-100%)" },
					to: { transform: "translateX(0)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
			},
		},
	},
	plugins: [plugin],
};
