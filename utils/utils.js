export const removeQueryParam = (query, param) => {
    const updatedQuery = query;
    delete updatedQuery[param];

    push({ query: updatedQuery }, undefined, { shallow: true });
}