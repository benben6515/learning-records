# Auth model demonstrated (L07)

Answered the L07 checkpoint correctly, in the lesson's own metaphor: 401 = authentication — "did we issue you a keycard?"; 403 = authorization — "decides where that keycard can go." Held under bob-with-valid-session reading alice's note: he HAS a card; that door isn't his → 403, not 401. Two spelling slips (authenication, 侚房卡) corrected in feedback and accepted.

**Evidence:** L07 checkpoint (2026-09-10), two-line answer — both codes mapped to the right concept, keycard model retained from the lesson text.

**Implications:** the authN/authZ split is solid at concept level. The frontend-consequence half (401 → redirect to login; 403 → render "no access", stop retrying) was supplied by me in feedback — watch for it surfacing naturally, e.g. when L08 tests assert 401 vs 403 paths. Terms 驗證/授權 promoted to GLOSSARY.md. Drill evidence still outstanding for L01, L03, L05–L07.
