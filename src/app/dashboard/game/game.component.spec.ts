import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain div', () => {
    const divElement: HTMLElement = fixture.nativeElement;

    expect(divElement).toBeTruthy();
  });

  it('Div should contain Image element with game', () => {
    component.game = {
      appid: '400',
      name: 'Portal',
      playtime_forever: 159,
      img_icon_url: 'cfa928ab4119dd137e50d728e8fe703e4e970aff',
      img_logo_url: '4184d4c0d915bd3a45210667f7b25361352acd8f',
      has_community_visible_stats: true,
      playtime_windows_forever: 0,
      playtime_mac_forever: 0,
      playtime_linux_forever: 0
    };
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.nativeElement;
    const imgElement: HTMLElement = divElement.querySelector('img');

    expect(imgElement.getAttribute('src')).toBe(`http://media.steampowered.com/steamcommunity/public/images/apps/${component.game.appid}/${component.game.img_logo_url}.jpg`)
  });

  it('Div should not contain Image element without game', () => {
    const divElement: HTMLElement = fixture.nativeElement;

    const imgElement: HTMLElement = divElement.querySelector('img');

    expect(imgElement).toBeFalsy();
  });
});
