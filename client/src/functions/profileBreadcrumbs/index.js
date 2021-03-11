function profileBreadcrumbs (path, parentPage, key) {
    const parentPages = path.slice(1, path.length).split('/');
    const pageName = parentPages.pop();

    let result = '/';
    const pathNames = parentPages.map(page => result+=`${page}`);

    return {pageName, parentPages: [parentPage], pathNames, key}
}

export default profileBreadcrumbs