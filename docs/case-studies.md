# Three UX explorations

These studies document hypotheses and implementation decisions. They do not report user interviews or measured results. All three concepts were created for a portfolio.

## 01 — Clear: catalog workspace

**Problem:** A reviewer must find relevant exceptions, understand their status, and avoid accidentally losing work.

**Assumed user:** A catalog operations specialist. The domain is relevant to product-data work, but this prototype contains no employer data or internal tooling.

**Flow:** Overview → search/filter queue → inspect issue → mark reviewed → undo.

**Decisions:** Separate a high-level visual overview from a focused working queue. Combine search across identifier, name, category, and issue with an explicit status filter. Keep review state textual and reversible. Preserve keyboard focus after a row changes.

**Tradeoff:** The five-row prototype demonstrates review interaction, not full catalog correction. Marking an item reviewed does not change its fields. The static overview numbers do not aggregate from this tiny queue.

**Validation plan:** Give five representative reviewers tasks to find a furniture item, complete a review, undo it, and find an unmatched search. Record success, wrong-item actions, task time, and wording confusion. Compare against a simple unfiltered list before claiming improvement.

## 02 — Still: everyday objects

**Problem:** A shopper needs to understand finish, quantity, and cost with minimal ambiguity.

**Assumed user:** Someone considering a small furniture purchase; motivations need validation.

**Flow:** Inspect object → choose finish → set quantity → inspect subtotal → add to simulated bag.

**Decisions:** Give the product a generous visual area. Use native radio inputs for finishes, update the illustration and its accessible label, and show subtotal before adding. Confirm the selected finish and quantity in the resulting message.

**Tradeoff:** CSS artwork communicates visual direction but cannot communicate real material quality. The demo has no inventory, checkout, shipping calculation, or payment. Bag state is deliberately temporary.

**Validation plan:** Ask users to choose walnut, select two chairs, identify subtotal, and add them. Check whether they understand that delivery and tax are not calculated. For a real store, test dimensions and delivery visibility before introducing visual polish.

## 03 — Offgrid: small discoveries

**Problem:** A visitor wants a manageable shortlist rather than an endless set of recommendations.

**Assumed user:** A casual explorer with limited time. All locations are fictional.

**Flow:** Choose interest → compare duration and area → save → retrieve shortlist → remove.

**Decisions:** Expose the information needed for an initial decision directly on each card. Combine interest filters with a saved-only view. Clearly describe empty results and a recovery action. Announce saved counts without relying on icons alone.

**Tradeoff:** The prototype contains no map, real opening hours, verified accessibility information, or account persistence. It tests a shortlist interaction rather than routing.

**Validation plan:** Give users one hour and ask them to shortlist an outdoor stop. Observe whether durations and areas are enough, whether saved items are easy to retrieve, and how empty filtered shortlists are interpreted.

## Shared learning agenda

Conduct moderated sessions, record observations rather than invented personas or scores, iterate on the highest-impact confusion, and document before/after changes. Add actual results only once the study has taken place.
