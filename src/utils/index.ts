const style = (element: HTMLElement, prop: string) => (typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style.getPropertyValue(prop));

const overflow = (element: HTMLElement) => style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

export default (element: React.Component | null | undefined): Window | HTMLElement => {
    if (!(element instanceof HTMLElement)) {
        return window;
    }

    let parent: HTMLElement | null = element;

    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break;
        }

        if (!parent.parentNode) {
            break;
        }

        if (/(scroll|auto)/.test(overflow(parent))) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return window;
};
