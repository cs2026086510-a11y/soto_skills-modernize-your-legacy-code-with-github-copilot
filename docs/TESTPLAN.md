# COBOL Application Test Plan

This test plan covers the current business logic implemented in the COBOL account management application. Each test case maps to a specific rule or behavior in the current implementation and includes placeholders for actual results, status, and comments.

## Test Coverage Summary

- Initial balance view
- Credit account operations
- Debit account operations with sufficient and insufficient funds
- Invalid menu selection handling
- Repeat transaction flow
- Exit flow
- Data layer read/write interactions

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Verify initial account balance view | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `1` to view balance. | Current balance is displayed as `1000.00`. | | | |
| TC-002 | Verify credit account updates the balance | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `2` to credit account.<br>3. Enter amount `250.00`.<br>4. Select option `1` to view balance. | Balance increases to `1250.00` and display shows `1250.00`. | | | |
| TC-003 | Verify debit account with sufficient funds | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `3` to debit account.<br>3. Enter amount `400.00`.<br>4. Select option `1` to view balance. | Balance decreases to `600.00` and display shows `600.00`. | | | |
| TC-004 | Verify debit account with insufficient funds | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `3` to debit account.<br>3. Enter amount `1200.00`. | Program displays `Insufficient funds for this debit.` and balance remains `1000.00`. | | | |
| TC-005 | Verify handling of invalid menu input | Program started | 1. Launch the program.<br>2. Enter invalid menu option such as `5` or `0`. | Program displays `Invalid choice, please select 1-4.` and continues prompting. | | | |
| TC-006 | Verify repeat transactions are allowed | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `1` to view balance.<br>3. Select option `2` and credit `100.00`.<br>4. Select option `3` and debit `50.00`.<br>5. Select option `1` to view balance.<br>6. Select option `4` to exit. | Program processes each step, maintains correct running balance (`1050.00`), and exits gracefully. | | | |
| TC-007 | Verify data layer read operation | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `1` to view balance. | `DataProgram` returns the stored balance and `MainProgram` displays `1000.00`. | | | |
| TC-008 | Verify data layer write operation after credit | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `2` to credit account.<br>3. Enter amount `100.00`.<br>4. Select option `1` to view balance. | `DataProgram` writes the updated balance and display shows `1100.00`. | | | |
| TC-009 | Verify data layer write operation after debit | Program started; initial balance 1000.00 | 1. Launch the program.<br>2. Select option `3` to debit account.<br>3. Enter amount `100.00`.<br>4. Select option `1` to view balance. | `DataProgram` writes the updated balance and display shows `900.00`. | | | |
| TC-010 | Verify exit menu option closes the application | Program started | 1. Launch the program.<br>2. Select option `4`. | Program displays exit message and stops execution. | | | |

## Notes for Stakeholders

- The current COBOL application retains balance only in memory while the program runs; there is no persistent external storage.
- All numeric inputs assume valid numeric values in the format expected by COBOL's `PIC 9(6)V99` fields.
- Invalid non-numeric amount entries are not explicitly tested because the current implementation does not include input validation for those cases.
