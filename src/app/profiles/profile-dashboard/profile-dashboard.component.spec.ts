import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileDashboardComponent} from './profile-dashboard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('ProfileDashboardComponent', () => {
  let component: ProfileDashboardComponent;
  let fixture: ComponentFixture<ProfileDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDashboardComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Shouldn`t have image!', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;

    let imgElement = nativeElement.querySelector('img');

    expect(imgElement).toBeFalsy();
  });

  it('Should have image!', () => {
    component.profile.push({
      steamid:"76561198352464616",
      communityvisibilitystate:3,
      profilestate:1,
      personaname:"playwarrior",
      lastlogoff:1575326176,
      profileurl:"https://steamcommunity.com/id/playwarrior4/",
      avatar:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/09/09236f951620775d5ccb6a9cab7e772aa5701b03.jpg",
      avatarmedium:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/09/09236f951620775d5ccb6a9cab7e772aa5701b03_medium.jpg",
      avatarfull:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/09/09236f951620775d5ccb6a9cab7e772aa5701b03_full.jpg",
      personastate:0,
      realname:"Boo",
      primaryclanid:"103582791434293256",
      timecreated:"1482345888",
      personastateflags:0,
      loccountrycode:"NL",
      id:"5dd685ce190bdc0024d48681"
    });
    fixture.detectChanges();

    let nativeElement:HTMLElement = fixture.nativeElement;
    let imgElement = nativeElement.querySelector('img');

    expect(imgElement.getAttribute('src')).toBe('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/09/09236f951620775d5ccb6a9cab7e772aa5701b03_full.jpg');
  });
});
