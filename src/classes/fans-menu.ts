import { Menu, IMenuClass } from './menu';
import { Observable } from 'rxjs';
import { IPositions } from '../components/Canvas';

export class FansMenu extends Menu implements IMenuClass {
    position = { x: 0, y: 0 };

    constructor(positions: IPositions, container: PIXI.Container) {
        super(positions, container);
        const graphics = new PIXI.Graphics;
        graphics.moveTo(0, 0);
        graphics.beginFill(0x00FFFF);
        graphics.drawCircle(0, 0, 180);
        graphics.endFill();
        const texture = graphics.generateCanvasTexture();
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.on('pointerdown', this.open);
        this._init();
    }

    init = () => {
        
    }

    public open = () => {

    }
    public close = () => {

    }

    resize = () => {
        // this.sprite.position.set(this.position.x, this.position.y);
    }
}
