module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        './src/components/**/*.{ts,tsx,js,jsx}',
        './src/pages/**/*.{ts,tsx,js,jsx}',
    ],
    theme: {
        extend: {
            spacing: {
                '15': '15rem',
            },
        },
    },
    variants: {},
    plugins: [],
};
