// Do not insert custom values to the colors or breakpoints Vuestic UI config
// or they will be overwritten! Use Tailwind CSS config instead.

export default {
	breakpoints: {
		thresholds: {
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536,
		},
	},
	colors: {
		variables: {
			primary: '#154EC1',
			secondary: '#666E75',
			info: '#158DE3',
			success: '#3D9209',
			warning: '#FFD43A',
			danger: '#E42222',
			light: '#e4e5e6',
			white: '#ffff',
			dark: '#0d1215',
		},
	},
}