export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const EventsPartsFragmentDoc = gql`
    fragment EventsParts on Events {
  title
  city
  startDate
  endDate
  nicosia_dates
  limassol_dates
  larnaca_dates
  famagusta_dates
  paphos_dates
  event_image
  cover_image
  category
  extended
  theatres {
    __typename
    name {
      ... on Theatres {
        name
        city
        google_maps_link
        address
        latlong
        logo
        website
        instagram_page
        facebook_page
      }
      ... on Document {
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  gallery_images {
    __typename
    imgSrc
  }
  body
}
    `;
export const TheatresPartsFragmentDoc = gql`
    fragment TheatresParts on Theatres {
  name
  city
  google_maps_link
  address
  latlong
  logo
  website
  instagram_page
  facebook_page
}
    `;
export const ArchivePartsFragmentDoc = gql`
    fragment ArchiveParts on Archive {
  body
}
    `;
export const EventsDocument = gql`
    query events($relativePath: String!) {
  events(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventsParts
  }
}
    ${EventsPartsFragmentDoc}`;
export const EventsConnectionDocument = gql`
    query eventsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventsFilter) {
  eventsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventsParts
      }
    }
  }
}
    ${EventsPartsFragmentDoc}`;
export const TheatresDocument = gql`
    query theatres($relativePath: String!) {
  theatres(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TheatresParts
  }
}
    ${TheatresPartsFragmentDoc}`;
export const TheatresConnectionDocument = gql`
    query theatresConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TheatresFilter) {
  theatresConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TheatresParts
      }
    }
  }
}
    ${TheatresPartsFragmentDoc}`;
export const ArchiveDocument = gql`
    query archive($relativePath: String!) {
  archive(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ArchiveParts
  }
}
    ${ArchivePartsFragmentDoc}`;
export const ArchiveConnectionDocument = gql`
    query archiveConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArchiveFilter) {
  archiveConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ArchiveParts
      }
    }
  }
}
    ${ArchivePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    events(variables, options) {
      return requester(EventsDocument, variables, options);
    },
    eventsConnection(variables, options) {
      return requester(EventsConnectionDocument, variables, options);
    },
    theatres(variables, options) {
      return requester(TheatresDocument, variables, options);
    },
    theatresConnection(variables, options) {
      return requester(TheatresConnectionDocument, variables, options);
    },
    archive(variables, options) {
      return requester(ArchiveDocument, variables, options);
    },
    archiveConnection(variables, options) {
      return requester(ArchiveConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client, options) => {
  const requester = async (doc, vars, options2) => {
    let url = client.apiUrl;
    if (options2?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options2.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    });
    return { data: data?.data, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/1.4/content/de22fc98-b2e9-4a98-88ab-db440eef3dc1/github/main",
      queries
    })
  )
);
export const queries = (client, options) => {
  const requester = generateRequester(client, options);
  return getSdk(requester);
};
