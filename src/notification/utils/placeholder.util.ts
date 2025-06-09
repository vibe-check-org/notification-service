export const extractPlaceholders = (text: string): string[] => {
    const matches = text.match(/{{(.*?)}}/g) ?? [];
    return matches.map(p => p.replace(/{{|}}/g, '').trim());
};

// const placeholders = extractPlaceholders(input.body);