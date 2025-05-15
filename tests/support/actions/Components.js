const { expect } = require('@playwright/test')

export class Popup {

    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        const element = this.page.locator('.swal2-html-container')

        await expect(element).toHaveText(message)
        // essa função abaixo se enquadra para o TOAST quando tem um elemento flutuante, que some depois de segundos
        // await expect(element).not.toBeVisible({ timeout: 5000 })
    }
}