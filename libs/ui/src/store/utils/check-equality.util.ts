export const checkEquality = <T, Y>(left: T, right: Y) => JSON.stringify(left) === JSON.stringify(right);
