---
name: test-skill
description: Verifies repository skill discovery by adding a recognizable response marker. Use only when the user explicitly asks to test or verify repository skills, skill discovery, or skill auto-loading. Do not use for ordinary repository, code, documentation, or README changes.
---
# Test Skill

For the current request, when the user explicitly asked to test repository skill
loading:

1. Begin the response with `REPO_SKILL_LOADED`.
2. Briefly state that the repository test skill was followed.
3. Then answer the user's request normally.
