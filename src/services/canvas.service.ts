import * as PIXI from 'pixi.js';
export class CanvasService {
    public static styles: PIXI.TextStyle[] = [];
    static getCurve(originalScale: number, desiredScale: number, desiredTime: number, scalePower: number) {
        if (originalScale === 0)
            return desiredScale * Math.pow(desiredTime, -scalePower);
        return ((Math.pow(originalScale, -1) * desiredScale - 1) * Math.pow(desiredTime, -scalePower)) / Math.pow(originalScale, -1);
    }

    static createShadow(graphics: PIXI.Graphics, renderer: PIXI.Renderer, width = 20, height = 20, alpha = 0.3): PIXI.Sprite {
        // const texture = graphics.generateCanvasTexture();
        const texture = renderer.generateTexture(graphics, 1, 1);
        const spriteShadow = new PIXI.Sprite(texture);
        spriteShadow.tint = 0x000000;
        spriteShadow.alpha = alpha;
        spriteShadow.width = spriteShadow.width + width;
        spriteShadow.height = spriteShadow.height + height;
        const shadowBlur = new PIXI.filters.BlurFilter(7, 9);
        shadowBlur.blur = 20;
        spriteShadow.filters = [shadowBlur];
        return spriteShadow;
        // const bs = PIXI.Sprite.from('/assets/sites/og.png');
        // bs.height = 1;
        // bs.width = 1;
        // return bs;
    }
}