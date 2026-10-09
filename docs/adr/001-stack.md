# ADR-001: Adopt the Garage Boilerplate technology stack for the project demonstration

**Status:** Accepted
**Date:** 03/09/2026
**Deciders:** Project team, who decided to use the Garage Boilerplate
**Consulted:** Garage Boilerplate documentation

---

## Context

The project requires a working demonstration, but the team has not yet decided whether the demonstration will be an AI agent or another type of application. A technology baseline is needed so that setup, prototyping, testing, and documentation can proceed without waiting for the final demonstration concept.

The repository was created from the Garage Boilerplate. It already contains a frontend, an optional backend, authentication, database integration, validation, testing, and CI configuration. Replacing these technologies before the demonstration requirements are known would create migration work without addressing a confirmed project need.

The versions recorded here are the versions currently declared in the repository's package manifests.

## Options considered

### Option A: Retain the existing TypeScript and Next.js boilerplate

- Pro: The application structure, authentication, Firestore integration, tests, documentation, and CI are already configured.
- Pro: Next.js supports both browser interfaces and server-side functionality, leaving room for an AI-agent demonstration or a conventional web application.
- Pro: Using the versions pinned by the boilerplate reduces setup and compatibility work.
- Con: The team inherits the complexity and conventions of a full-stack monorepo before all demonstration requirements are known.
- Con: Some features, particularly the Firebase Cloud Functions backend, may not be required by the final demonstration.

### Option B: Replace the boilerplate with a JavaScript application or a different framework

- Pro: A smaller application could be simpler if the final demonstration has very limited requirements.
- Pro: The team could select technologies tailored specifically to the final demonstration concept.
- Con: Existing authentication, database, testing, security, and CI work would need to be replaced or reconfigured.
- Con: JavaScript would remove compile-time type checking already used throughout the repository.
- Con: Changing frameworks now would delay development before a concrete limitation of the existing stack has been identified.

### Option C: Do nothing

- Pro: No immediate documentation or implementation effort is required.
- Con: Contributors may use inconsistent languages, framework versions, or supporting libraries.
- Con: The project's actual technology constraints would remain implicit in package files rather than being recorded as an architectural decision.

## Decision

We will use the technology stack already supplied by the Garage Boilerplate for the project demonstration:

- **Primary application framework and version:** Next.js 16.2.12 using the App Router, with React 19.2.4.
- **Programming language:** TypeScript 5 rather than JavaScript for both frontend and backend code.
- **Additional frameworks and services:** Tailwind CSS 4 for styling; Firebase Authentication and Cloud Firestore through Firebase SDK 11.6.0; Firebase Admin SDK 13.3.0 for trusted server operations; Express 5.1.0 on Firebase Cloud Functions 6.4.0.
- **Runtime and package management:** Node.js 22 or later and pnpm 10

Because the selected boilerplate already implements and tests this stack, retaining it is the lowest-risk choice while the scope of the demonstration remains undecided. This decision establishes the technical baseline, it does not decide what the demonstration will do or require every optional part of the boilerplate to be used.

## AI involvement

- **Was AI used to reach this decision?** Yes, to inspect the already-adopted stack, as the technology choice itself was already inherited from the boilerplate code.
- **If yes:** OpenAI Codex was asked to inspect the repository, identify the frameworks and versions.
- **What the human changed:** The requester reviewed the AI's inspection of the boilerplate and documented the boilerplate decisions that had already been made.
- **Who verified it:** Zafir Hasan

## Consequences

**Accepted:** The team must follow the boilerplate's Next.js App Router, TypeScript, pnpm workspace, and Firebase conventions. Contributors need familiarity with both client-side and server-side React concepts. The stack may be larger than a minimal demonstration requires.

**Gained:** The project can begin prototyping with an existing application shell, authentication, database access, validation, testing, security rules, and CI. Static typing and shared conventions reduce integration risk between contributors. The architecture can support either an AI-agent interface or another authenticated web demonstration.

**Reversal cost:** Moderate. Changing individual supporting libraries is manageable, but replacing Next.js or TypeScript after demonstration features are implemented would require substantial changes to routing, rendering, tests, and deployment.

## Revisit when

Reopen this decision if the agreed demonstration cannot be implemented or deployed within this stack, before upgrading to a new major version of Next.js, React, Tailwind CSS, Express, or Firebase.
