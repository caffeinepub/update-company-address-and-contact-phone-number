# Specification

## Summary
**Goal:** Update the company address and contact phone number across backend-provided data and Contact page fallbacks.

**Planned changes:**
- Update `getCompanyInfo()` in the backend to return the address "Pupri, Sitamarhi, Bihar, 843314, India" and phone "+91 8879802001".
- Update the Contact section UI fallback values to display the same new address and phone when `companyInfo` is unavailable (null/failed query).

**User-visible outcome:** The Contact page shows the updated address and phone number, using backend values when available and the new fallbacks when not.
