import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    // Adding Import Aliases
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@json": path.resolve(__dirname, "./src/json"),
            "@services": path.resolve(__dirname, "./src/services"),
        },
    },

    plugins: [react()],
});
