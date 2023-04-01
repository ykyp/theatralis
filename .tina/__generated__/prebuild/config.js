import { defineConfig as a } from "tinacms";
const t = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main", n = a({
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
            type: "string",
            name: "title",
            label: "Title",
            description: "The title of the theatre event"
          },
          {
            type: "string",
            name: "city",
            label: "City",
            description: "Add all cities with a comma eg: Nicosia, Limassol, Larnaca, Pafos, Famagusta"
          },
          {
            type: "datetime",
            name: "startDate",
            label: "Start Date",
            ui: {
              dateFormat: "YYYY-MM-DD"
            }
          },
          {
            type: "datetime",
            name: "endDate",
            label: "End Date",
            ui: {
              dateFormat: "YYYY-MM-DD"
            }
          },
          {
            type: "string",
            name: "nicosia_dates",
            label: "Nicosia Dates",
            description: "Input dates on this format YYYY-MM-DD separated by comma. Example:2022-10-08, 2022-10-09"
          },
          {
            type: "string",
            name: "limassol_dates",
            label: "Limassol Dates",
            description: "Input dates on this format YYYY-MM-DD separated by comma. Example:2022-10-08, 2022-10-09"
          },
          {
            type: "string",
            name: "larnaca_dates",
            label: "Larnacs Dates",
            description: "Input dates on this format YYYY-MM-DD separated by comma. Example:2022-10-08, 2022-10-09"
          },
          {
            type: "string",
            name: "famagusta_dates",
            label: "Famagusta Dates",
            description: "Input dates on this format YYYY-MM-DD separated by comma. Example:2022-10-08, 2022-10-09"
          },
          {
            type: "string",
            name: "paphos_dates",
            label: "Paphos Dates",
            description: "Input dates on this format YYYY-MM-DD separated by comma. Example:2022-10-08, 2022-10-09"
          },
          {
            type: "image",
            name: "event_image",
            label: "Event Image",
            description: "This will be shown in the homepage list"
          },
          {
            type: "image",
            name: "cover_image",
            label: "Cover Image",
            description: "This will be shown in the event details as a cover photo"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "I katigoria/katigories tou ergou, comma separated Biography Drama, Comedy, Standup, Children, Historical, Monologue, Musical, Amateur, Tragedy, Novel, Satire, Opera"
          },
          {
            type: "boolean",
            name: "extended",
            label: "Paratasi/Extended",
            description: "Enable this if the event got extended"
          },
          {
            label: "Theatres",
            name: "theatres",
            type: "reference",
            collections: ["theatres"],
            description: "Theatres locations"
          },
          {
            type: "object",
            name: "additionalImgs",
            list: !0,
            fields: [
              {
                type: "image",
                name: "imgSrc"
              }
            ],
            ui: {
              itemProps: (e) => ({
                label: e == null ? void 0 : e.imgSrc,
                style: { background: `left / contain no-repeat url(${e == null ? void 0 : e.imgSrc})` }
              })
            }
          },
          {
            label: "Image Gallery!!!",
            name: "gallery",
            type: "object",
            list: !0,
            ui: {
              itemProps: (e) => ({ label: e == null ? void 0 : e.title })
            },
            fields: [
              {
                label: "Title",
                name: "title",
                type: "string"
              }
            ]
          },
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
            type: "string",
            name: "name",
            label: "Name",
            description: "Name of the theatre"
          },
          {
            type: "string",
            name: "city",
            label: "City"
          },
          {
            type: "string",
            name: "google_maps_link",
            label: "Google Maps Link"
          },
          {
            type: "string",
            name: "address",
            label: "Address",
            description: "Address of the theatre"
          },
          {
            type: "string",
            name: "latlong",
            label: "Lat/Long",
            description: "On your computer, open Google Maps. Right-click the place or area on the map. This will open a pop-up window. You can find your latitude and longitude in decimal format at the top"
          },
          {
            type: "image",
            name: "logo",
            label: "Theatre Logo"
          },
          {
            type: "string",
            name: "website",
            label: "Theatre's website"
          },
          {
            type: "string",
            name: "instagram_page",
            label: "Instagram page",
            description: "Theatre's instagram page"
          },
          {
            type: "string",
            name: "facebook_page",
            label: "Facebook page",
            description: "Theatre's facebook page"
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
  n as default
};
