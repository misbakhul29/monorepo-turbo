import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("new-app", {
    description: "Generate a new application (Next.js, Express, Go, NestJS)",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of application would you like to create?",
        choices: ["nextjs", "express", "golang", "nestjs"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the app?",
        validate: (input: string | string[]) => {
          if (input.includes(" ")) return "app name cannot include spaces";
          if (!input) return "app name is required";
          return true;
        },
      },
    ],
    actions: (data: { type: any; name: any; }) => {
      const templateDir = `templates/${data?.type}`;
      const destinationDir = `${process.cwd()}/apps/{{name}}`;

      const actions = [
        {
          type: "addMany",
          destination: destinationDir,
          base: templateDir,
          templateFiles: `${templateDir}/**`,
        },
      ];

      console.log(`\n✅ Generating ${data?.type} app named "${data?.name}"...`);
      
      return actions;
    },
  });
}