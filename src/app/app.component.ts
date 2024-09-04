
getFilenameFromContentDisposition(contentDisposition: string | null): string {
    if (!contentDisposition) return 'unknown';

    // Extract the filename using a regex pattern
    const matches = /filename="([^"]*)"/.exec(contentDisposition);
    return matches && matches[1] ? matches[1] : 'unknown';
  }
