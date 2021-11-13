import { Injectable } from '@angular/core';
import { AuthService, EventParams, EventService, User, UserPreference, UserService } from '@ekhmoi/angular-sdk';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../project/project.service';
const STORAGE_KEYS = {
  USER: '@app/user/info',
  AUTH_TOKEN: '@app/auth/token',
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  appStarted$ = new BehaviorSubject(false);
  constructor(
    private authService: AuthService,
    private gameEventService: EventService,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  setInit(init: boolean) {
    this.appStarted$.next(init);
  }

  async init() {
    return new Promise(async (resolve) => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const preferDarkMode = this.isDarkModePreferred();
      if (preferDarkMode) {
        // FIXME: Ass any
        this.userService.upsertPreferences([{ name: 'UI_THEME', value: JSON.stringify({ selected: 'dark' }) } as any]);
      }
      if (token) {
        const user: User = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || '{}');
        const loggedUser = await this.authService.loginStoredUser(token, user).toPromise();
        if (loggedUser) {
          await this.projectService.getAll().toPromise();
        }
        this.applyUserPreferences(loggedUser?.preferences);
      }
      const params = this.userService.getUserPreference('EVENT_PARAMS');
      this.gameEventService.setParams(new EventParams(params as any), true);
      resolve(true);
    });
  }

  applyUserPreferences(preferences: UserPreference[]) {
    if (preferences && preferences.length) {
      this.userService.upsertPreferences(preferences);
    }
  }

  isDarkModePreferred() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

export function configFactory(config: ConfigService) {
  return () => config.init();
}
