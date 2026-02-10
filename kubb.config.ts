import { defineConfig } from "@kubb/core"
import { pluginOas } from "@kubb/plugin-oas"
import { pluginTs } from "@kubb/plugin-ts"
import { pluginReactQuery } from "@kubb/plugin-react-query"

export default defineConfig({
  input: {
    path: "http://localhost:8080/v3/api-docs",
  },
  output: {
    path: "./src/lib/api/generated",
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginReactQuery({
        suspense: false,
      client: {
        importPath: "../../client/axios-client",
      },
      mutation: {
        methods: ["post", "put", "delete", "patch"],
      },
    }),
  ],
})
