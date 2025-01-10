import fs from "node:fs/promises";
import path from "node:path";

const schemasMeta = [
  {name: "_index", getOutputPath: () => "_index.ts"},
  {name: "handlers", getOutputPath: (featureName: string) => `${featureName}.handlers.ts`},
  {name: "repo", getOutputPath: (featureName: string) => `${featureName}.repo.ts`},
  {name: "router", getOutputPath: (featureName: string) => `${featureName}.router.ts`},
  {name: "schema", getOutputPath: (featureName: string) => `${featureName}.schema.ts`},
  {name: "service", getOutputPath: (featureName: string) => `${featureName}.service.ts`}
];

export const createFeature = async (
  featureName: string
): Promise<void> => {
  const newFeatureFolderPath = path.join(process.cwd(), `src/features/${featureName}`);

  await fs.mkdir(newFeatureFolderPath, {recursive: true});
  await Promise.all(
    schemasMeta.map(async (meta) => {
      const content = await processSchematic(meta.name, featureName);

      await fs.writeFile(
        path.join(newFeatureFolderPath, meta.getOutputPath(featureName)),
        content
      );
    })
  );
};

const processSchematic = async (
  schematicFileName: string,
  featureName: string
): Promise<string> => {
  const content = await fs.readFile(
    path.join(__dirname, "file-schematics", `${schematicFileName}.txt`),
    {encoding: "utf8"}
  );

  return content
    .replaceAll("%fName%", featureName)
    .replaceAll("%fNameU%", featureName.slice(0, 1).toUpperCase() + featureName.slice(1))
    .replaceAll("%fNameP%", `${featureName}s`);
};
