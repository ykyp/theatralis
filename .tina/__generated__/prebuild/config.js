import { defineConfig as e } from "tinacms";
const t = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main", i = e({
  branch: t,
  clientId: "de22fc98-b2e9-4a98-88ab-db440eef3dc1",
  token: "15c0d8bb8ab2d942415a88d7d723902e66c4fd08",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        label: "Events",
        name: "events",
        path: "events",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      },
      {
        label: "Theatres",
        name: "theatres",
        path: "theatres",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      },
      {
        label: "Archive",
        name: "archive",
        path: "archive",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: !0
          }
        ]
      }
    ]
  }
});
export {
  i as default
};
