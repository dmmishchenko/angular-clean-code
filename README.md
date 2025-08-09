# angular-clean-code

Clean code architecture example: https://github.com/dmmishchenko/angular-clean-code/tree/clean-code-architecture

## Project structure

Short overview:
- Grouped by scope: `review` (feature-specific) and `shared` (reused across the app).
- Grouped by role inside each scope:
  - feature: components/widgets and any feature-only services
  - data-access: use cases and adapters/services/repositories
  - ui: dumb/reusable UI with no business logic
  - util: pure interfaces and models (framework-free)
- Pages compose feature components.
- DI tokens live next to the implementations (e.g., `review/data-access/tokens.ts`, `shared/tokens.ts`).

Dependency direction:
- feature → data-access → util
- ui depends only on util (and Angular), never on feature internals
- shared can be used by any scope

```
src/
  pages/
    review-page/                 # page composed from feature widgets

  libs/
    review/
      feature/                   # widgets (header, right-panel, versions-list, video-menu, workspace)
        header/
        right-panel/
        versions-list/
        video-menu/
        workspace/
          services/
            media-assets.service.ts
      data-access/               # usecases + adapters/services/repositories
        review-page-state/
        route-query-state.service.ts
        review-query-state.decorator.ts
        sync/
        versions-mock.repository.ts
        tokens.ts
        usecases/
      ui/                        # reusable UI (no business logic)
        media-asset/
      util/                      # pure interfaces and models
        interfaces/
        models/

    shared/
      data-access/
        message-bus.service.ts
      util/
        errors/
        interfaces/
        models/
      tokens.ts
```

TypeScript path aliases:

```
"paths": {
  "@review/*": ["src/libs/review/*"],
  "@shared/*": ["src/libs/shared/*"]
}
```

