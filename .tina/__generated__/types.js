export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const EventsPartsFragmentDoc = gql`
    fragment EventsParts on Events {
  body
}
    `;
export const TheatresPartsFragmentDoc = gql`
    fragment TheatresParts on Theatres {
  body
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
const generateRequester = (client) => {
  const requester = async (doc, vars, _options) => {
    const data = await client.request({
      query: doc,
      variables: vars
    });
    return { data: data?.data, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(createClient({ url: "http://localhost:4001/graphql", queries }))
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
