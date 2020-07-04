export function getPagePath(array, pageId){
    const page = array.find((page) => pageId == page.pageId);
    return page.path;
}