module.exports = {
  root: true,
  extends: ["expo"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  plugins: ["eslint-plugin-react-compiler"],
  rules: {
    "react-compiler/react-compiler": "error",
  },
};
