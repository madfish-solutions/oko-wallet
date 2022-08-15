export const shortize = (text: string, start = 5, end = -5) => `${text.slice(0, start)}...${text.slice(end)}`;

export const truncate = (text: string, start = 5) => `${text.slice(0, start)}...`;
