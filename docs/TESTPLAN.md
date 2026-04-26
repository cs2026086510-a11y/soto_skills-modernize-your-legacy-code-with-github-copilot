# COBOL Application Test Plan

This test plan covers the current business logic implemented in the COBOL account management application. Each test case is designed for validation by stakeholders and includes placeholders for actual results, pass/fail status, and comments.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Verify initial account balance view | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 1 to view balance. | Current balance is displayed as 1000.00. | | | |
| TC-002 | Verify credit account operation updates balance | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 2 to credit account.
3. Enter amount 250.00.
4. View balance again. | Balance increases by 250.00 and displays 1250.00. | | | |
| TC-003 | Verify debit account operation with sufficient funds | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 3 to debit account.
3. Enter amount 400.00.
4. View balance again. | Balance decreases by 400.00 and displays 600.00. | | | |
| TC-004 | Verify debit account operation with insufficient funds | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 3 to debit account.
3. Enter amount 1200.00. | Program displays "Insufficient funds for this debit." and balance remains 1000.00. | | | |
| TC-005 | Verify program handles invalid menu selection | Program started | 1. Launch the program.
2. Enter option 5 or any invalid choice. | Program displays "Invalid choice, please select 1-4." and prompts again. | | | |
| TC-006 | Verify repeat transactions until exit | Program started | 1. Launch the program.
2. Perform a series of valid actions (balance view, credit, debit).
3. Select option 4 to exit. | Program accepts multiple actions, updates balance correctly, and exits after option 4. | | | |
| TC-007 | Verify data layer read operation | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 1 to view balance. | DataProgram read operation returns current balance and displays 1000.00. | | | |
| TC-008 | Verify data layer write operation after credit | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 2 to credit account.
3. Enter amount 100.00.
4. Select option 1 to view balance. | DataProgram write operation updates stored balance to 1100.00 and the displayed balance matches. | | | |
| TC-009 | Verify data layer write operation after debit | Program started, balance initialized to 1000.00 | 1. Launch the program.
2. Select option 3 to debit account.
3. Enter amount 100.00.
4. Select option 1 to view balance. | DataProgram write operation updates stored balance to 900.00 and the displayed balance matches. | | | |
| TC-010 | Verify exit flow | Program started | 1. Launch the program.
2. Select option 4. | Program displays exit message and terminates gracefully. | | | |
