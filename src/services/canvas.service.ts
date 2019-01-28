export class CanvasService {
    public static styles: PIXI.TextStyle[] = [];
    static getCurve(originalScale: number, desiredScale: number, desiredTime: number, scalePower: number) {
        if (originalScale === 0)
            return desiredScale * Math.pow(desiredTime, -scalePower);
        return ((Math.pow(originalScale, -1) * desiredScale - 1) * Math.pow(desiredTime, -scalePower)) / Math.pow(originalScale, -1);
    }

    static createShadow(graphics: PIXI.Graphics, width = 20, height = 20, alpha = 0.3): PIXI.Sprite {
        const texture = graphics.generateCanvasTexture();
        const spriteShadow = new PIXI.Sprite(texture);
        spriteShadow.tint = 0x000000;
        spriteShadow.alpha = alpha;
        spriteShadow.width = spriteShadow.width + width;
        spriteShadow.height = spriteShadow.height + height;
        const shadowBlur = new PIXI.filters.BlurFilter();
        shadowBlur.blur = 20;
        spriteShadow.filters = [shadowBlur];
        return spriteShadow;
    }
}