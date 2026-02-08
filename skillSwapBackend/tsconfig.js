{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": ".",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "typeRoots": ["./node_modules/@types", "./types"]
  },
  "include": [
    "server.ts",
    "routes/**/*.ts",
    "middleware/**/*.ts",
    "models/**/*.ts",
    "config/**/*.ts",
    "types/**/*.d.ts"
  ],
  "exclude": ["node_modules"]
}
