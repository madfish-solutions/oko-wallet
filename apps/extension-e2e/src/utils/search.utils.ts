const createElementMock = (selector: string) => ({
    waitForDisplayed: () => {
        console.log(selector, 'displayed');

        return Promise.resolve(true);
    },
    click: () => {
        console.log(selector, 'click');

        return Promise.resolve(true);
    }
});

export const findElement = (selector: string) => createElementMock(selector);
