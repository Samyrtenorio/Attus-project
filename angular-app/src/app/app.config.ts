import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { TodoEffects } from './store/todo/todo.effects';
import { TODO_FEATURE_KEY, todoReducer } from './store/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(TODO_FEATURE_KEY, todoReducer),
    provideEffects(TodoEffects),
  ],
};
