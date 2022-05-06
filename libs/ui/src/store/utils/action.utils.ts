import { createAction } from '@reduxjs/toolkit';

export const createActions = <CreatePayload = void, SuccessPayload = void, FailPayload = string>(type: string) => ({
  submit: createAction<CreatePayload>(type),
  success: createAction<SuccessPayload>(`${type}-SUCCESS`),
  fail: createAction<FailPayload>(`${type}-FAIL`)
});

export class Action {
  node: string;

  constructor(node: string) {
    this.node = node;
  }

  generateAction<T>(name: string) {
    return createAction<T>(`${this.node}/${name}`);
  }

  generateActions<S, T, A>(name: string) {
    return createActions<S, T, A>(`${this.node}/${name}`);
  }
}
