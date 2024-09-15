/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthLeaderboardImport } from './routes/_auth/leaderboard'
import { Route as AuthAddImport } from './routes/_auth/add'
import { Route as AuthQuestionsQuestionIdImport } from './routes/_auth/questions.$questionId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthLeaderboardRoute = AuthLeaderboardImport.update({
  path: '/leaderboard',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthAddRoute = AuthAddImport.update({
  path: '/add',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthQuestionsQuestionIdRoute = AuthQuestionsQuestionIdImport.update({
  path: '/questions/$questionId',
  getParentRoute: () => AuthRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/add': {
      id: '/_auth/add'
      path: '/add'
      fullPath: '/add'
      preLoaderRoute: typeof AuthAddImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/leaderboard': {
      id: '/_auth/leaderboard'
      path: '/leaderboard'
      fullPath: '/leaderboard'
      preLoaderRoute: typeof AuthLeaderboardImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/questions/$questionId': {
      id: '/_auth/questions/$questionId'
      path: '/questions/$questionId'
      fullPath: '/questions/$questionId'
      preLoaderRoute: typeof AuthQuestionsQuestionIdImport
      parentRoute: typeof AuthRouteImport
    }
  }
}

// Create and export the route tree

interface AuthRouteRouteChildren {
  AuthAddRoute: typeof AuthAddRoute
  AuthLeaderboardRoute: typeof AuthLeaderboardRoute
  AuthIndexRoute: typeof AuthIndexRoute
  AuthQuestionsQuestionIdRoute: typeof AuthQuestionsQuestionIdRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthAddRoute: AuthAddRoute,
  AuthLeaderboardRoute: AuthLeaderboardRoute,
  AuthIndexRoute: AuthIndexRoute,
  AuthQuestionsQuestionIdRoute: AuthQuestionsQuestionIdRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/add': typeof AuthAddRoute
  '/leaderboard': typeof AuthLeaderboardRoute
  '/': typeof AuthIndexRoute
  '/questions/$questionId': typeof AuthQuestionsQuestionIdRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/add': typeof AuthAddRoute
  '/leaderboard': typeof AuthLeaderboardRoute
  '/': typeof AuthIndexRoute
  '/questions/$questionId': typeof AuthQuestionsQuestionIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/add': typeof AuthAddRoute
  '/_auth/leaderboard': typeof AuthLeaderboardRoute
  '/_auth/': typeof AuthIndexRoute
  '/_auth/questions/$questionId': typeof AuthQuestionsQuestionIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/add'
    | '/leaderboard'
    | '/'
    | '/questions/$questionId'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/add' | '/leaderboard' | '/' | '/questions/$questionId'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/_auth/add'
    | '/_auth/leaderboard'
    | '/_auth/'
    | '/_auth/questions/$questionId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRouteRoute: AuthRouteRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/login"
      ]
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/add",
        "/_auth/leaderboard",
        "/_auth/",
        "/_auth/questions/$questionId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/add": {
      "filePath": "_auth/add.tsx",
      "parent": "/_auth"
    },
    "/_auth/leaderboard": {
      "filePath": "_auth/leaderboard.tsx",
      "parent": "/_auth"
    },
    "/_auth/": {
      "filePath": "_auth/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/questions/$questionId": {
      "filePath": "_auth/questions.$questionId.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
