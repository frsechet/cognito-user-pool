module.exports = {
    "extends": "airbnb-base",
    "parserOptions": { "ecmaVersion": 6 },
    rules: {
        "consistent-return": 0,
        "no-unused-vars": 1,
        "eol-last": 0,
        "arrow-parens": 0,
        "camelcase": 0,
        "max-len": 0,
        "no-underscore-dangle": 0,
        "padded-blocks": ["error", { "classes": "always" }],
        "brace-style": 0,
    },
    globals: {
        "controllers": true,
        "validators": true,
    },
};