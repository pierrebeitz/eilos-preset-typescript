import path from "path";
import type { ConfigFileContents, RuntimeContext } from "eilos";

export default function (ctx: RuntimeContext): ConfigFileContents {
  // Find the base dir from the entry point(s)
  const entryPoint = ctx.getConfig("entry");
  let includeDirs;
  if (typeof entryPoint !== "string") {
    includeDirs = Object.keys(entryPoint).map((key) => {
      return path.dirname(entryPoint[key]) + "/**/*";
    });
  } else {
    includeDirs = [path.dirname(entryPoint) + "/**/*"];
  }

  return {
    compilerOptions: {
      allowJs: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      baseUrl: ctx.getDirectory("project"),
      declaration: true,
      importsNotUsedAsValues: "preserve",
      jsx: "react",
      lib: ["dom", "es2018"],
      declarationDir: ctx.getDirectory("dist"),
      module: "es6",
      moduleResolution: "node",
      noImplicitAny: true,
      outDir: ctx.getDirectory("dist"),
      sourceMap: true,
      strict: true,
      target: "es6",
    },
    include: [
      ...new Set(includeDirs),
      path.join(ctx.getConfigFilePath("@types"), "*"),
    ],
    exclude: ["node_modules", "**/*.spec.ts"],
  };
}
