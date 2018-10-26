import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShareComponent } from './post-share.component';

describe('PostShareComponent', () => {
  let component: PostShareComponent;
  let fixture: ComponentFixture<PostShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
